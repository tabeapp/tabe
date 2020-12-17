import React from 'react';
import Words from "./Words";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RepSchemeEditor = props => {
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?
    return(
        <>
            <Words style={{fontSize: 40}}>Custom Rep Scheme</Words>
            <Words>(workouts in this scheme will cycle through the following sets)</Words>
            <View style={{justifyContent: 'center', height: 200, margin: 5, width: 400, backgroundColor: '#333'}}>
                {
                    props.sets.map((week, index) =>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Words>{index+1}:</Words>
                            <View style={{flex: 1, height: 40, backgroundColor: 'black', borderRadius: 20}}></View>
                        </View>

                    )

                }
                <TouchableOpacity style={styles.configButton} onPress={() => {
                    //append a new obj
                    //works, but ideally I'd like A B C instead of 1 2 3
                    //setWorkouts({...workouts, [Object.keys(workouts).length+1]: []});
                    props.edit(prev => [...prev, []])
                }}>
                    <Text style={{fontSize: 30}}>Add Week(?)</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    configButton: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    }
})

export default RepSchemeEditor;
