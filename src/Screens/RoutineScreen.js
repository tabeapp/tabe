import { TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, {useEffect, useContext, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Words from "../Components/Words";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoutinesContext from "../Contexts/RoutinesContext";

//this is for choosing a routine to edit, instead of jumping right in
const RoutineScreen = props => {
    const [current, setCurrent] = useState('');
    /*const [routines, setRoutines] = useState([]);

    //the routines will be saved under @routines
    //there may be multiple
    //the current routine will be @currentroutine
    useEffect(() => {
        AsyncStorage.getItem('@routines').then(obj => {
            if(obj === null)
                setRoutines([]);
            else{
                const r = JSON.parse(obj);
                setRoutines(r.routines);
                setCurrent(r.current);
            }
        });

    }, []);*/
    const routines = useContext(RoutinesContext).routines.routines;
    const setRoutines = useContext(RoutinesContext).routinesDispatch;


    //get the context done rn, and just hold on to a list of routines in the state

    //should i have another fucking context for this
    //maybe i should, cuz it needs to reload before it sees new routines
    //yes this is exactly it
    //or ill say fuck it and have this be its own context
    //optimize this later once you figure out how to have multiple contexts
    const saveRoutine = newRoutine => {

        AsyncStorage.getItem('@routines').then(obj => {
            let nextRoutines;
            if(obj === null){
                newRoutine.current = true;
                nextRoutines = {
                    current: newRoutine.title,
                    routines: {
                        [newRoutine.title]:newRoutine
                    }
                }

            }
            else{
                nextRoutines = JSON.parse(obj);
                if(nextRoutines.current === newRoutine.title)
                    newRoutine.current = true;

                nextRoutines.routines[newRoutine.title] = newRoutine;
            }
            setRoutines(nextRoutines);
            AsyncStorage.setItem('@routines', JSON.stringify(nextRoutines));
        })
    }

    const deleteRoutine = k => {
        setRoutines(prev => {
            const next = {...prev}
            delete next[k];
            return next;
        });
        //not a fan, but this should be a rare operation
        AsyncStorage.getItem('@routines').then(obj => {
            if(obj === null)
                return;
            const r = JSON.parse(obj);
            delete r.routines[k];
            AsyncStorage.setItem('@routines', JSON.stringify(r));
        })
    }

    //again we have to fucking update the @rouintes
    const handleSetCurrent = k => {
        setCurrent(k);
        AsyncStorage.getItem('@routines').then(obj => {
            if(obj === null)
                return;
            const r = JSON.parse(obj);
            r.current = k;
            AsyncStorage.setItem('@routines', JSON.stringify(r));
        })

    }

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
                    <Words>Routines</Words>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        {
                            Object.entries(routines).map(([k,v]) =>
                                <TouchableOpacity
                                    key={k}
                                    onPress={() => {
                                        /*send it off to routine editor*/
                                        props.navigation.navigate('routineedit', {
                                            routine: v
                                        })
                                    }}
                                    style={{width: '95%', backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100}}
                                >
                                    <Text style={{fontSize: 20, color: 'white'}}>{
                                        v.title
                                    }</Text>
                                    <TouchableOpacity style={{width: 50 }} onPress={() => {
                                        deleteRoutine(k);
                                    }}>
                                        <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{width: 50 }} onPress={() => {
                                        handleSetCurrent(k)
                                    }}>
                                        <Words>
                                            Current:
                                            {
                                                k === current &&
                                                <Ionicons color={'green'} size={30} name={'checkbox'}/>
                                            }
                                            {
                                                k !== current &&
                                                <Ionicons color={'gray'} size={30} name={'checkbox-outline'}/>
                                            }
                                        </Words>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TouchableOpacity  onPress={() => {
                        //send a blank routine to routineeditor
                        //specifically
                        const emptyRoutine = {
                            title: 'New Routine',
                            time: 7,
                            info: {},
                            workouts: {},
                            days: [],
                            customScheme: false,
                            customSets: [],
                            currentDay: 0,//do we really need these last 2?
                            nextWorkoutTime: 0
                        }

                        props.navigation.navigate('routineedit', {
                            routine: emptyRoutine,
                            saveRoutine: saveRoutine
                        })
                    }}>
                        <Words style={{fontSize: 40}}>+</Words>
                    </TouchableOpacity>

                </View>
                <NavBar current={/*better way to handle this?*/'routine'} navigation={props.navigation}/>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    navBar: {

    },
    container: { flex: 1, backgroundColor: PRIMARY },
    topBar: {
        height: 40,
        width: '100%',
        backgroundColor: PRIMARY,
        alignItems: 'center',
        borderStyle: 'solid',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
    },
});
export default RoutineScreen;
