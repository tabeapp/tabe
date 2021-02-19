import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Words from '../Simple/Words';
import WorkoutContext from '../../Contexts/WorkoutProvider';
import { CURRENT, FAILURE } from '../../Constants/Symbols';
import Chooser from '../Simple/Chooser';
import { STYLES } from '../../Style/Values';

const SetCircle = (props) => {
    const {workoutDispatch} = useContext(WorkoutContext);

    const {current, setInfo, style, info, edit} = props;

    const {reps, progress, amrap} = setInfo;

    //ok this is kinda confusing, but props.setInfo.reps is how much you're supposed to do
    const [prog, setProg] = useState(setInfo.reps === FAILURE?0:setInfo.reps);
    //const [reps, setReps] = useState(props.setInfo.reps);
    //this will be undefined and shouldn't be accessible

    //only if it's current, it will be editable
    //if(props.setInfo.progress !== 'c'){

    //
    if(!current && !edit){
        let text = reps;
        if(amrap)
            text += '+';
        if(progress !== null && progress !== CURRENT)
            text = progress;
        return (
            <View style={{ ...STYLES.circle, ...style }} >
                <Words>{
                    text
                }</Words>
            </View>
        );
    }
    let [exerciseN, setN] = info;
    const handlePress = () => {
        //now with edit, it's possible to press non-current sets
        //this'll make sure nothign happens in taht case
        if(!current)
            return;

        workoutDispatch(prev => {
            prev.exercises[exerciseN].sets[setN].progress = prog;
            //kinda a weird place to set the timer, but it is where we the the button is pressed
            //this is a unix timestamp, in seconds
            //could also use startrest type of thing
            prev.timer = new Date().getTime() + prev.exercises[exerciseN].rest*1000;
            //I guess this would be 0 usually?
            prev.restStart = new Date().getTime();
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

    //if reps go to failure, or it's amrap, or edit is turned on, you can set it to as many reps as you want
    let limit = reps;
    if(reps === FAILURE || amrap || edit)
        limit = 40;

    const temp = [];
    for(let i = 0; i <= limit; i++)
        temp.push(i);

    //wonder if this works with amrap and failure
    //three scenarios
    //current
    let selected = prog;
    //past set
    if(progress && progress !== CURRENT)
        selected = progress;
    //future
    else if(!current)
        selected = reps;

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{ ...STYLES.circle, ...style }}
        >
            <Words>^</Words>
            <Chooser
                selected={selected}
                //fuck it, if we're in edit mode, you can just set progress to whatever you want
                onChange={value => {
                    if(!edit)
                        setProg(value);
                    //otherwise we're actually gonna directly change expected reps in the workout
                    else
                        //if it's a past or currentset, change the completed reps(progress)
                        if(progress && progress !== CURRENT)
                            workoutDispatch({path: `exercises.${exerciseN}.sets.${setN}.progress`, value: value});
                        else if(current)
                            setProg(value);
                        //if it's a future set, change the expected reps(reps)
                        else
                            workoutDispatch({path: `exercises.${exerciseN}.sets.${setN}.reps`, value: value});

                }}
                list={temp}
            />
            <Words style={{transform: [{rotate: '180deg'}]}}>^</Words>
        </TouchableOpacity>
    );
};

export default SetCircle;

