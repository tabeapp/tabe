import React, {useState, useEffect, useContext} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import { SSDefault } from "../Assets/DefaultRoutines/SSDefault";
import { MetallicaPPLDefault } from "../Assets/DefaultRoutines/MetallicaPPLDefault";
import NumericSelector from "../Components/NumericSelector";

const primaryColor = '#66d6f8';

const defaultRoutine = 'MetallicaPPL';

const repNumbers = {
    def: 1,
    min: 1,
    max: 10,
    increment: 1
};

//this screen is used to input prs and bulid a custom routine based on another
const RoutineSetupScreen = props => {
    //let { workout, generateReport} = useContext(ProgressContext);


    //this will be sent on navigation
    //routinechosen = props.route.params.routine
    let chosenRoutine = defaultRoutine;


    let loadRoutine;

    //load from web or something later
    if(chosenRoutine === 'Starting Strength')
        loadRoutine = SSDefault;
    //so this takes the 1rm effort and multiplies it by .7 for 5, .4 for 12, .32 for 20
    else if(chosenRoutine === 'MetallicaPPL')
        loadRoutine = MetallicaPPLDefault;


    const idk = Object.entries(loadRoutine.info).map(([k,v]) => ({
        name: k,
        reps: 1,
        weight: v.def1RM
    })).filter(i => !i.name.includes('.ez'));

    const [maxEffort, setMaxEffort] = useState(idk);

    //this feels really fucking convoluted
    const updateRep = (ex, reps) => {
        setMaxEffort(maxEffort.map(e => {
            if(e.name === ex)
                return {...e, reps};
            return e;
        }));
    };

    //this can't be right
    const updateWeight = (ex, weight) => {
        setMaxEffort(maxEffort.map(e => {
            if(e.name === ex)
                return {...e, weight};
            return e;
        }));
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>Routine Setup</Text>
                </View>
                <ScrollView>{
                    maxEffort.map(ex =>
                        <View key={ex.name} style={{backgroundColor: '#333', padding: 5, margin: 4, borderRadius: 15, width: '98%'}}>
                            <Text style={{fontSize: 20, color: 'white'}}>{ex.name}</Text>
                            <View style={{justifyContent: 'space-around', alignItems: 'center', height: 90, flexDirection: 'row'}}>
                                <Text style={{fontSize: 20, color: 'white'}}>Enter Max Effort:</Text>

                                <NumericSelector onChange={reps => updateRep(ex.name, reps)} numInfo={repNumbers}/>

                                <Text style={{fontSize: 20, color: 'white'}}>x</Text>

                                <NumericSelector onChange={weight => updateWeight(ex.name, weight)} numInfo={{def: ex.weight, min: 0, max: 1000, increment: 5}}/>
                            </View>
                        </View>
                    )
                }</ScrollView>
                <View style={styles.bottom}>
                    <TouchableOpacity style={{marginBottom: 5, justifyContent: 'center', alignItems: 'center', height: 40, width: '100%', borderColor: PRIMARY, borderWidth: 1}}>
                        <Text style={{color: 'white', fontSize: 20}}>Skip and use Default Weights</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    bottom: {width: '100%', backgroundColor: 'black', alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default RoutineSetupScreen;
