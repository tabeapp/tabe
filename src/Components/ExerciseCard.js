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

//yes this will eventually implement timer visual
const MidLine = (props) => {

    //let color = props.completion ? 'white': 'gray';

    //use key here to check a timer
    //clever flex
    return <View key={props.id} style={{alignSelf: 'center', height:4, maxWidth: 20, flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: props.completion, backgroundColor: 'white' }} />
        <View style={{ flex: 1-props.completion, backgroundColor: 'gray' }} />
    </View>
};

const RepCircle = (props) => {
    return (<View style={{
        ...styles.circle,
        ...props.style
    }}>
        <Text style={{ color: 'white' }}>{
            props.text
        }</Text>
    </View>);
};

const ExerciseCard = (props) => {
    //this is a string
    //maybe not the worst idea to pass this stuff down if we're gonna be calling much
    //ex: name is deadlift, exercise is [5,5,5], progress is [5,3], weight is {current: 305, amrap: true}
    let {currentSet} = useContext(ProgressContext).progress;

    const {name, exercise, progress, weight} = props;

    let colors;
    if(!progress)
        colors = exercise.map(_ => 'transparent');
    else if(progress.length === exercise.length)
        colors = exercise.map(_ => 'lightgreen');
    else colors = exercise.map((_, index) => {
        if(progress[index] >= exercise[index])
            return primaryColor;
        else
            return 'transparent';
    });

    let outlines = exercise.map(_ => primaryColor);
    if(progress && progress.length === exercise.length)
        outlines = exercise.map(_ => 'lightgreen');

    //weights, circles, and more fun
    const items = [];

    exercise.forEach((n, index) => {
        let done = progress && progress[index] >= n;
        if(index === exercise.length-1){
            if(weight.amrap){
                if(done)
                    n = progress[index];
                else
                    n += '+';
            }
        }

        items.push(<RepCircle key={index} text={n} style={{backgroundColor: colors[index], borderColor: outlines[index]}}/>);

        let completion = done ? 1 : 0;
        if(currentSet[0] === name && currentSet[1] === index+1)
            completion = currentSet[2];

        if(index !== exercise.length-1)
            items.push(<MidLine key={index+'-'} completion={completion}/>);
    });

    //cool weight icons, trust me looks cool
    if(weight.primary){
        items.unshift(<MidLine key={'b'} completion={1}/>);
        items.push(<MidLine key={'y'} completion={1}/>);

        items.unshift(<WeightVisual key={'a'} weight={weight.current} reverse={true} />);
        items.push(<WeightVisual key={'z'} weight={weight.current}/>);
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
