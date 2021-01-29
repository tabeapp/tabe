import React, { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";

import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import WorkoutContext from "../Contexts/WorkoutContext";
import ExercisePicker from "../Components/ExercisePicker";
import { DEFAULT_EX_WORKOUT } from "../Constants/DefaultExInfo";
import { CURRENT, FAILURE } from "../Constants/Symbols";
import RestTimer from "../Components/RestTimer";
import SafeBorder from "../Components/SafeBorder";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";

const primaryColor = '#66d6f8';

//TODO how about actually adjusting the wieghts on the fly?
const WorkoutScreen = props => {
    const {workout, workoutDispatch, quitWorkout, generateReport} = useContext(WorkoutContext);


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
                                        if(!set.progress || set.progress === CURRENT ){
                                            set.progress = set.reps;
                                            if(set.reps === FAILURE)
                                                set.progress = 5;//idk
                                        }
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
        <SafeBorder>
            <TopBar
                leftText='Quit' title={workout.title} rightText='Done'
                onPressLeft={() =>{
                    quitWorkout();
                    props.navigation.navigate('home');
                }}
                onPressRight={handleNext}
            />

            <View>{
                workout.exercises&&workout.exercises.map((ex, index) => (
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
                    <TouchableOpacity style={STYLES.button} onPress={() => setModal(true)}>
                        <Words style={{fontSize: 35}}>+</Words>
                    </TouchableOpacity>

                </>
            }
            <TouchableOpacity onPress={() =>
                //works, but really not sure where to put this edit button
                workoutDispatch(prev => {
                    prev.edit = !prev.edit
                    return prev;
                })
            }>
                <Words>Edit</Words>
            </TouchableOpacity>


            <RestTimer
                timer={workout.timer}
                restStart={workout.restStart}
            />

            <ExercisePicker handleSelection={name =>
                workoutDispatch(prev => {
                    prev.exercises.push(DEFAULT_EX_WORKOUT(name));
                    return prev;
                })
            } visible={modal} close={() => setModal(false)}/>
            {
                /*<Words>
                    {JSON.stringify(workout)}
                </Words>*/
            }

        </SafeBorder>
    );
};

export default WorkoutScreen;
