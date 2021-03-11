import WorkoutEditor from './WorkoutEditor';
import { DEFAULT_EX_INFO, DEFAULT_SUPERSET_INFO } from '../../Constants/DefaultExInfo';
import React, { useContext } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { STYLES } from '../../Style/Values';
import Words from '../Simple/Words';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';

//that horizontal scrolling part
const WorkoutsDisplay = props => {

    const {routinesDispatch} = useContext(RoutinesContext);

    const {workouts, advanced, info} = props;

    const newWorkoutCode = () => {
        let code = Object.keys(workouts).sort().reverse()[0] || '@';
        return String.fromCharCode(code.charCodeAt(0)+1);
    };

    const altExName = ex => {
        let suffix = '-b';
        //yes this is weird but it works
        while((ex + suffix) in info)
            suffix = '-' + String.fromCharCode(suffix.charCodeAt(1)+1)

        return ex + suffix;
    };

    const deleteAnExercise = (k) => {
        routinesDispatch(prev => {
            delete prev.editRoutine.info[k];

            let removal = k;
            if(k.includes('/'))
                removal = k.split('/');//that might do it, who knows

            Object.keys(prev.editRoutine.workouts).forEach(w => {
                prev.editRoutine.workouts[w] = prev.editRoutine.workouts[w]
                    .filter(e => JSON.stringify(e) !== JSON.stringify(removal));
            });

            return prev;
        });
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

        routinesDispatch(prev => {
            //save to workouts
            prev.editRoutine.workouts[newWorkoutCode()] = newWorkout;

            //save to info
            newWorkout.forEach(ex => {
                if(Array.isArray(ex))
                    prev.editRoutine.info[ex.join('/')] =  DEFAULT_SUPERSET_INFO(ex);
                else
                    prev.editRoutine.info[ex] = DEFAULT_EX_INFO(ex);
            })

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
                        onPress: () => routinesDispatch(prev => {
                            prev.editRoutine.workouts[k].push(ex);
                            return prev;
                        }),
                        style: "cancel"
                    },
                    {
                        text: "Alternate",
                        onPress: () => {
                            const altName = altExName(ex);

                            routinesDispatch(prev => {
                                //does this work for supersets?
                                prev.editRoutine.workouts[k].push(altName);
                                //definitely not
                                prev.editRoutine.info[altName] = DEFAULT_EX_INFO(ex);
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
            routinesDispatch(prev => {
                //does this work for supersets?
                prev.editRoutine.workouts[k].push(ex);
                //definitely not
                prev.editRoutine.info[ex] = DEFAULT_EX_INFO(ex);
                //we really need info to set itself automatically, wiht useffect
                return prev;
            });
        }
    };

    return (

        <ScrollView pagingEnabled style={STYLES.scroller} horizontal={true}>
            {
                Object.entries(workouts).map(([k,v]) =>
                    <WorkoutEditor
                        key={k} exercises={v} name={k}
                        advanced={advanced}
                        editSuperset={(val, exerciseIndex, supersetIndex) => {
                            //exerciseindex is the superset order in the workout
                            //superset index is the exercise order in the super set

                            //SUPASET TS TS TS TS

                            routinesDispatch(prev => {
                                let x = prev.editRoutine.workouts[k][exerciseIndex];
                                x[supersetIndex] = val;

                                if(x.every(i => i !== ''))
                                    prev.editRoutine.info[x.join('/')] = DEFAULT_SUPERSET_INFO(x);

                                return prev;
                            });

                        }}

                        //maybe i should just have these in workout editor...
                        duplicateWorkout={duplicateWorkout}
                        deleteExercise={deleteAnExercise}
                        addExercise={addExercise}
                    />
                )
            }
            <View style={{justifyContent: 'center', height: 200, margin: 3, width: 406, backgroundColor: '#333'}}>
                <TouchableOpacity style={STYLES.textButton} onPress={() => {
                    //append a new obj
                    //works, but ideally I'd like A B C instead of 1 2 3
                    //too complex?
                    //this actually works now
                    //trust me bro
                    const rd = (path, value) => routinesDispatch({path: 'editRoutine.' + path, value});
                    rd('workouts.' + newWorkoutCode(), []);
                }}>
                    <Words style={{fontSize: 30}}>Add Workout</Words>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WorkoutsDisplay;
