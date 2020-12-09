import React, {useState} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//get custom icons eventually

import Ionicons from 'react-native-vector-icons/Ionicons';
import { MetallicaPPL } from "../Assets/Routines/MetallicaPPL";
import WeightVisual from "../Utils/WeightVisual";


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

const WorkoutScreen = () => {
    const [message, setMessage] = useState('');

    const routine = {...MetallicaPPL};

    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    const Tab = createBottomTabNavigator();

    const workout = routine.days[routine.currentDay];

    const progress = {
        deadlift: [6],
        latPull: [12,12],
    };
    //best way is to just track it as it goes such as
    /*
    {
        bench: [5,5,3,4]
    }
     */


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
                Object.entries(workout).map(([k,v]) => (
                    <View style={styles.card} key={k}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: 'white'}}>{k}</Text>
                            <Text style={{color: 'white'}}>{routine.weight[k].current}</Text>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            {
                                routine.weight[k].primary && <WeightVisual weight={routine.weight[k].current} reverse={true}/>
                            }
                            {
                                v.map((n, index) =>
                                    <View key={index} style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderWidth: 1, backgroundColor: colors[k][index], borderColor: primaryColor, borderStyle: 'solid'}}>
                                        <Text key={index} style={{color: 'white'}}>{
                                            routine.weight[k].amrap && index == v.length - 1 ? n + '+' : n
                                        }</Text>
                                    </View>
                                )
                            }
                            {
                                routine.weight[k].primary && <WeightVisual weight={routine.weight[k].current}/>
                            }
                        </View>

                    </View>
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
