import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View, SafeAreaView} from 'react-native';

import { PRIMARY } from '../Constants/Theme';
import { SSDefault } from "../Assets/DefaultRoutines/SSDefault";
import { FiveThreeOneDefault } from "../Assets/DefaultRoutines/FiveThreeOneDefault";
import { MetallicaPPLDefault } from "../Assets/DefaultRoutines/MetallicaPPLDefault";
import Words from "../Components/Words";
import WorkoutContext from "../Contexts/WorkoutContext";
import SafeBorder from "../Components/SafeBorder";
import TopBar from "../Components/TopBar";

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
    const {generateCustom} = useContext(WorkoutContext);
    const handleCustomPress = () => {
        //set up
        generateCustom();
        props.navigation.navigate('workout');
    };

    const handleRoutinePress = async r => {
        //no we need to set values first
        props.navigation.navigate('routinesetup', {routine: r.obj});
        //await setRoutine(r);
        //initializeWorkout();
        //props.navigation.navigate('workout');
    };

    return (
        <SafeBorder>
            <TopBar title='Routine Selector'/>
            <Words style={{paddingVertical: 5, paddingHorizontal: 10, fontSize: 30}}>Recommended Routines</Words>
            <View style={styles.container}>{
                routines.map(r =>
                    <TouchableOpacity
                        key={r.title}
                        onPress={() => handleRoutinePress(r)}
                        style={{backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100, width: '48%'}}
                    >
                        <Words style={{fontSize: 20}}>{
                            r.title
                        }</Words>
                        <Words>{
                            r.description
                        }</Words>
                    </TouchableOpacity>)
            }</View>
            <TouchableOpacity
                onPress={handleCustomPress}
                style={{backgroundColor: '#333', padding: 5, margin: 4, borderRadius: 20, height: 80, width: '98%'}}
            >
                <Words style={{fontSize: 20}}>Custom</Words>
                <Words>Build your own routine</Words>
            </TouchableOpacity>
        </SafeBorder>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
});

export default ChooseRoutineScreen;
