import { TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, {useEffect, useContext, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Words from "../Components/Words";
import Ionicons from "react-native-vector-icons/Ionicons";

//this is for choosing a routine to edit, instead of jumping right in
const RoutineScreen = props => {
    const [routines, setRoutines] = useState([]);
    const [current, setCurrent] = useState('');

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

    }, []);


    //should i have another fucking context for this
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
                                    <TouchableOpacity onPress={() => {

                                        deleteRoutine(k);

                                    }}>
                                        <Text><Ionicons color={'gray'} size={30} name={'close'}/></Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TouchableOpacity  onPress={() => {
                        //send a blank routine to routineeditor
                        //specifically
                        const emptyRoutine = {
                            name: 'New Routine',
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
                            routine: emptyRoutine
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
