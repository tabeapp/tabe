import React, {useEffect, useContext} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import ProgressContext from "../Contexts/ProgressContext";
import ExerciseCard from "../Components/ExerciseCard";
import Ionicons from "react-native-vector-icons/Ionicons";


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//idk what im doing
//const ProgressContext = React.createContext();

//completely customizable
const CustomWorkoutScreen = () => {
    let {title, workout, done, generateReport} = useContext(ProgressContext);

    //const workout = routine.days[routine.currentDay];

    return (
        <SafeAreaView>
            <View style={styles.top}>
                <Text style={{color: 'black', fontSize: 20}}>{title}</Text>
            </View>
            <View style={styles.container}>{
                workout.map((ex, index) => (
                    //or maybe use react context, idfk
                    <ExerciseCard key={ex.name} exercise={ex} exerciseN={index} />
                ))
            }</View>
            <TouchableOpacity style={styles.configButton}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            {
                //done && <TouchableOpacity style={{backgroundColor: 'green', width: 50, height: 30}}/>
                <Text style={{color:'white'}} >{generateReport()}</Text>
            }
        </SafeAreaView>
    );
};
//<Ionicons name={'add'} color={'black'} size={50}/>

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
