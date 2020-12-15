import React, {useState, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressContext from '../Contexts/ProgressContext';

//const reps = [];
//for(let i = 0; i < 20; i++)
    //reps.push(i)

//fine, I'll do it msyelf
//add haptic feedback later
const RepPicker = (props) => {
    return (<ScrollView>
        <Text>{props.value}</Text>
    </ScrollView>);
};

const SetCircle = (props) => {
    const {updateSet} = useContext(ProgressContext);

    //ok this is kinda confusing, but props.setInfo.reps is how much you're supposed to do
    const [prog, setProg] = useState(props.setInfo.reps);
    //const [reps, setReps] = useState(props.setInfo.reps);
    //this will be undefined and shouldn't be accessible

    //only if it's current, it will be editable
    //if(props.setInfo.progress !== 'c'){
    if(!props.current){
        let text = props.setInfo.reps;
        if(props.setInfo.amrap)
            text += '+';
        return (
            <View style={{ ...styles.circle, ...props.style }} >
                <Text style={{ color: 'white' }}>{
                    text
                }</Text>
            </View>
        );
    }
    let [exerciseN, setN] = props.info;
    const handlePress = () => {
        //locks it esssentially
        //we could probably do something with current set, but for now just this
        //parse int cuz sometimes it says 5+
        updateSet(exerciseN, setN, prog);

    };

    const onChange = value => {
        //send to context here too

    }

    //we're copying numeric selector
    //we really should pass down amrap

    /*const temp = [];
    //for some reason I think react really really doesn't like this line
    for(let i = 0; i < props.setInfo.amrap?props.setInfo.reps:40; i++)
        temp.push(i)*/
    const temp = [0,1,2,3,4,5];


    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ ...styles.circle, ...props.style }}
        >
            <Text style={{color:'white'}}>^</Text>
            <Picker
                style={{width: 50, height: 50}}
                selectedValue={prog}
                itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                onValueChange={(value) => {
                    setProg(value);
                    onChange(value);
                }}
            >
                {
                    temp.map(item =>
                        <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                }
            </Picker>
            <Text style={{color:'white', transform: [{rotate: '180deg'}]}}>^</Text>
        </TouchableOpacity>
    );
    /*<TouchableOpacity style={{ ...styles.circle, ...props.style }} onPress={handlePress}>
        <Text style={{ color: 'white' }}>{
            props.text
        }</Text>
    </TouchableOpacity>*/
};

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        minWidth:20,
        maxWidth:50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    },
});

export default SetCircle;

