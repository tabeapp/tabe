import React from 'react';
import Words from "./Words";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah maybe I should make another compoenent for htis
const percents = [];
for(let i = 0; i <= 100; i+= 5)
    percents.push(i)


const RepSchemeEditor = props => {
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?

    //this is kinda going to resemble customexercise card
    return(
        <>
            <Words style={{fontSize: 40}}>Custom Rep Scheme</Words>
            <Words>(workouts using this scheme will cycle through the following sets)</Words>
            <View style={{justifyContent: 'center', height: 400, margin: 5, width: 400, backgroundColor: '#333'}}>
                {
                    props.sets.map((week, weekIndex) =>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Words>{weekIndex+1}:</Words>
                            <View style={{flex: 1, height: 60, backgroundColor: 'transparent', borderRadius: 20}}>
                                {
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <TouchableOpacity
                                            style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                                            onPress={() => {
                                                props.edit(prev => {
                                                    const next = [...prev];
                                                    next[weekIndex].splice(next[weekIndex].length-1)
                                                    return next;
                                                })

                                            }}>
                                            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15, }}>-</Text>
                                        </TouchableOpacity>
                                        {
                                            week.map((v, setIndex) =>

                                                <>
                                                    <View key={setIndex} style={styles.circle}>
                                                        <Picker
                                                            style={{width: 50, height: 50}}
                                                            selectedValue={v.reps}
                                                            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                                            onValueChange={value => {
                                                                props.edit(prev => {
                                                                    const next = [...prev];
                                                                    next[weekIndex][setIndex].reps = value;
                                                                    return next;
                                                                })
                                                            }}
                                                        >
                                                            {
                                                                reps.map(item =>
                                                                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                                            }
                                                        </Picker>
                                                    </View>
                                                    <Words>@</Words>
                                                    <View key={setIndex} style={styles.circle}>
                                                        <Picker
                                                            style={{width: 50, height: 50}}
                                                            selectedValue={v['%']}
                                                            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                                            onValueChange={value => {
                                                                props.edit(prev => {
                                                                    const next = [...prev];
                                                                    next[weekIndex][setIndex]['%'] = value;
                                                                    return next;
                                                                })
                                                            }}
                                                        >
                                                            {
                                                                percents.map(item =>
                                                                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                                            }
                                                        </Picker>
                                                    </View>
                                                    <Words>%</Words>
                                                </>
                                            )
                                        }
                                        <TouchableOpacity
                                            style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                                            onPress={() =>
                                                props.edit(prev => {
                                                    const next = [...prev];
                                                    //weekIndex available
                                                    if(next[weekIndex].length === 0)
                                                        next[weekIndex] = [{reps:5, '%': 100}];
                                                    else//im just worried this doesn't actualy copy the object
                                                        next[weekIndex].push({...next[weekIndex][next[weekIndex].length-1]});

                                                    return next;


                                                })

                                            }
                                        >
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
                    props.edit(prev => {
                        if(prev.length === 0)
                            return [...prev, []]
                        else//need to do an extra deep copy
                            return [...prev, JSON.parse(JSON.stringify(prev[prev.length-1]))]
                    })
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
