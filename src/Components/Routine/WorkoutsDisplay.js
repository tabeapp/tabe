import WorkoutEditor from './WorkoutEditor';
import { DEFAULT_SUPERSET_INFO } from '../../Constants/DefaultExInfo';
import React, { useContext } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { STYLES } from '../../Style/Values';
import Words from '../Simple/Words';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { NextObjectKey } from '../../Utils/NextObjectKey';
import { BACKGROUND } from '../../Style/Colors';

//that horizontal scrolling part
const WorkoutsDisplay = props => {

    const {routinesDispatch} = useContext(RoutinesContext);

    const {workouts, advanced} = props;

    const width = useWindowDimensions().width;
    return (

        <ScrollView pagingEnabled style={STYLES.scroller} horizontal={true}>
            {
                Object.entries(workouts).map(([k,v]) =>
                    <View style={{width: width, borderColor: BACKGROUND, borderWidth: 1}}>
                        <WorkoutEditor
                            key={k} exercises={v} name={k}
                            advanced={advanced}
                            editSuperset={(val, exerciseIndex, supersetIndex) => {
                                //exerciseindex is the superset order in the workout
                                //superset index is the exercise order in the super set
                                routinesDispatch(prev => {
                                    let x = prev.editRoutine.workouts[k][exerciseIndex];
                                    x[supersetIndex] = val;

                                    if(x.every(i => i !== ''))
                                        prev.editRoutine.info[x.join('/')] = DEFAULT_SUPERSET_INFO(x);

                                    return prev;
                                });
                            }}
                        />
                    </View>
                )
            }
            <View style={{width: width, justifyContent: 'center', height: 200}}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                    const rd = (path, value) => routinesDispatch({path: 'editRoutine.' + path, value});
                    rd('workouts.' + NextObjectKey(workouts), []);
                }}>
                    <Words style={{fontSize: 30}}>Add Workout</Words>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutsDisplay;
