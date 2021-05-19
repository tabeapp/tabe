import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import WeightVisual from '../../Utils/WeightVisual';
import SetCircle from './SetCircle';
import Words from '../Simple/Words';
import { WorkoutContext } from '../../Contexts/WorkoutProvider';
import { CURRENT } from '../../Constants/Symbols';
import { BACKGROUND, DARK_GRAY, PRIMARY, PRIMARY_DARKER } from '../../Style/Colors';
import Row from '../Simple/Row';
import NumericSelector from '../Routine/NumericSelector';

//yes this will eventually implement timer visual
const MidLine = (props) => {

    //use key here to check a timer
    //clever flex
    return <View style={{alignSelf: 'center', height:4, minWidth: 18, flex: 1, flexDirection: 'row'}}>
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

//also just realized we're gonna be dealing with summed sets here
const ExerciseCard = (props) => {
    const {workoutDispatch} = useContext(WorkoutContext);

    //this shoudl be fine
    //name is deadlfit, sets is [5,5,5], progress is [5,'c', null]
    const {name, barbell, sets} = props.exercise;

    const {edit, exerciseN} = props;

    let twoColors = sets.map(set => {
        if(!set.progress || set.progress === CURRENT)
            return ['transparent', PRIMARY_DARKER];
        return [PRIMARY, PRIMARY];
    });

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


    //this is fucking it, i'll just make my own keys

    return (
        <View style={styles.card} key={name}>
            <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Words style={{fontSize: 25, fontWeight: 'bold'}}>{name}</Words>
                <Words style={{fontSize: 25}}>{currentWeight}</Words>
            </Row>

            <Row style={{flex: 1, marginHorizontal: 5}}>
                {
                    edit&&
                    <SetModButton key={'a'} type='-' exerciseN={props.exerciseN}/>
                }

                {
                    barbell&&
                        <WeightVisual key={'b'} weight={currentWeight} reverse/>
                }
                <Row style={{ flex: 1, justifyContent: 'space-around'}}>
                    <MidLine key={'-1-'} completion={0}/>
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

                            return <React.Fragment key={index}>
                                <View key={index} style={{flex: 12, maxWidth: 50, height: 50}}>
                                    <SetCircle
                                        setInfo={set} edit={edit} current={current} info={[exerciseN, index]} text={text}
                                        style={{backgroundColor: twoColors[index][0], borderColor: current?PRIMARY:twoColors[index][1]}}
                                    />
                                    {
                                        showWeightLabel && !edit &&
                                        <Words style={{fontSize: 15, alignSelf: 'center'}}>{
                                            weight
                                        }</Words>
                                    }
                                    {
                                        //so if it's in edit mode, we need to be able to adjust the weight on the fly
                                        //this looks like dog shit
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

                                <MidLine key={index+'-'} completion={completion}/>
                            </React.Fragment>

                        })
                    }
                </Row>
                {
                    barbell&&
                        <WeightVisual key={'y'} weight={currentWeight} />
                }
                {
                    //the mod buttons arent causing key error
                    edit&&
                    <SetModButton key={'z'} type='+' exerciseN={props.exerciseN}/>
                }
            </Row>
        </View>
    );
};

export const styles = StyleSheet.create({
    card:{
        padding: 10,
        margin: 5,
        minHeight: 150,
        //backgroundColor: DARK_GRAY,
        //borderRadius: 15
    },
});

export default ExerciseCard;
