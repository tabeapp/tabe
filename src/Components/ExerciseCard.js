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

    let colors;
    if(!progress)
        colors = exercise.map(_ => 'transparent');
    else if(progress.length == exercise.length)
        colors = exercise.map(_ => 'lightgreen');
    else
        colors = exercise.map((_, index) => {
            if(progress[index] >= exercise[index])
                return primaryColor;
            else
                return 'transparent';
        });

    let outlines = exercise.map(_ => primaryColor);
    if(progress && progress.length == exercise.length)
        outlines = exercise.map(_ => 'lightgreen');

    //weights, circles, and more fun
    const items = [];

    exercise.forEach((n, index) => {
        //add circules prop?
        items.push(<View key={index} style={{
            ...styles.circle,
            backgroundColor: colors[index],
            borderColor: outlines[index],
        }}>
            <Text key={index} style={{ color: 'white' }}>{
                weight.amrap && index == exercise.length - 1 ? n + '+' : n
            }</Text>
        </View>);

        if(index !== exercise.length-1)
            items.push(<View style={{ alignSelf: 'center', flex: 1, maxWidth: 20, width: 10, height: 10, backgroundColor: 'gray' }} />);
    });
    //cool weight icons
    if(weight.primary){
        items.unshift(<WeightVisual key={'a'} weight={weight.current} reverse={true} />);
        items.push(<WeightVisual key={'b'} weight={weight.current}/>);
    }


    return (
        <View style={styles.card} key={exercise}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white' }}>{name}</Text>
                <Text style={{ color: 'white' }}>{weight.current}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{
                items.map(i => i)
            }</View>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {

        width:50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    card: {margin: 5, padding: 5, borderRadius: 5, width: '100%', backgroundColor: '#222'},
});

//export default withAuthenticator(App);
export default ExerciseCard;
