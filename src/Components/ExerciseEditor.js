import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import NumericSelector from "./NumericSelector";
import Words from "./Words";
import { Picker } from "@react-native-picker/picker";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

const ExerciseEditor = props => {
    //ugh this sucks
    const {name, info, deleteExercise, editExercise, editSets, updateType} = props;

    //i guess the width is 400?
    //there's gotta be a more programmatic way to do this
    return <View key={name} style={{margin: 5, width: 400, backgroundColor: '#333'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color:'white'}}>{name}</Text>
            <TouchableOpacity onPress={deleteExercise} style={{width: 20, borderWidth: 1, borderColor: 'red', borderRadius: 10}}>
                <Text style={{color:'red'}}>X</Text>
            </TouchableOpacity>
        </View>

        <Text>Current Working Weight: </Text>
        <NumericSelector onChange={() => {}} numInfo={{def:info.current, min: 0, max: 995, increment: 5}}/>

        <Text>Sets:</Text>
        <Words>Set Type:</Words>
        <Picker
            style={{width: 100, height: 50}}
            selectedValue={info.setInfo.type}
            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
            onValueChange={value => {
                editExercise(value, 'setInfo', 'type');
                updateType(value)

            }}
        >
            {
                ['Normal', 'Custom', 'Sum', 'Timed'].map(item =>
                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
            }
        </Picker>

        {
            //this should actually be very similar to custom workout screen
            info.setInfo.type === 'Normal' &&
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                                  onPress={() => editSets(false)}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15, }}>-</Text>
                </TouchableOpacity>
                {
                    info.setInfo.sets.map((v, index) =>

                        <View key={index} style={styles.circle}>
                            <Picker
                                style={{width: 50, height: 50}}
                                selectedValue={v}
                                itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                onValueChange={(value) => {
                                    //how the fuck
                                    editExercise(value, 'setInfo', 'sets', index);
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
                                  onPress={() => editSets(true)}>
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                </TouchableOpacity>
            </View>
        }
        {
            //oh god wtf should we do here for 5/3/1
            info.setInfo.type === 'Custom' &&
            <View></View>
        }
        {
            info.setInfo.type === 'Sum' &&
            <View style={styles.circle}>
                <Picker
                    style={{width: 50, height: 50}}
                    selectedValue={info.setInfo.sum}
                    itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                    onValueChange={(value) => {
                        editExercise(value, 'setInfo', 'sum');
                    }}
                >
                    {
                        reps.map(item =>
                            <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                    }
                </Picker>
            </View>
        }
        {
            info.setInfo.type === 'Timed' &&
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <NumericSelector onChange={(val) => {
                    editExercise(val, 'setInfo', 'minutes');

                }} numInfo={{def:info.setInfo.minutes, min: 0, max: 59, increment: 1}}/>
                <Words>:</Words>
                <NumericSelector onChange={(val) => {
                    editExercise(val, 'setInfo', 'seconds');

                }} numInfo={{def:info.setInfo.seconds, min: 0, max: 55, increment: 5}}/>
            </View>
        }
        <Text>Progression:</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Words>Add</Words>
            <NumericSelector onChange={() => {}} numInfo={{def:info.progress.amount, min: 0, max: 25, increment: 2.5}}/>
            <Words>lb every</Words>
            <NumericSelector onChange={() => {}} numInfo={{def:info.progress.rate, min: 1, max: 10, increment: 1}}/>
            <Words>times the workout is done</Words>
        </View>


        {
            info.setInfo.type === 'Normal' &&
            <View>
                <Text>AMRAP Last Set:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={info.amrap ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {}}
                    value={info.amrap}
                />
            </View>
        }



    </View>
    //return <Text style={{color:'white'}}>{k + ' ' + JSON.stringify(v)}</Text>

};

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        minWidth: 20,
        maxWidth: 50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

export default ExerciseEditor;
