import React, {useEffect, useContext} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import { SSDefault } from "../Assets/DefaultRoutines/SSDefault";
import { FiveThreeOneDefault } from "../Assets/DefaultRoutines/FiveThreeOneDefault";
import { MetallicaPPLDefault } from "../Assets/DefaultRoutines/MetallicaPPLDefault";

const primaryColor = '#66d6f8';

const routines = [
    {
        title: 'Starting Strength',
        description: 'Linear Progression for novices',
        obj: SSDefault
    },
    {
        title: 'Stronglifts 5x5',
        description: 'Classic 5x5 program',
        //obj: Stronglifts55Default
    },
    {
        title: '5/3/1',
        description: 'For intermediate lifters',
        obj: FiveThreeOneDefault
    },
    {
        title: 'Metallica PPL',
        description: 'Novice program with plenty of accessory work',
        obj: MetallicaPPLDefault
    },
    //just add them as you think of stuff
]

const ChooseRoutineScreen = props => {
    //let { workout, generateReport} = useContext(ProgressContext);
    let {initializeWorkout, initializeCustom} = useContext(ProgressContext);
    const handleCustomPress = () => {
        //set up
        initializeCustom();
        props.navigation.navigate('customworkout');
    };

    const handleRoutinePress = async r => {
        //no we need to set values first
        props.navigation.navigate('routinesetup', {routine: r.obj});
        //await setRoutine(r);
        //initializeWorkout();
        //props.navigation.navigate('workout');
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>Routine Selector</Text>
                </View>
                <Text style={{paddingVertical: 5, paddingHorizontal: 10, fontSize: 30, color: 'white'}}>Recommended Routines</Text>
                <View style={styles.container}>{
                    routines.map(r =>
                        <TouchableOpacity
                            key={r.title}
                            onPress={() => handleRoutinePress(r)}
                            style={{backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100, width: '48%'}}
                        >
                            <Text style={{fontSize: 20, color: 'white'}}>{
                                r.title
                            }</Text>
                            <Text style={{color: 'white'}}>{
                                r.description
                            }</Text>
                        </TouchableOpacity>)
                }</View>
                <TouchableOpacity
                    onPress={handleCustomPress}
                    style={{backgroundColor: '#333', padding: 5, margin: 4, borderRadius: 20, height: 80, width: '98%'}}
                >
                    <Text style={{fontSize: 20, color: 'white'}}>Custom</Text>
                    <Text style={{color: 'white'}}>Build your own routine</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default ChooseRoutineScreen;
