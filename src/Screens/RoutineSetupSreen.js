import React, { useContext, useState } from "react";
import {TouchableOpacity, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';

import { PRIMARY } from '../Constants/Theme';
import NumericSelector from '../Components/NumericSelector';
import Words from "../Components/Words";
import WorkoutContext from "../Contexts/WorkoutContext";
import RoutinesContext from "../Contexts/RoutinesContext";
import SafeBorder from "../Components/SafeBorder";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";

const primaryColor = '#66d6f8';

const repNumbers = {
    def: 1,
    min: 1,
    max: 10,
    increment: 1
};

//this screen is used to input prs and bulid a custom routine based on another
const RoutineSetupScreen = props => {
    const {generateRoutine} = useContext(RoutinesContext);
    const {generateWorkout} = useContext(WorkoutContext);

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

        generateWorkout();
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
        <SafeBorder>
            <TopBar
                leftText='Back' title='Routine Setup' right='Begin'
                    onPressRight={handleNext}
            />
            <ScrollView>{
                maxEfforts.map(ex =>
                    <View key={ex.name} style={{backgroundColor: '#333', padding: 5, margin: 4, borderRadius: 15, width: '98%'}}>
                        <Words style={{fontSize: 20}}>{ex.name}</Words>
                        <Row style={{justifyContent: 'space-around', height: 90}}>
                            <Words style={{fontSize: 20}}>Enter Max Effort:</Words>

                            <NumericSelector onChange={reps => updateRep(ex.name, reps)} numInfo={repNumbers}/>

                            <Words style={{fontSize: 20}}>x</Words>

                            <NumericSelector onChange={weight => updateWeight(ex.name, weight)} numInfo={{def: ex.weight, min: 0, max: 1000, increment: 5}}/>
                        </Row>
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
        </SafeBorder>
    );
};

export default RoutineSetupScreen;
