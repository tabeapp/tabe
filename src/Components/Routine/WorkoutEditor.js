import React, { useContext, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import ExercisePicker from '../Workout/ExercisePicker';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Row from '../Simple/Row';
import { STYLES } from '../../Style/Values';
import { DEFAULT_EX_INFO, DEFAULT_SUPERSET_INFO } from '../../Constants/DefaultExInfo';
import { NextObjectKey } from '../../Utils/NextObjectKey';
import { BACKGROUND, DARK_GRAY } from '../../Style/Colors';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';

//this is for getting just one of the exercises of a super set
//it's hard to make the modal work with multiple possible endpoints
//should we pass in selected ones?
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

const WorkoutEditor = props => {
    const [modal, setModal] = useState(false);
    const {routine, routineEditDispatch} = useContext(RoutineEditContext);
    //hows this: data is fine to be 'propped' down, but editing handlers will be handled by context
    const {name, advanced, exercises, editSuperset} = props;//this is like a key btw

    const {info, workouts} = routine;

    const altExName = ex => {
        let suffix = '-b';
        //yes this is weird but it works
        while((ex + suffix) in info)
            suffix = '-' + String.fromCharCode(suffix.charCodeAt(1)+1)

        return ex + suffix;
    };

    const duplicateWorkout = k => {
        if(!(k in workouts))
            return;

        //make the copy
        const newWorkout = workouts[k].map(ex => {
            //fucking supersets
            if(Array.isArray(ex))
                //missed that little thing
                return ex.map(altExName);

            //need to find alt name
            return altExName(ex);
        });

        routineEditDispatch(prev => {
            //save to workouts
            prev.workouts[NextObjectKey(workouts)] = newWorkout;

            //save to info
            //todo make this an invariant in the routine dispatcher
            //for every exercise in workouts, there should be a corresponding exerciseinfo
            newWorkout.forEach(ex => {
                if(Array.isArray(ex))
                    prev.info[ex.join('/')] =  DEFAULT_SUPERSET_INFO(ex);
                else
                    prev.info[ex] = DEFAULT_EX_INFO(ex);
            })

            return prev;
        });
    };

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

    const addExercise = (k,ex) => {
        //should this part be done before

        //also need to add it to exerdcises so we can edit it later

        //problem: what about adding lighter versions of exercises like in ppl?
        //solution: alert the user and let them choose
        if(ex in info){
            //if no, just cancel addition and use the info already there
            //if yes, just add 'Bench Press.b'
            Alert.alert(
                "Duplicate Exercise",
                //maybe rephrase this
                "This exercise already is in the routine, do you want to link to that one or make an alternative version?",
                [
                    {
                        text: "Link",//just use the other one, don't need to add a new one to exercises
                        onPress: () => routineEditDispatch(prev => {
                            prev.workouts[k].push(ex);
                            return prev;
                        }),
                        style: "cancel"
                    },
                    {
                        text: "Alternate",
                        onPress: () => {
                            const altName = altExName(ex);

                            routineEditDispatch(prev => {
                                //does this work for supersets?
                                prev.workouts[k].push(altName);
                                //definitely not
                                prev.info[altName] = DEFAULT_EX_INFO(ex);
                                //we really need info to set itself automatically, wiht useffect
                                return prev;
                            });
                        },
                    }
                ],
                {cancelable: false}
            )
        }
        else{
            routineEditDispatch(prev => {
                //does this work for supersets?
                prev.workouts[k].push(ex);
                //definitely not
                prev.info[ex] = DEFAULT_EX_INFO(ex);
                //we really need info to set itself automatically, wiht useffect
                return prev;
            });
        }
    };


    //wtf is this 415 number supposed to be?
    return (
        <View style={{backgroundColor: BACKGROUND}}>
            <Row style={{padding: 5}}>
                <Words style={{fontSize: 30, fontWeight: 'bold'}}>Workout {name}</Words>

                <Row>

                    <TouchableOpacity onPress={() => duplicateWorkout(name)}>
                        <Words><Ionicons color={'gray'} size={30} name={'copy-outline'}/></Words>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        //delete the workout
                        routineEditDispatch(prev => {
                            delete prev.workouts[name];

                            //thanks to useffect not playing well with usereducer, this is now managed here
                            //thanks, dude
                            //or should I put it in the reducer itself...
                            Object.keys(prev.info).forEach(i => {
                                if(!Object.values(prev.workouts).some(w =>
                                    w.some(ex =>
                                        ex === i || ex === i.split('/')
                                    )
                                )){
                                    delete prev.info[i];
                                }
                            });

                            return prev;
                        })

                    }}>
                        <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                    </TouchableOpacity>
                </Row>
            </Row>
            {
                exercises.map((ex, index) =>{
                    //we actually need as many superset editors as there are exerices
                    return <Row style={{backgroundColor: DARK_GRAY, marginVertical: 2}} key={ex}>
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
                        <TouchableOpacity onPress={() => {
                            //this should do the same thing as pressing the X on an exercise
                            deleteAnExercise(ex);
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
                        routineEditDispatch(prev => {
                            prev.workouts[name].push(['','']);
                            return prev;
                        })
                    }} >
                        <Words style={{color: 'white', fontSize: 30}}>Add Superset</Words>
                    </TouchableOpacity>
                </>

            }
            <ExercisePicker visible={modal} handleSelection={(ex) => addExercise(name,ex)} close={() => setModal(false)}/>

        </View>);
};

export default WorkoutEditor;
