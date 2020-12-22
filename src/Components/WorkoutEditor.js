import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExercisePicker from "./ExercisePicker";
import Words from "./Words";

//this is for getting just one of the exercises of a super set
//it's hard to make the modal work with multiple possible endpoints
//should we pass in selected ones?
const SupersetSelector = props => {
    const [modal, setModal] = useState(false);

    return (
        <TouchableOpacity
            style={{backgroundColor: 'gray', borderWidth: 1, borderColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setModal(true)}>
            <Words>Add Exercise</Words>
            <ExercisePicker visible={modal} handleSelection={props.onSelect} close={() => setModal(false)}/>
        </TouchableOpacity>
    )
}

//(([k,v], index) =>
const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);

    //wtf is this 415 number supposed to be?
    return (
        <View style={{margin: 3, width: 406, backgroundColor: '#333'}}>
            <Text style={{color:'white'}}>Workout {props.name}</Text>
            {
                props.exercises.map((ex, index) =>{
                    //we actually need as many superset editors as there are exerices
                    if(Array.isArray(ex)){
                        return <View style={{height: 30, flexDirection: 'row'}}>{
                            ex.map((e, index2) => {
                                if(e === '')
                                    return <SupersetSelector onSelect={val => props.editSuperset(val, index, index2)} />
                                return <Words style={{borderWidth:1, borderColor: 'black', backgroundColor: 'gray', flex: 1}}>{e}</Words>
                            })
                        }</View>
                    }

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
