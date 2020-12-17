import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExercisePicker from "./ExercisePicker";

//(([k,v], index) =>
const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);

    return (
        <View style={{height: 200, margin: 5, width: 400, backgroundColor: '#333'}}>
            <Text style={{color:'white'}}>Workout {props.name}</Text>
            {
                props.exercises.map(ex =>
                    <Text key={ex} style={{color:'white', fontSize: 30}}>{ex}</Text>
                )
            }
            <TouchableOpacity style={styles.configButton} onPress={() => {
                //append a new obj
                //works, but ideally I'd like A B C instead of 1 2 3
                //setWorkouts({...workouts, [Object.keys(workouts).length+1]: []});
                //yeah maybe these should be separate components...
                setModal(true);
            }}>
                <Text style={{color: 'white', fontSize: 30}}>Add Exercise</Text>
            </TouchableOpacity>
            <ExercisePicker visible={modal} handleSelection={props.addExercise} close={() => setModal(false)}/>


        </View>);
};
const styles = StyleSheet.create({
    configButton: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    },
});

export default WorkoutEditor;
