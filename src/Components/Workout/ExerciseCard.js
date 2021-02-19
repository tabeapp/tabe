import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import WeightVisual from '../../Utils/WeightVisual';
import SetCircle from './SetCircle';
import Words from '../Simple/Words';
import WorkoutContext from '../../Contexts/WorkoutProvider';
import { CURRENT } from '../../Constants/Symbols';
import { PRIMARY } from '../../Style/Theme';
import Row from '../Simple/Row';
import { STYLES } from '../../Style/Values';
import NumericSelector from '../Routine/NumericSelector';


const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

//yes this will eventually implement timer visual
const MidLine = (props) => {

    //use key here to check a timer
    //clever flex
    return <View style={{alignSelf: 'center', height:4, maxWidth: 20, flex: 1, flexDirection: 'row'}}>
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
                    if(add)//yes, but what if it's empty?
                        x.push({...x[x.length-1]});
                    else
                        x.splice(x.length-1);
                    return prev;
                });
            }}
        >
            <Words>{props.type}</Words>
        </TouchableOpacity>

    );
};

const ExerciseCard = (props) => {
    //this is a string
    //maybe not the worst idea to pass this stuff down if we're gonna be calling much
    const {workoutDispatch} = useContext(WorkoutContext);

    //this shoudl be fine
    //name is deadlfit, sets is [5,5,5], progress is [5,'c', null]
    const {name, barbell, sets} = props.exercise;

    const {edit, exerciseN} = props;

    let twoColors = sets.map(set => {
        if(!set.progress || set.progress === CURRENT)
            return ['transparent', secondaryColor];
        return [PRIMARY, PRIMARY];
    });

    //let outlines = sets.map(_ => secondaryColor);
    if(sets.every(set => set.progress && set.progress !== CURRENT))
        twoColors = twoColors.map(_ => ['lightgreen', 'lightgreen']);

    //only show if they're different or it's custom
    const showWeightLabel = !sets.every(s =>
        s.weight === sets[0].weight
    );

    //default is that of last set
    //here's the deal
    //if no sets are done, use the first set
    //if all sets are done, use the last
    //otherwise use the weight of the current set
    let currentWeight = sets[0].weight;
    for(let i = 0; i < sets.length; i++){
        currentWeight = sets[i].weight;
        if(sets[i].progress === CURRENT)
            break;
    }

    return (
        <View style={STYLES.card} key={name}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Words>{name}</Words>
                <Words>{currentWeight}</Words>
            </View>

            <Row>
                {
                    edit&&
                    <SetModButton key={'a'} type='-' exerciseN={props.exerciseN}/>
                }

                <Row style={{ flex: 1, justifyContent: 'center'}}>
                    {
                        barbell&&
                        <>
                            <WeightVisual key={'b'} weight={currentWeight} reverse={true} />
                            <MidLine key={'c'} completion={1}/>
                        </>
                    }
                    {
                        sets.map((set, index) => {
                            //this could probably be its own component
                            const {amrap, progress, reps, weight} = set;

                            //should I move this logic to set circle?
                            let completion;
                            if(reps === 'F')
                                completion = progress && progress !== CURRENT;
                            else
                                completion = progress >= reps ? 1 : 0;
                            //let done = progress && progress[index] >= n;
                            //if(index === sets.length-1){
                            let text = reps;
                            let current = progress === CURRENT;

                            //this isn't workign
                            if(amrap && (!progress || current))
                                text = reps + '+';

                            return <>
                                <View key={index} style={{flex: 1, maxWidth: 50, height: 50}}>
                                    <SetCircle setInfo={set} edit={edit} current={current} info={[exerciseN, index]} text={text} style={{backgroundColor: twoColors[index][0], borderColor: current?primaryColor:twoColors[index][1]}}/>
                                    {
                                        showWeightLabel &&
                                        <Words style={{alignSelf: 'center'}}>{
                                            weight
                                        }</Words>
                                    }
                                    {
                                        //so if it's in edit mode, we need to be able to adjust the weight on the fly
                                        edit &&
                                        <NumericSelector
                                            numInfo={{
                                                def: weight,
                                                min: 0,
                                                max: 1000,
                                                increment: 5
                                            }}
                                            //is this really the best idea?
                                            //or should we restyle numeric selector?
                                            style={{alignSelf: 'center', width: 60}}
                                            itemStyle={{height: 50, fontSize: 20}}
                                            onChange={value =>
                                                workoutDispatch({path: `exercises.${exerciseN}.sets.${index}.weight`, value: value})
                                            }
                                        />
                                    }
                                </View>

                                {
                                    index !== sets.length-1&&
                                    <MidLine key={index+'-'} completion={completion}/>
                                }
                            </>

                        })
                    }
                    {
                        barbell&&
                        <>
                            <MidLine key={'x'} completion={1}/>
                            <WeightVisual key={'y'} weight={currentWeight} reverse={false} />
                        </>
                    }
                </Row>
                {
                    edit&&
                    <SetModButton key={'z'} type='+' exerciseN={props.exerciseN}/>
                }
            </Row>
        </View>
    );
};


export default ExerciseCard;
