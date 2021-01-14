import React, { useState, useEffect, useContext } from 'react';
import {Modal} from 'react-native';
import Words from './Words';
import { SafeAreaView } from 'react-navigation';
import WorkoutContext from '../Contexts/WorkoutContext';

//make it possible to cancel
//so i wonder if this should have its own state or rely on workout.timer ({mintues:3, seconds:0})
//own state might be faster tbh
const RestTimer = props => {
    //the only method we'll need
    const {workoutDispatch} = useContext(WorkoutContext);
    const close = () => workoutDispatch({ path: 'timer', value: 0 });

    //not too sure about this but idk
    const [seconds, setSeconds] = useState(0);

    //as long as this component doesn't update props.timer, you should be good
    //you know what, fuck this we're gonna only use seconds
    //this minutes and seconds shit is gonna make a lot of ode and headache
    useEffect(() => {
        setSeconds(props.timer);
        //don't run this shit if it's 0
        if(props.timer === 0)
            return;

        //start the countdown
        const interval = setInterval(() => {
            setSeconds(prev => {
                if(prev === 0){
                    clearInterval(interval);
                    return prev;
                }
                return prev-1;
            });
        }, 100);//temporarily speeding it up

        return () => clearInterval(interval);

    }, [props.timer]);

    useEffect(() => {
        if(seconds === 0)
            close()
    }, [seconds])

    //safe area view doesnt do shit
    return (
        <Modal animationType={'slide'} transparent={true} visible={seconds !== 0} onCloseRequest={close}>
            <SafeAreaView style={{backgroundColor: 'orange'}}>
                <Words>{seconds}</Words>
            </SafeAreaView>
        </Modal>
    );
}

export default RestTimer;
