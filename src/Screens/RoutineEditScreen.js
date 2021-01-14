import { Alert, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native';
import React, {useContext, useEffect} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import NumericSelector from '../Components/NumericSelector';
import WorkoutEditor from '../Components/WorkoutEditor';
import { DEFAULT_EX_INFO, DEFAULT_SUPERSET_INFO } from '../Constants/DefaultExInfo';
import DaysEditor from '../Components/DaysEditor';
import ExerciseEditor from '../Components/ExerciseEditor';
import RepSchemeEditor from '../Components/RepSchemeEditor';
import RoutinesContext from '../Contexts/RoutinesContext';
import { FULL_COPY } from "../Utils/UtilFunctions";
import Words from "../Components/Words";
import Write from "../Components/Write";
import SafeBorder from "../Components/SafeBorder";

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

const RoutineEditScreen = props => {
    //this is used more than you'd think
    const altExName = ex => {
        let suffix = '-b';
        //yes this is weird but it works
        while((ex + suffix) in info)
            suffix = '-' + String.fromCharCode(suffix.charCodeAt(1)+1)

        return ex + suffix;
    };

    //used just twice lol
    const newWorkoutCode = () => {
        let code = Object.keys(workouts).sort().reverse()[0] || '@';
        return String.fromCharCode(code.charCodeAt(0)+1);
    };

    const newSchemeCode = () => {
        let code = Object.keys(customSets).sort().reverse()[0] || '@';
        return String.fromCharCode(code.charCodeAt(0)+1);
    };

    const routine = useContext(RoutinesContext).routines.editRoutine;
    console.log(routine);
    const {routinesDispatch} = useContext(RoutinesContext);
    //maybe i can do this shortcut?
    const rd = (path, value) => routinesDispatch({path: 'editRoutine.' + path, value});

    //can i do this?
    const {title, time, info, workouts, days, failure, customScheme, customSets, currentDay, nextWorkoutTime} = routine;

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
    }

    //k is the C in workout C or so
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

    //you can move this to workout editor if you want
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

    //this takes fucking forever
    //you're not fucking me up though
    //why the fuck is this one fine while the others go crazy
    //useeffects still coming back to haunt me
    useEffect(() => {
        routinesDispatch(prev => {
            if(prev.editRoutine.days.length !== prev.editRoutine.time)
                prev.editRoutine.days = Array.from(new Array(time), () => 'R')
            return prev;
        });
    }, []);

    return (
        <SafeBorder>
            <View style={styles.top} >
                <TouchableOpacity
                    onPress={() => {
                        //this is easier than the save, just leave
                        //this does keep someting in 'editRoutine', but whatever
                        //accessing routineedit later will copy in some other routine
                        props.navigation.navigate('routine');
                    }}
                    style={styles.topButton}
                >
                    <Words style={{fontSize: 20}}>Discard</Words>
                </TouchableOpacity>
                <Words style={{fontSize: 20}}>Routine Editor</Words>
                <TouchableOpacity onPress={() => {
                    //at last we save it
                    // do we need to object copy?
                    //not who knows


                    //nah we're missing some things
                    //or literally just copy the state, right?
                    const newRoutine = FULL_COPY(routine);
                    newRoutine.currentDay = currentDay || 0;
                    newRoutine.nextWorkoutTime = nextWorkoutTime || new Date().getTime();
                    //routineEx.progress.countdown = routineEx.progress.rate;
                    //need to start the progression countdown for each exercise
                    Object.keys(newRoutine.info).forEach(ex => {
                        const x = newRoutine.info[ex].progress;
                        if(!x.countdown)
                            x.countdown = x.rate;

                        //i don't know why this isn't correctly handled by the exercise editor
                        const y = newRoutine.info[ex].setInfo;
                        if(y.type === 'Custom' && !y.selector)
                            y.selector = 0;
                    });

                    routinesDispatch(prev => {
                        //if there is no current, set this to current
                        if(!prev.current)
                            prev.current = newRoutine.title;
                        //and save the new routine based on title
                        prev.routines[newRoutine.title] = newRoutine;

                        //why cant i do this?
                        //delete prev.editRoutine;
                        return prev;
                    });

                    routinesDispatch({type: 'setItem'});


                    //don't set it to active unless there's no active routine
                    //so routines in async storage should look like
                    /*
                        current: starting strength,
                        rouintes: {
                            'deez nuts': {...},
                            'starting strength': {...}
                        }
                     */

                    //ideally we would then navigate to a list of editable routines
                    //but for now we just go home
                    props.navigation.navigate('routine');
                    /*Alert.alert(
                        "Info summary",
                        JSON.stringify(rName) + JSON.stringify(rTime) + JSON.stringify(info) + JSON.stringify(workouts) + JSON.stringify(days) + JSON.stringify(customSets)
                    );*/

                }} style={styles.topButton}>
                    <Words style={{fontSize: 20}}>
                        Save
                    </Words>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.box}>
                <Write
                    value={title}
                    onChange={v => rd('title', v)}
                />
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Words style={{fontSize: 20}}>Cycle length in days: </Words>
                    <NumericSelector
                        onChange={v =>
                            //that's fucking it, useEffect completely suks
                            routinesDispatch(prev => {
                                prev.editRoutine.time = v;
                                prev.editRoutine.days = Array.from(new Array(v), () => 'R');
                                return prev;
                            })
                        }

                        numInfo={{def: time, min: 7, max: 56, increment: 7}}/>
                </View>

                {/*shoud this be towards the bottom
                        or towards the top as it applies to all exercises?*/}
                <Words style={{fontSize: 20}}>Failure Behavior:</Words>
                <View style={{flexDirection: 'row'}}>
                    <Words style={{fontSize: 20}}>Deload</Words>
                    <NumericSelector
                        onChange={v => rd('failure.deloadPercent', v)}
                        numInfo={{def: failure.deloadPercent, min: 0, max: 50, increment: 5}}
                    />
                    <Words style={{fontSize: 20}}>% after</Words>
                    <NumericSelector
                        onChange={v => rd('failure.after', v)}
                        numInfo={{def: failure.after, min: 1, max: 5, increment: 1}}
                    />
                    <Words style={{fontSize: 20}}>failed sets</Words>
                </View>

                <Words style={{fontSize: 40}}>Workouts</Words>
                <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                    {
                        Object.entries(workouts).map(([k,v]) =>
                            <WorkoutEditor
                                key={k} exercises={v} name={k}
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
                        <TouchableOpacity style={styles.configButton} onPress={() => {
                            //append a new obj
                            //works, but ideally I'd like A B C instead of 1 2 3
                            //too complex?
                            //this actually works now
                            //trust me bro
                            rd('workouts.' + newWorkoutCode(), []);
                        }}>
                            <Words style={{fontSize: 30}}>Add Workout</Words>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Words style={{fontSize: 40}}>Exercises</Words>
                <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>{
                    //definitely the trickiest of all
                    //editing exercises involves much of the state, so I've just added them
                    Object.entries(info).map(([k,v]) =>
                        <ExerciseEditor
                            key={k}
                            name={k} info={v}
                        />
                    )
                }
                </ScrollView>

                {
                    customScheme &&
                    <>
                        <Words style={{fontSize: 40}}>Custom Rep Scheme</Words>
                        <Words>(workouts using this scheme will cycle through the following sets)</Words>
                        <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                            {
                                Object.entries(customSets).map(([k,v]) =>
                                    <RepSchemeEditor key={k} sets={v} name={k} />
                                )
                            }
                            <View style={{justifyContent: 'center', height: 200, margin: 3, width: 406, backgroundColor: '#333'}}>
                                <TouchableOpacity style={styles.configButton} onPress={() => {
                                    //this actually works
                                    rd('customSets.' + newSchemeCode(), []);
                                    console.log(JSON.stringify(customSets))
                                }}>
                                    <Words style={{fontSize: 30}}>Add Custom Scheme</Words>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>
                }

                <Words style={{color:'white', fontSize: 40}}>Days</Words>
                <DaysEditor workouts={Object.keys(workouts)} days={days}/>

                <View style={{height: 25/*for the red button*/}}/>
            </ScrollView>
        </SafeBorder>
    );
};

const styles = StyleSheet.create({
    navBar: {

    },
    container: { flex: 1, backgroundColor: PRIMARY },
    configButton: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    },

    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: PRIMARY, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    scroller: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        borderStyle: 'solid',
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        //alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        //justifyContent: 'center',
    },
    circle: {
        flex: 1,
        minWidth:20,
        maxWidth:50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

export default RoutineEditScreen;
