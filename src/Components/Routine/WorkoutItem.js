import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { BACKGROUND, DARK_GRAY } from '../../Style/Colors';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';
import { useContext, useState } from 'react';
import ExercisePicker from '../Workout/ExercisePicker';
import Row from '../Simple/Row';

const SupersetSelector = props => {
    const [modal, setModal] = useState(false);

    return (
        <TouchableOpacity
            style={{flex: 1, backgroundColor: 'gray', borderWidth: 1, borderColor: BACKGROUND, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setModal(true)}
        >
            <Words>Add Exercise</Words>
            <ExercisePicker visible={modal} handleSelection={props.onSelect} close={() => setModal(false)}/>
        </TouchableOpacity>
    );
};

const WorkoutItem = props => {
    const {routineEditDispatch} = useContext(RoutineEditContext);

    const {dragInfo, editSuperset} = props;
    const { item, index, drag, isActive } = dragInfo;
    const ex = item;

    const deleteAnExercise = (k) => {
        routineEditDispatch(prev => {
            delete prev.info[k];

            let removal = k;
            if(k.includes('/'))
                removal = k.split('/');//that might do it, who knows

            Object.keys(prev.workouts).forEach(w => {
                prev.workouts[w] = prev.workouts[w]
                    .filter(e => JSON.stringify(e) !== JSON.stringify(removal));
            });

            return prev;
        });
    };

    return <Pressable
        key={ex}
        onLongPress={drag}
        delayLongPress={100}
        style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: isActive ? DARK_GRAY : BACKGROUND, marginVertical: 2}}
    >
        <Row>
            <Words style={{marginHorizontal: 10}}>
                <Ionicons color={DARK_GRAY} name={'menu'} size={30}/>
            </Words>
            {
                Array.isArray(ex) &&
                <View style={{ flex: 1, display: 'flex', height: 30, flexDirection: 'row' }}>{
                    ex.map((e, index2) => {
                        if (e === '')
                            return <SupersetSelector
                                onSelect={val => editSuperset(val, index, index2)} />
                        else{
                            return <Words style={{
                                borderWidth: 1,
                                borderColor: BACKGROUND,
                                backgroundColor: 'gray',
                                flex: 1
                            }}>{e}</Words>
                        }
                    })
                }</View>
            }
            {
                !Array.isArray(ex) &&
                <Words style={{ color: 'white', fontSize: 30 }}>{ex}</Words>
            }
        </Row>
        <TouchableOpacity onPress={() => deleteAnExercise(ex)}>
            <Words><Ionicons color={'gray'} name={'close'} size={30}/></Words>
        </TouchableOpacity>
    </Pressable>
}

export default WorkoutItem;
