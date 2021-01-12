import React, {useContext} from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
//get custom icons eventually

import ProgressContext from '../Contexts/ProgressContext';
import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import WorkoutContext from "../Contexts/WorkoutContext";

const primaryColor = '#66d6f8';

const WorkoutScreen = props => {
    let {  generateReport} = useContext(ProgressContext);
    const {workout} = useContext(WorkoutContext);

    const handleNext = () => {
        //take the workout
        //compile it into a report
        //show it to the user on a new screen
        props.navigation.navigate('report', {
            report: generateReport()
        });
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Discard
                        </Words>
                    </TouchableOpacity>
                    <Words style={{fontSize: 20}}>{workout?workout.title:''}</Words>
                    <TouchableOpacity onPress={handleNext} style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Next
                        </Words>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>{
                    workout&&workout.exercises.map((ex, index) => (
                        <ExerciseCard key={ex.name} exercise={ex} exerciseN={index} />
                    ))
                }</View>
                {
                    //done && <TouchableOpacity style={{backgroundColor: 'green', width: 50, height: 30}}/>
                    //<Text style={{color:'white'}} >{generateReport()}</Text>
                }
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {alignItems: 'center', justifyContent: 'center', margin: 5},
    //top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
});

export default WorkoutScreen;
