import React from 'react';
import {Text, View, StyleSheet}  from 'react-native';
//get custom icons eventually

import WeightVisual from "../Utils/WeightVisual";
import SetCircle from "./SetCircle";


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

const ExerciseCard = (props) => {
    //this is a string
    //maybe not the worst idea to pass this stuff down if we're gonna be calling much

    //this shoudl be fine
    //name is deadlfit, sets is [5,5,5], progress is [5,'c', null]
    //current is 315, primary is true, amrap is true
    const {name, sets, progress,
        //these are copied from weight
        current, primary, amrap} = props.exercise;


    let colors = [];
    let outlines = [];
    let done = true;

    sets.forEach((set, n) => {
        //it'll be null
        if(!progress[n] || progress[n] === 'c'){
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

    sets.forEach((n, index) => {
        const prog = progress[index];

        let completion = prog >= n ? 1 : 0;
        //let done = progress && progress[index] >= n;
        if(index === sets.length-1){
            if(amrap){
                if(prog >= n)
                    n = prog;
                else
                    n += '+';
            }
        }

        let current = prog === 'c';
        items.push(
            <SetCircle key={index} progress={prog} current={current} info={[props.exerciseN, index]} text={n} style={{backgroundColor: colors[index], borderColor: current?primaryColor:outlines[index]}}/>
        );


        if(index !== sets.length-1)
            items.push(<MidLine key={index+'-'} completion={completion}/>);
    });

    //cool weight icons, trust me looks cool
    if(primary){
        items.unshift(<MidLine key={'b'} completion={1}/>);
        items.push(<MidLine key={'y'} completion={1}/>);

        items.unshift(<WeightVisual key={'a'} weight={current} reverse={true} />);
        items.push(<WeightVisual key={'z'} weight={current}/>);
    }


    return (
        <View style={styles.card} key={name}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white' }}>{name}</Text>
                <Text style={{ color: 'white' }}>{current}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{
                items.map(i => i)
            }</View>
        </View>
    );
};

const styles = StyleSheet.create(
    { card: {margin: 5, padding: 5, borderRadius: 5, width: '100%', backgroundColor: '#222'}, }
);

export default ExerciseCard;
