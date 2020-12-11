import React, {useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Modal } from "react-native";
//get custom icons eventually

import ProgressContext from "../Contexts/ProgressContext";
import ExerciseCard from "../Components/ExerciseCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomExerciseCard from "../Components/CustomExerciseCard";
import { PRIMARY } from "../Constants/Theme";
import { CATEGORIES } from "../Constants/Exercises";
import ExercisePicker from "../Components/ExercisePicker";


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//idk what im doing
//const ProgressContext = React.createContext();
//later would be generated more intelligently
const sampleSuggestion = [
    'bench', 'curl', 'deadlift'
];

//completely customizable
const CustomWorkoutScreen = () => {
    let {title, loaded, initializeCustom, workout, addExercise, done, generateReport} = useContext(ProgressContext);
    useEffect(() => {
        if(!loaded)
            initializeCustom();
    }, []);

    const [modal, setModal] = useState(false);


    const addFromSuggestions = name => {
        addExercise(name);
        sampleSuggestion.splice(sampleSuggestion.indexOf(name), 1);

    }

    //not really sure about this
    //like a popup would be cool
    //might make my own
    const openExerciseSelect = () => {
        setModal(true);


    }

    //const workout = routine.days[routine.currentDay];

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>{workout.title}</Text>
                </View>
                <View style={styles.container}>{
                    workout.exercises.map((ex, index) => (
                        //or maybe use react context, idfk
                        <CustomExerciseCard key={ex.name} exercise={ex} exerciseN={index} />
                    ))
                }</View>
                <View style={{flexDirection: 'row' }}>{
                    sampleSuggestion.map(name => {
                        return (<TouchableOpacity
                            key={name}
                            style={{borderColor: 'white', borderWidth: 1, borderRadius: 20, padding: 2, paddingHorizontal: 5, margin: 2}}
                            onPress={() => addFromSuggestions(name)}>
                            <Text style={{color: 'white'}}>{name}</Text>
                        </TouchableOpacity>);
                    })
                }</View>
                <TouchableOpacity style={styles.configButton} onPress={openExerciseSelect}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
                <ExercisePicker visible={modal} close={() => setModal(false)}/>
                {
                    //done && <TouchableOpacity style={{backgroundColor: 'green', width: 50, height: 30}}/>
                    <Text style={{color:'white'}} >{generateReport()}</Text>
                }
            </SafeAreaView>
        </>
    );
};
//exercise picker

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
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default CustomWorkoutScreen;
