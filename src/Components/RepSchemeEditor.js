import React from 'react';
import Words from "./Words";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

const RepSchemeEditor = props => {
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?

    //this is kinda going to resemble customexercise card
    return(
        <>
            <Words style={{fontSize: 40}}>Custom Rep Scheme</Words>
            <Words>(workouts in this scheme will cycle through the following sets)</Words>
            <View style={{justifyContent: 'center', height: 200, margin: 5, width: 400, backgroundColor: '#333'}}>
                {
                    props.sets.map((week, index) =>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Words>{index+1}:</Words>
                            <View style={{flex: 1, height: 40, backgroundColor: 'black', borderRadius: 20}}>
                                {
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <TouchableOpacity style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                                                          onPress={() => {}}>
                                            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15, }}>-</Text>
                                        </TouchableOpacity>
                                        {
                                            props.sets.map((v, index) =>

                                                <View key={index} style={styles.circle}>
                                                    <Picker
                                                        style={{width: 50, height: 50}}
                                                        selectedValue={v}
                                                        itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                                        onValueChange={(value) => {
                                                            //how the fuck
                                                            //editExercise(value, 'setInfo', 'sets', index);
                                                            //setProg(value);
                                                        }}
                                                    >
                                                        {
                                                            reps.map(item =>
                                                                <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                                        }
                                                    </Picker>
                                                </View>
                                            )
                                        }
                                        <TouchableOpacity style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                                                          onPress={() => {}}>
                                            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
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
