import React, { useContext, useState } from "react";
import {TouchableOpacity, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import { PRIMARY } from '../Constants/Theme';
import NumericSelector from '../Components/NumericSelector';
import ProgressContext from "../Contexts/ProgressContext";
import Words from "../Components/Words";

const primaryColor = '#66d6f8';

const repNumbers = {
    def: 1,
    min: 1,
    max: 10,
    increment: 1
};

//this screen is used to input prs and bulid a custom routine based on another
const RoutineSetupScreen = props => {
    const {initializeWorkout, generateRoutine} = useContext(ProgressContext);

    //the object will be sent
    let loadRoutine = props.route.params.routine;

    //this will be sent on navigation
    //routinechosen = props.route.params.routine
    //switch (props.route.params.routine) {
    //case "reload":
    //
    //}

    //const loadRoutine = FiveThreeOneDefault;

    const idk = Object.entries(loadRoutine.info).map(([k,v]) => ({
        name: k,
        reps: 1,
        weight: v.current
    })).filter(i => !i.name.includes('.ez'));

    const [maxEfforts, setMaxEfforts] = useState(idk);

    const handleNext = async () => {
        //generate a routine we're gonna do this in the contextprovider
        await generateRoutine(loadRoutine, maxEfforts);

        initializeWorkout();
        //start the workout
        //navigate('workout')
        props.navigation.navigate('workout');
    };

    //this feels really fucking convoluted
    const updateRep = (ex, reps) => {
        setMaxEfforts(maxEfforts.map(e => {
            if(e.name === ex)
                return {...e, reps};
            return e;
        }));
    };

    //this can't be right
    const updateWeight = (ex, weight) => {
        setMaxEfforts(maxEfforts.map(e => {
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
                    <TouchableOpacity style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Back
                        </Words>
                    </TouchableOpacity>
                    <Words style={{fontSize: 20}}>Routine Setup</Words>
                    <TouchableOpacity onPress={handleNext} style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Begin
                        </Words>
                    </TouchableOpacity>
                </View>
                <ScrollView>{
                    maxEfforts.map(ex =>
                        <View key={ex.name} style={{backgroundColor: '#333', padding: 5, margin: 4, borderRadius: 15, width: '98%'}}>
                            <Words style={{fontSize: 20}}>{ex.name}</Words>
                            <View style={{justifyContent: 'space-around', alignItems: 'center', height: 90, flexDirection: 'row'}}>
                                <Words style={{fontSize: 20}}>Enter Max Effort:</Words>

                                <NumericSelector onChange={reps => updateRep(ex.name, reps)} numInfo={repNumbers}/>

                                <Words style={{fontSize: 20}}>x</Words>

                                <NumericSelector onChange={weight => updateWeight(ex.name, weight)} numInfo={{def: ex.weight, min: 0, max: 1000, increment: 5}}/>
                            </View>
                        </View>
                    )
                }</ScrollView>
                {/*
                not sure if we need this, defaults are set anyways
                <View style={styles.bottom}>
                    <TouchableOpacity style={{marginBottom: 5, justifyContent: 'center', alignItems: 'center', height: 40, width: '100%', borderColor: PRIMARY, borderWidth: 1}}>
                        <Text style={{color: 'white', fontSize: 20}}>Skip and use Default Weights</Text>
                    </TouchableOpacity>
                </View>*/}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    bottom: {width: '100%', backgroundColor: 'black', alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default RoutineSetupScreen;
