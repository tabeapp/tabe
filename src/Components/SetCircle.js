import React, {useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ProgressContext from '../Contexts/ProgressContext';

const reps = [];
for(let i = 0; i < 20; i++)
    reps.push(i)

//fine, I'll do it msyelf
//add haptic feedback later
const RepPicker = (props) => {
    return (<ScrollView>
        <Text>{props.value}</Text>
    </ScrollView>);
};

const SetCircle = (props) => {
    const {updateSet} = useContext(ProgressContext);
    //this will be undefined and shouldn't be accessible
    //if it's current, it will be editable
    if(!props.progress){
        return (
            <View style={{ ...styles.circle, ...props.style }} >
                <Text style={{ color: 'white' }}>{
                    props.text
                }</Text>
            </View>
        );
    }
    let [exerciseN, setN] = props.info;
    const handlePress = () => {
        //locks it esssentially
        //we could probably do something with current set, but for now just this
        //parse int cuz sometimes it says 5+
        updateSet(exerciseN, setN, parseInt(props.text));




    };

    return (
        <TouchableOpacity style={{ ...styles.circle, ...props.style }} onPress={handlePress}>
            <Text style={{ color: 'white' }}>{
                props.text
            }</Text>
        </TouchableOpacity>
    );
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
