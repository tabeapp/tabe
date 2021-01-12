import React, { useContext } from "react";
import {TouchableOpacity, Text, View, StyleSheet}  from 'react-native';
//get custom icons eventually

import WeightVisual from "../Utils/WeightVisual";
import SetCircle from "./SetCircle";
import Words from "./Words";
import WorkoutContext from "../Contexts/WorkoutContext";


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//yes this will eventually implement timer visual
const MidLine = (props) => {

    //use key here to check a timer
    //clever flex
    return <View key={props.id} style={{alignSelf: 'center', height:4, maxWidth: 20, flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: props.completion, backgroundColor: 'white' }} />
        <View style={{ flex: 1-props.completion, backgroundColor: 'gray' }} />
    </View>
};

const SetModButton = props => {
    const {workoutDispatch} = useContext(WorkoutContext);
    const {exerciseN} = props;

    const add = props.type === '+';
    const color = add ? 'lightgreen': 'red';

    return (
        <TouchableOpacity
            style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: color}}
            onPress={() => {
                workoutDispatch(prev => {
                    const x = prev.exercises[exerciseN].sets;
                    x.push({...x[x.length-1]});
                    return prev;
                });
            }}
        >
            <Words>{props.type}</Words>
        </TouchableOpacity>

    );
};

const CustomExerciseCard = (props) => {
    //this is a string
    //maybe not the worst idea to pass this stuff down if we're gonna be calling much

    //this shoudl be fine
    //name is deadlfit, sets is [5,5,5], progress is [5,'c', null]
    //current is 315, primary is true, amrap is true
    //const {name, sets, progress,
    //these are copied from weight
    //current, primary, amrap} = props.exercise;
    const {name, barbell, sets} = props.exercise;


    let colors = [];
    let outlines = [];
    let done = true;

    sets.forEach(set => {
        //it'll be null
        if(!set.progress || set.progress === 'c'){
            colors.push('transparent');
            outlines.push(secondaryColor);
            done = false;
        }
        else{
            colors.push(primaryColor);
            outlines.push(primaryColor);

        }

    });

    //let outlines = sets.map(_ => secondaryColor);
    if(done){
        colors = colors.map(_ => 'lightgreen');
        outlines = sets.map(_ => 'lightgreen');
    }
    //if(progress && progress.length === exercise.length)

    //weights, circles, and more fun
    const items = [];

    let currentWeight = 0;
    if(sets[sets.length-1])
        currentWeight = sets[sets.length-1].weight;

    sets.forEach((set, index) => {
        const {amrap, progress, reps, weight} = set;
        //const prog = progress[index];

        let completion = progress >= reps ? 1 : 0;
        let text = reps;
        let current = progress === 'c';

        //let done = progress && progress[index] >= n;
        if(amrap && (!progress|| current))
            text = reps + '+';

        items.push(
            <SetCircle key={index} progress={progress} current={current} info={[props.exerciseN, index]} text={text} style={{backgroundColor: colors[index], borderColor: current?primaryColor:outlines[index]}}/>
        );



        if(index !== sets.length-1)
            items.push(<MidLine key={index+'-'} completion={completion}/>);
    });

    //cool weight icons, trust me looks cool
    if(barbell){
        items.unshift(<MidLine key={'c'} completion={1}/>);
        items.push(<MidLine key={'x'} completion={1}/>);

        items.unshift(<WeightVisual key={'b'} weight={currentWeight} reverse={true} />);
        items.push(<WeightVisual key={'y'} weight={currentWeight}/>);

        //this is vital

    }

    //nah
    //items.unshift(
    //items.push(

    return (
        <View style={styles.card} key={name}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Words>{name}</Words>
                <Words>{currentWeight}</Words>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                <SetModButton key={'a'} type='-' exerciseN={props.exerciseN}/>

                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{
                    items.map(i => i)
                }</View>

                <SetModButton key={'z'} type='+' exerciseN={props.exerciseN}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    { card: {margin: 5, padding: 5, borderRadius: 5, width: '100%', backgroundColor: '#222'}, }
);

export default CustomExerciseCard;
