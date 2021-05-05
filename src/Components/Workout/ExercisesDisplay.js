import React from 'react';
import { View } from 'react-native';
import Words from '../Simple/Words';
import { DARK_GRAY } from '../../Style/Colors';
import TrophyVisual from '../Social/TrophyVisual';

//the very nice looking thing from postscreen
//gonna use this in more places
const ExercisesDisplay = props => {
    //exercises is raw data, efforts is the max efforts, possibly with trophies
    const {exercises, efforts} = props;
    //we need to combine them in a nice way
    //here's how

    const effortVisForSet = (exercise, set) => {
        const effort = efforts.find(e=>
            e.reps === set.reps &&
            e.weight === set.weight &&
            e.exercise === exercise.name
        );

        if(!effort)
            return <View/>;

        return <View>
            {
                effort.trophies.items.map(trophy =>
                    <TrophyVisual
                        key={trophy.id}
                        trophy={trophy}
                        exercise={effort.exercise}
                        orm={effort.orm}
                    />
                )
            }

        </View>;
    };


    return <View>{
        exercises.map(exercise =>
            <View
                key={exercise.name}
                style={{marginVertical: 5}}
            >
                <Words style={{fontSize: 30}}>{exercise.name}</Words>

                <View style={{width: '100%'}}>{
                    exercise.work.map((set, i) =>
                        <View key={i} style={{marginVertical: 2, width: '100%', backgroundColor: DARK_GRAY, justifyContent: 'center'}}>
                            <View style={{height: 50, justifyContent: 'center'}}>
                                <Words style={{ textAlign: 'center', fontSize: 20}}>
                                    {set.sets + 'x' + set.reps + 'x' + set.weight + 'lb'}
                                </Words>
                            </View>
                            {effortVisForSet(exercise, set)}

                        </View>
                    )
                }
                </View>
            </View>

        )

    }</View>;

};

export default ExercisesDisplay;
