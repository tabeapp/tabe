import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExercisePicker from "./ExercisePicker";
import Words from "./Words";

//this is for getting just one of the exercises of a super set
//it's hard to make the modal work with multiple possible endpoints
const SupersetEditor = props => {
    const [modal, setModal] = useState(false);

    return (
        <View style={{backgroundColor: '#333'}}>
            <Words>test</Words>
            <ExercisePicker visible={modal} handleSelection={props.editSuperset} close={() => setModal(false)}/>
        </View>
    )
}

//(([k,v], index) =>
const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);

    return (
        <View style={{height: 200, margin: 5, width: 400, backgroundColor: '#333'}}>
            <Text style={{color:'white'}}>Workout {props.name}</Text>
            {
                props.exercises.map(ex =>{
                    if(Array.isArray(ex))
                        return <SupersetEditor/>;

                    return <Text key={ex} style={{color:'white', fontSize: 30}}>{ex}</Text>;
                })
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

            <TouchableOpacity style={styles.configButton} onPress={() => {
                props.editWorkouts(prev => {
                    const next = [...prev[props.name]];
                    //just add array of two empty strings
                    next.push(['','']);
                    return {...prev, [props.name]: next};
                })


            }} >
                <Text style={{color: 'white', fontSize: 30}}>Add Superset</Text>
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
