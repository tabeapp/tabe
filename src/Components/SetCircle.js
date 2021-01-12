import React, {useState, useContext} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Words from "./Words";
import WorkoutContext from "../Contexts/WorkoutContext";

//const reps = [];
//for(let i = 0; i < 20; i++)
    //reps.push(i)

const CURRENT = 'c';

const SetCircle = (props) => {
    const {workoutDispatch} = useContext(WorkoutContext);

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
        if(props.setInfo.progress && props.setInfo.progress !== CURRENT)
            text = props.setInfo.progress;
        return (
            <View style={{ ...styles.circle, ...props.style }} >
                <Words>{
                    text
                }</Words>
            </View>
        );
    }
    let [exerciseN, setN] = props.info;
    const handlePress = () => {
        //locks it esssentially
        //we could probably do something with current set, but for now just this
        //parse int cuz sometimes it says 5+

        workoutDispatch(prev => {
            const exercises = prev.exercises;
            //check to see if we need to move the current indicator

            const x = exercises[exerciseN].sets[setN];
            const move = x.progress === CURRENT;
            //if only would be this easy, but we also need to move the current
            x.progress = prog;

            if(move){
                if (setN + 1 === exercises[exerciseN].sets.length){
                    if (exerciseN + 1 === exercises.length) {
                        prev.done = true;
                    }
                    else
                        exercises[exerciseN + 1].sets[0].progress = CURRENT;
                }
                else
                    exercises[exerciseN].sets[setN+1].progress = CURRENT;
            }
            return prev;
        });
    };


    //we're copying numeric selector
    //we really should pass down amrap

    /*const temp = [];
    //for some reason I think react really really doesn't like this line
    for(let i = 0; i < props.setInfo.amrap?props.setInfo.reps:40; i++)
        temp.push(i)*/
    //const temp = [0,1,2,3,4,5];
    const temp = [];
    const limit = props.setInfo.amrap?40:props.setInfo.reps;
    for(let i = 0; i <= limit; i++)
        temp.push(i);


    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ ...styles.circle, ...props.style }}
        >
            <Words>^</Words>
            <Picker
                style={{width: 50, height: 50}}
                selectedValue={prog}
                itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                onValueChange={(value) => {
                    setProg(value);
                }}
            >
                {
                    temp.map(item =>
                        <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                }
            </Picker>
            <Words style={{transform: [{rotate: '180deg'}]}}>^</Words>
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

