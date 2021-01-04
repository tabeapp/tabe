import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExercisePicker from './ExercisePicker';
import Words from './Words';
import Ionicons from "react-native-vector-icons/Ionicons";

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
    );
}

const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);

    //wtf is this 415 number supposed to be?
    return (
        <View style={{margin: 3, width: 406, backgroundColor: '#333'}}>
            <View style={{backgroundColor: '#222', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color:'white'}}>Workout {props.name}</Text>

                <View style={{flexDirection:'row'}}>

                    <TouchableOpacity onPress={() => {
                        //so take all the exercises of the workout and copy them to a new workout
                        //they're gonna be separate though, so like squat.b and such


                    }}>
                        <Text><Ionicons color={'gray'} size={30} name={'copy-outline'}/></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //delete the workout
                        props.editWorkouts(prev => {
                            const next = {...prev};
                            delete next[props.name];
                            //should we delete all exercises that don't exist in other workotus?
                            //debate
                            return next;
                        });

                    }}>
                        <Text><Ionicons color={'gray'} size={30} name={'close'}/></Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                props.exercises.map((ex, index) =>{
                    //we actually need as many superset editors as there are exerices
                    return <View key={ex} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {
                            Array.isArray(ex) &&
                            <View style={{ height: 30, flexDirection: 'row' }}>{
                                ex.map((e, index2) => {
                                    if (e === '')
                                        return <SupersetSelector
                                            onSelect={val => props.editSuperset(val, index, index2)} />
                                    return <Words style={{
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        backgroundColor: 'gray',
                                        flex: 1
                                    }}>{e}</Words>
                                })
                            }</View>
                        }
                        {
                            !Array.isArray(ex) &&
                            <Text style={{ color: 'white', fontSize: 30 }}>{ex}</Text>
                        }
                        <TouchableOpacity onPress={() => {
                            //this should do the same thing as pressing the X on an exercise
                            props.deleteExercise(ex);
                        }}>
                            <Text><Ionicons color={'gray'} name={'close'} size={30}/></Text>
                        </TouchableOpacity>
                    </View>
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
