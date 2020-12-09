import React, {useState, useContext} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//get custom icons eventually

import Ionicons from 'react-native-vector-icons/Ionicons';
import { MetallicaPPL, SampleProgress } from "../Assets/Routines/MetallicaPPL";
import WeightVisual from "../Utils/WeightVisual";
import ProgressProvider from "../Contexts/ProgressProvider";
import ProgressContext from "../Contexts/ProgressContext";
import ExerciseCard from "../Components/ExerciseCard";


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//idk what im doing
//const ProgressContext = React.createContext();

const WorkoutScreen = () => {
    const [message, setMessage] = useState('');

    //const routine = {...MetallicaPPL};

    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    const Tab = createBottomTabNavigator();


    //best way is to just track it as it goes such as
    /*
    {
        bench: [5,5,3,4]
    }
     */


    let {routine, progress} = useContext(ProgressContext);

    const workout = routine.days[routine.currentDay];

    const colors = {};
    Object.entries(workout).forEach(([k,v]) => {
        if(!progress[k])
            colors[k] = v.map(_ => 'transparent');
        else if(progress[k].length == workout[k].length)
            colors[k] = v.map(_ => 'lightgreen');
        else
            colors[k] = v.map((n, index) => {
                if(progress[k][index] >= workout[k][index])
                    return primaryColor;
                else
                    return 'transparent';
            });
    });


    return (
        <SafeAreaView>
            <View style={styles.top}>
                <Text style={{color: 'black', fontSize: 20}}>{routine.title}</Text>
            </View>
            <View style={styles.container}>{
                Object.entries(workout).map(([k, v]) => (
                    //or maybe use react context, idfk
                    <ExerciseCard name={k} exercise={workout[k]} progress={progress[k]} weight={routine.weight[k]}/>
                ))

            }</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {color: 'white'},
    card: {margin: 5, padding: 5, borderRadius: 5, width: '100%', backgroundColor: '#222'},
    container: {alignItems: 'center', justifyContent: 'center', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    box: {flex: 1, width: '100%', backgroundColor: 'black', alignItems: 'center', borderStyle: 'solid', borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    bottom: {height: 40, width: '100%', backgroundColor: 'orange', alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default WorkoutScreen;
