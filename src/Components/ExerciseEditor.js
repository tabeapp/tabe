import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import NumericSelector from "./NumericSelector";
import Words from "./Words";
import { Picker } from "@react-native-picker/picker";

const ExerciseEditor = props => {
    const {name, info, deleteExercise, editExercise} = props;

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

            }}
        >
            {
                ['Normal', 'Custom', 'Sum', 'Timed'].map(item =>
                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
            }
        </Picker>

        <Text>Custom prgression(like5/3/1):</Text>
        {
            //this should actually be very similar to custom workout screen
            info.setInfo.type === 'Normal' &&
            info.setInfo.sets.map((v, index) =>
                <View key={index} style={{ ...styles.circle }}>
                    <Text style={{ color: 'white' }}>{v}</Text>
                </View>
            )
        }
        {
            //oh god wtf should we do here for 5/3/1
            info.setInfo.type === 'Custom' &&
            <View></View>
        }
        <Text>Progression:</Text>
        {
            info.progress &&
            <>
                <NumericSelector onChange={() => {}} numInfo={{def:info.progress.amount, min: 0, max: 25, increment: 2.5}}/>
                <Text>every</Text>
                <NumericSelector onChange={() => {}} numInfo={{def:info.progress.rate, min: 1, max: 10, increment: 1}}/>
                <Text>times the workout is done</Text>
            </>

        }


        <Text>AMRAP Last Set:</Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={info.amrap ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {}}
            value={info.amrap}
        />



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
