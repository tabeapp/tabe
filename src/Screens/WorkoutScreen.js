import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import ProgressContext from '../Contexts/ProgressContext';
import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';

const primaryColor = '#66d6f8';

const WorkoutScreen = () => {
    let { workout, generateReport} = useContext(ProgressContext);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>{workout.title}</Text>
                </View>
                <View style={styles.container}>{
                    workout.exercises.map((ex, index) => (
                        <ExerciseCard key={ex.name} exercise={ex} exerciseN={index} />
                    ))
                }</View>
                {
                    //done && <TouchableOpacity style={{backgroundColor: 'green', width: 50, height: 30}}/>
                    <Text style={{color:'white'}} >{generateReport()}</Text>
                }
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {alignItems: 'center', justifyContent: 'center', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default WorkoutScreen;
