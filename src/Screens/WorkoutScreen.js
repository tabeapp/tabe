import React, { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
//get custom icons eventually

import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import WorkoutContext from "../Contexts/WorkoutContext";
import ExercisePicker from "../Components/ExercisePicker";
import { DEFAULT_EX_WORKOUT } from "../Constants/DefaultExInfo";
import { CURRENT } from "../Constants/Symbols";
import RestTimer from "../Components/RestTimer";

const primaryColor = '#66d6f8';

//TODO how about actually adjusting the wieghts on the fly?
const WorkoutScreen = props => {
    const {workout, workoutDispatch, generateReport} = useContext(WorkoutContext);

    //workout.edit false => normal workout screen
    //workout.edit true => custom wokrout screen

    //true for custom workouts
    const edit = workout.edit;

    const goToReport = () => {
        //take the workout
        //compile it into a report
        //show it to the user on a new screen
        props.navigation.navigate('report');
    }

    //three possibilties:
    //quit, save as is, or autocomplete
    //last two are equal if complete
    const handleNext = () => {
        //this is handled by the invariant checker
        if(workout.done)
            goToReport()
        else{
            Alert.alert(
                "Incomplete Workout",
                "",
                [
                    {
                        text: "Cancel",//don't do the workout
                        style: "cancel"
                    },
                    {
                        text: "Save as is",//don't do the workout
                        onPress: goToReport
                    },
                    {
                        text: "Auto-complete",
                        onPress: () => {
                            //so just fill in all of the workout
                            workoutDispatch(prev => {
                                for(let e = 0; e < prev.exercises.length; e++) {
                                    const ex = prev.exercises[e];
                                    for (let s = 0; s < ex.sets.length; s++) {
                                        const set = ex.sets[s];
                                        if(!set.progress || set.progress === CURRENT )
                                            set.progress = set.reps;
                                    }
                                }
                                return prev;
                            });
                            //god i feel like shit doing this but it works
                            goToReport();
                        },
                    }
                ]
            )
        }
    };

    const [modal, setModal] = useState(false);

    const sampleSuggestion = [
        'bench', 'curl', 'deadlift',
    ];

    const addFromSuggestions = name => {
        workoutDispatch(prev => {
            prev.exercises.push(DEFAULT_EX_WORKOUT(name));
            return prev;
        });

        sampleSuggestion.splice(sampleSuggestion.indexOf(name), 1);
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() =>
                            workoutDispatch(prev => {
                                prev.edit = !prev.edit;
                                return prev;
                            })
                        }
                        style={styles.topButton}
                    >
                        <Words style={{fontSize: 20}}>
                            Edit
                        </Words>
                    </TouchableOpacity>
                    <Words style={{fontSize: 20}}>{workout?workout.title:''}</Words>
                    <TouchableOpacity onPress={handleNext} style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Done
                        </Words>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>{
                    workout&&workout.exercises.map((ex, index) => (
                        <ExerciseCard key={ex.name} edit={edit} exercise={ex} exerciseN={index} />
                    ))
                }</View>

                {
                    edit &&
                    <>
                        <View style={{flexDirection: 'row' }}>{
                            sampleSuggestion.map(name => {
                                return (<TouchableOpacity
                                    key={name}
                                    style={{borderColor: 'white', borderWidth: 1, borderRadius: 20, padding: 2, paddingHorizontal: 5, margin: 2}}
                                    onPress={() => addFromSuggestions(name)}>
                                    <Words>{name}</Words>
                                </TouchableOpacity>);
                            })
                        }</View>
                        <TouchableOpacity style={styles.configButton} onPress={() => setModal(true)}>
                            <Words style={styles.plus}>+</Words>
                        </TouchableOpacity>

                    </>
                }


                <RestTimer
                    visible={workout.timer.minutes !== 0 || workout.timer.seconds !== 0}
                    timer={workout.timer}
                />

                <ExercisePicker handleSelection={name =>
                    workoutDispatch(prev => {
                        prev.exercises.push(DEFAULT_EX_WORKOUT(name));
                        return prev;
                    })
                } visible={modal} close={() => setModal(false)}/>
                {
                    <Words>
                        {JSON.stringify(workout)}
                    </Words>
                }

            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    plus: {
        fontSize: 35,
    },
    configButton: {
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        width: 50,
        height: 50,
    },
    container: {alignItems: 'center', justifyContent: 'center', margin: 5},
    //top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
});

export default WorkoutScreen;
