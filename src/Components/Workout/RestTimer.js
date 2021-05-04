import React, { useContext, useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Words from '../Simple/Words';
import { SafeAreaView } from 'react-navigation';
import { WorkoutContext } from '../../Contexts/WorkoutProvider';
import { SEC_TO_TIME } from '../../Utils/UtilFunctions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Row from '../Simple/Row';
import { BACKGROUND } from '../../Style/Colors';
import RestCircle from './RestCircle';
import { useSharedValue, withTiming } from 'react-native-reanimated';

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
        prev.timer = 0;
        prev.restStart = 0;
        return prev;
    });

    //not too sure about this but idk
    //there's a reason for -1, we have a useeffect that clears timer when seconds = 0
    const [seconds, setSeconds] = useState(-1);

    //startrest ---- now ---------- timer
    //(now-timer)/(startrest-timer)
    const [ratio, setRatio] = useState(0);

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
            setSeconds(0);
            return;
        }

        const newNow = new Date().getTime();
        const diff = timer - newNow;
        if(diff < 0){
            setSeconds(0);
            return;
        }
        setSeconds(1);

        progress.value = withTiming(1, {duration: Math.round(diff)*1000});

        /*
        //start the countdown
        const interval = setInterval(() => {
            setSeconds(() => {
                //const now = new Date().getTime()

                return diff/1000;
            });
        }, 100);//temporarily speeding it up

        return () => clearInterval(interval);*/

    }, [timer]);


    //safe area view doesnt do shit
    return (
        <Modal animationType={'slide'} transparent={true} visible={seconds > 0}>
            <SafeAreaView style={{backgroundColor: 'rgba(129,129,129,.4)', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Row style={{width: '100%', justifyContent: 'space-around'}}>

                    <TouchableOpacity
                        onPress={() => {
                            //when subtracting, need to check if we even can
                            //also this goes straight to wokroutdispatch
                            progress.value = withTiming(0, {duration: 100});
                        }}
                        style={{width: 50, height: 50, backgroundColor: 'green', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Words style={{fontSize: 15, textAlign: 'center'}}>-2:00</Words>
                    </TouchableOpacity>

                    {/*TODO thi
                    s should use react native svg*/}

                    <RestCircle progress={progress}/>

                    <TouchableOpacity
                        onPress={() => {
                            //you can always add time
                            progress.value = withTiming(1, {duration: 100});
                            //workoutDispatch(prev => {
                                //prev.timer += 2*60*1000;
                                //return prev;
                            //});
                        }}
                        style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Words style={{fontSize: 15, textAlign: 'center'}}>+2:00</Words>
                    </TouchableOpacity>

                </Row>

                <TouchableOpacity style={{margin: 20, borderRadius: 100, backgroundColor: BACKGROUND}} onPress={close}>
                    <Words><Ionicons size={60} name={'close'}/></Words>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

export default RestTimer;
