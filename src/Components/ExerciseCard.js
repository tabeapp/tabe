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


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//idk what im doing
//const ProgressContext = React.createContext();

const ExerciseCard = (props) => {
    //this is a string
    //maybe not the worst idea to pass this stuff down if we're gonna be calling much
    //ex: name is deadlift, exercise is [5,5,5], progress is [5,3], weight is {current: 305, amrap: true}
    const {name, exercise, progress, weight} = props;

    //const data = useContext(ProgressContext);
    //const progress = data.progress[exercise];
    //const workout = data.routine.days[data.routine.currentDay];
    //const routine = workout[exercise];

    let colors;
    if(!progress)
        colors = exercise.map(_ => 'transparent');
    else if(progress.length == exercise.length)
        colors = exercise.map(_ => 'lightgreen');
    else
        colors = exercise.map((n, index) => {
            if(progress[index] >= exercise[index])
                return primaryColor;
            else
                return 'transparent';
        });


    return (
        <View style={styles.card} key={exercise}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white' }}>{name}</Text>
                <Text style={{ color: 'white' }}>{weight.current}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {
                    weight.primary &&
                    <WeightVisual weight={weight.current} reverse={true} />
                }
                {
                    exercise.map((n, index) =>
                        <View key={index} style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            borderWidth: 1,
                            backgroundColor: colors[index],
                            borderColor: primaryColor,
                            borderStyle: 'solid'
                        }}>
                            <Text key={index} style={{ color: 'white' }}>{
                                weight.amrap && index == exercise.length - 1 ? n + '+' : n
                            }</Text>
                        </View>
                    )
                }
                {
                    weight.primary && <WeightVisual weight={weight.current} />
                }
            </View>

        </View>
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
export default ExerciseCard;
