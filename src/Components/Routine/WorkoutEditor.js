import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ExercisePicker from '../Workout/ExercisePicker';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import Row from '../Simple/Row';
import { STYLES } from '../../Style/Values';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

//this is for getting just one of the exercises of a super set
//it's hard to make the modal work with multiple possible endpoints
//should we pass in selected ones?
const SupersetSelector = props => {
    const [modal, setModal] = useState(false);

    return (
        <TouchableOpacity
            style={{flex: 1, backgroundColor: 'gray', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center'}}
            onPress={() => setModal(true)}
        >
            <Words>Add Exercise</Words>
            <ExercisePicker visible={modal} handleSelection={props.onSelect} close={() => setModal(false)}/>
        </TouchableOpacity>
    );
}

const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);
    //const routine = useContext(RoutinesContext).routines.editRoutine;
    const {routinesDispatch} = useContext(RoutinesContext);
    //hows this: data is fine to be 'propped' down, but editing handlers will be handled by context
    const {name, deleteExercise, advanced} = props;//this is like a key btw

    const width = useWindowDimensions().width;

    //wtf is this 415 number supposed to be?
    return (
        <View style={{width: width, backgroundColor: '#333'}}>
            <Row style={{backgroundColor: '#222'}}>
                <Words style={{color:'white'}}>Workout {props.name}</Words>

                <View style={{flexDirection:'row'}}>

                    <TouchableOpacity onPress={() => props.duplicateWorkout(props.name)}>
                        <Words><Ionicons color={'gray'} size={30} name={'copy-outline'}/></Words>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //delete the workout
                        routinesDispatch(prev => {
                            delete prev.editRoutine.workouts[name];

                            //thanks to useffect not playing well with usereducer, this is now managed here
                            //thanks, dude
                            //or should I put it in the reducer itself...
                            Object.keys(prev.editRoutine.info).forEach(i => {
                                if(!Object.values(prev.editRoutine.workouts).some(w =>
                                    w.some(ex =>
                                        ex === i || ex === i.split('/')
                                    )
                                )){
                                    delete prev.editRoutine.info[i];
                                }
                            });

                            return prev;
                        })

                    }}>
                        <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                    </TouchableOpacity>
                </View>
            </Row>
            {
                props.exercises.map((ex, index) =>{
                    //we actually need as many superset editors as there are exerices
                    return <Row key={ex}>
                        {
                            Array.isArray(ex) &&
                            <View style={{ flex: 1, display: 'flex', height: 30, flexDirection: 'row' }}>{
                                ex.map((e, index2) => {
                                    if (e === '')
                                        return <SupersetSelector
                                            onSelect={val => props.editSuperset(val, index, index2)} />
                                    else{
                                        return <Words style={{
                                            borderWidth: 1,
                                            borderColor: 'black',
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
                        <TouchableOpacity onPress={() => {
                            //this should do the same thing as pressing the X on an exercise
                            deleteExercise(ex);
                        }}>
                            <Words><Ionicons color={'gray'} name={'close'} size={30}/></Words>
                        </TouchableOpacity>
                    </Row>
                })
            }
            <TouchableOpacity style={STYLES.textButton} onPress={() => {
                //append a new obj
                //works, but ideally I'd like A B C instead of 1 2 3
                //yeah maybe these should be separate components...
                setModal(true);
            }}>
                <Words style={{color: 'white', fontSize: 30}}>Add Exercise</Words>
            </TouchableOpacity>

            {
                advanced && <>

                    <TouchableOpacity style={STYLES.textButton} onPress={() => {
                        routinesDispatch(prev => {
                            prev.editRoutine.workouts[name].push(['','']);
                            return prev;
                        })
                    }} >
                        <Words style={{color: 'white', fontSize: 30}}>Add Superset</Words>
                    </TouchableOpacity>
                    <ExercisePicker visible={modal} handleSelection={(ex) => props.addExercise(props.name,ex)} close={() => setModal(false)}/>
                </>

            }

        </View>);
};

export default WorkoutEditor;
