import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Words from '../Simple/Words';
import { SafeAreaView } from 'react-navigation';
import { WorkoutContext } from '../../Contexts/WorkoutProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Row from '../Simple/Row';
import { BACKGROUND } from '../../Style/Colors';
import RestCircle from './RestCircle';
import { useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';

//so i wonder if this should have its own state or rely on workout.timer ({mintues:3, seconds:0})
//own state might be faster tbh
//note: maybe this should be saved as part of the workout, or do some kind of
//next workout = new Date().getTime() + seconds
//then countdown to that
//cuz if you close the app during the rest, it'll just reset instead of go away
const RestTimer = props => {
    //the only method we'll need
    const {workoutDispatch} = useContext(WorkoutContext);
    const close = () => workoutDispatch(prev => {
        //would be a fine place to send a notification
        //this should really be called restEnd
        prev.timer = 0;
        prev.restStart = 0;
        return prev;
    });

    //not too sure about this but idk
    //there's a reason for -1, we have a useeffect that clears timer when seconds = 0

    const [show, setShow] = useState(true);

    //startrest ---- now ---------- timer
    //(now-timer)/(startrest-timer)

    const progress = useSharedValue(0);

    const {timer, restStart} = props;

    //as long as this component doesn't update props.timer, you should be good
    //you know what, fuck this we're gonna only use seconds
    //this minutes and seconds shit is gonna make a lot of ode and headache
    useEffect(() => {
        //this bs can happen when workoutscreen closes
        if(timer === undefined)
            return;

        const now = new Date().getTime();
        //setSeconds(props.timer);
        //don't run this shit if it's 0
        if(now > timer){
            setShow(false);
            return;
        }

        const newNow = new Date().getTime();
        const diff = timer - newNow;
        if(diff < 0){
            setShow(false);
            return;
        }
        setShow(true);

        //ratio shit
        progress.value = (now-restStart)/(timer-restStart);

        progress.value = withTiming(1, {
            duration: Math.round(diff), easing: Easing.linear
        }, () => runOnJS(close)());

    }, [timer]);


    //safe area view doesnt do shit
    return (
        <Modal animationType={'slide'} transparent={true} visible={show}>
            <SafeAreaView style={{backgroundColor: 'rgba(129,129,129,.4)', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Row style={{width: '100%', justifyContent: 'space-around'}}>
                    <RestCircle progress={progress}/>
                </Row>

                <TouchableOpacity style={{margin: 30, borderRadius: 100, backgroundColor: BACKGROUND}} onPress={close}>
                    <Words><Ionicons size={60} name={'close'}/></Words>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

export default RestTimer;
