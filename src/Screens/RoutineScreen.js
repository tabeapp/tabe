import { TouchableOpacity, SafeAreaView, StyleSheet, View } from "react-native";
import React, {useContext} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoutinesContext from "../Contexts/RoutinesContext";
import { BLANK_ROUTINE } from "../Constants/DefaultRoutineInfo";
import { FULL_COPY } from "../Utils/UtilFunctions";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";

//this is for choosing a routine to edit, instead of jumping right in
//crud operations on this level deserve server calls
const RoutineScreen = props => {
    //why is it like this
    const {routines} = useContext(RoutinesContext);
    const {routinesDispatch} = useContext(RoutinesContext);

    const deleteRoutine = k => {
        //should probably have a warning, lol
        routinesDispatch(prev => {
            delete prev.routines[k];
            return prev;
        });
        //not a fan, but this should be a rare operation
        routinesDispatch({type: 'setItem'})//so save the thing
    }

    //again we have to fucking update the @rouintes
    const handleSetCurrent = k => {
        //setCurrent(k);
        routinesDispatch({path: 'current', value: k});

        //AsyncStorage.getItem('@routines').then(obj => {
        //if(obj === null)
        //return;
        //const r = JSON.parse(obj);
        //r.current = k;
        routinesDispatch({type: 'setItem'})//so save the thing
        //AsyncStorage.setItem('@routines', JSON.stringify(r));
        //})

    }

    return (
        <SafeBorderNav {...props} screen={'routine'}>
            <TopBar title='Routines'/>
            <View style={STYLES.body}>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {
                        routines &&
                        routines.map(routine =>
                            <TouchableOpacity
                                key={routine.id}
                                onPress={() => {
                                    //set it in the context
                                    routinesDispatch({path: 'editRoutine', value: FULL_COPY(routine.routine)});
                                    /*send it off to routine editor*/
                                    props.navigation.navigate('routineedit');
                                }}
                                style={{flexDirection: 'row', width: '95%', backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100}}
                            >
                                <Words style={{fontSize: 20}}>{
                                    routine.title
                                }</Words>
                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    deleteRoutine(routine.id);//
                                }}>
                                    <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    handleSetCurrent(routine.id)
                                }}>
                                    <Words style={{fontSize:20}}>
                                        Current:
                                        {
                                            routine.current &&
                                            <Ionicons color={'green'} size={30} name={'checkbox'}/>
                                        }
                                        {
                                            !routine.current &&
                                            <Ionicons color={'gray'} size={30} name={'checkbox-outline'}/>
                                        }
                                    </Words>
                                </TouchableOpacity>
                                <Words>
                                    {routine.id}
                                </Words>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <TouchableOpacity  onPress={() => {
                    routinesDispatch({path: 'editRoutine', value: BLANK_ROUTINE()});

                    props.navigation.navigate('routineedit');
                    //routine: emptyRoutine, // no this will be set in the context
                    //saveRoutine: saveRoutine no this will be available in the context
                    //})
                }}>
                    <Words style={{fontSize: 40}}>+</Words>
                </TouchableOpacity>

            </View>
        </SafeBorderNav>
    );
};

export default RoutineScreen;
