import React, {useContext} from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
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
    let [exerciseN, set] = props.info;
    const {updateSet} = useContext(ProgressContext);
    const handlePress = () => {
        //locks it esssentially
        //if(!props.current)
            //return;
        //we could probably do something with current set, but for now just this
        updateSet(exerciseN, set, props.text);




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
        width:50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    },
});

export default SetCircle;
