import React, { useState, useEffect } from 'react';
import {Modal} from 'react-native';
import Words from "./Words";
import { SafeAreaView } from "react-navigation";

//make it possible to cancel
//so i wonder if this should have its own state or rely on workout.timer ({mintues:3, seconds:0})
//own state might be faster tbh
const RestTimer = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    //props.visible

    //not too sure about this but idk
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    //as long as this component doesn't update props.timer, you should be good
    useEffect(() => {
        setMinutes(props.timer.minutes);
        setSeconds(props.timer.seconds);
    }, [props.timer]);


    //safe area view doesnt do shit
    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible} onRequest={() => {console.log('idk')}}>
            <SafeAreaView style={{backgroundColor: 'orange'}}>
                <Words>{minutes + ' ' + seconds}</Words>
            </SafeAreaView>
        </Modal>
    );
}

export default RestTimer;
