import { Alert, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import NumericSelector from '../Components/NumericSelector';
import WorkoutEditor from '../Components/WorkoutEditor';
import { DEFAULT_EX_INFO, DEFAULT_SUPERSET_INFO } from "../Constants/DefaultExInfo";
import DaysEditor from '../Components/DaysEditor';
import ExerciseEditor from '../Components/ExerciseEditor';
import RepSchemeEditor from '../Components/RepSchemeEditor';
import ProgressContext from "../Contexts/ProgressContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoutinesContext from "../Contexts/RoutinesContext";

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

//i guess you could have the option to build a routine here too, but for now it's just for editing the current routine
//this can't be default screen, otherwise routine doesnt' have time to load
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
    //const { routine } = useContext(ProgressContext);

    //let {routine} = props.route.params;

    const routine = useContext(RoutinesContext).routines.editRoutine;
    const {routinesDispatch} = useContext(RoutinesContext);
    //maybe i can do this shortcut?
    const rd = (path, value) => {
        routinesDispatch({path: 'editRoutine.' + path, value});
    };

    //can i do this?
    const {title, time, info, workouts, days, customScheme, customSets, currentDay, nextWorkoutTime} = routine;

    const addExercise = (k,ex) => {
        //because this edits both workouts and info, im' keeping it in routinescreen
        //we know which workout to add it to cuz of k
        //ugh this is so annoying why cant we just do
        //workouts[k].push(ex)

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
                        onPress: () => setWorkouts({...workouts, [k]: [...workouts[k], ex]}),
                        style: "cancel"
                    },
                    {
                        text: "Alternate",
                        onPress: () => {
                            //need to find a name
                            //start with [exercise].b, then [exercise].c, ...
                            const altName = altExName(ex);


                            setWorkouts({...workouts, [k]: [...workouts[k], altName]});
                            setInfo({
                                ...info, [altName]: DEFAULT_EX_INFO(ex)//don't use the alternative name to look up info
                            });
                            //initializeWorkout();
                            //props.navigation.navigate('workout');
                        },
                    }
                ],
                {cancelable: false}
            )
        }
        else{
            setWorkouts({...workouts, [k]: [...workouts[k], ex]});
            setInfo({
                ...info, [ex]: DEFAULT_EX_INFO(ex)
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

    const deleteAnExercise = (k) => {
        routinesDispatch(prev => {
            delete prev.editRoutine.info[k];

            let removal = k;
            if(k.includes('/'))
                removal = k.split('/');//that might do it, who knows

            //so stringify will make sure we compare array correctly
            prev.editRoutine.workouts = prev.editRoutine.workouts.map(w => {
                w.filter(e => JSON.stringify(e) !== JSON.stringify(removal))
            })

            return prev;
        });
    };

    //that's fucking it, we're gonna keep exercises in sync with workouts this way
    useEffect(() => {
        //maybe this effect should be in routinesprovdier?
        routinesDispatch((prev) => {
            Object.keys(info).forEach(i => {
                if(!Object.values(workouts).some(w =>
                    w.some(ex =>
                        ex === i || ex === i.split('/')
                    )
                )){
                    delete prev.editRoutine.info[i];
                }
            })
            return prev;

        });
    }, [workouts])

    //this is how use effect works, right?
    //depend on changes in info
    //should this also be in provider?
    useEffect(() => {
        const hasCustom = Object.values(info).some(i => {
            //always jujmping through hoops for supersets
            //maybe regular workouts should just be arrays of size 1?
            if(Array.isArray(i))
                return i.some(j => j.setInfo.type === 'Custom');
            return i.setInfo.type === 'Custom';
        })
        rd('customScheme', hasCustom);
    }, [info]);

    //this takes fucking forever
    useEffect(() => {
        routinesDispatch({path: 'editRoutine.days', value:
                Array.from(new Array(time), () => 'R')
        });
    }, [time]);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.top} >
                    <TouchableOpacity style={styles.topButton}>
                        <Text style={{color: 'white', fontSize: 20}}>
                        </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}>Routine Editor</Text>
                    <TouchableOpacity onPress={() => {
                        //at last we save it
                        // do we need to object copy?
                        //not who knows


                        //nah we're missing some things
                        const newRoutine = {
                            title: title,
                            time: time,
                            info: {...info},
                            workouts: {...workouts},
                            days: [...days],
                            customSets: [...customSets],
                            //current day
                            currentDay: currentDay || 0,//this shouldn't chnage if we're copying a routine
                            nextWorkoutTime: nextWorkoutTime || new Date().getTime()
                            //next workout time
                        };

                        //TODO: add this new saveroutine method to the context
                        props.route.params.saveRoutine(newRoutine);

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
                        <Text style={{color: 'white', fontSize: 20}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.box}>
                    <TextInput
                        style={{color:'white', textAlign: 'center', fontSize: 40}}
                        value={title}
                        onChangeText={v => rd('title', v)}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{color:'white', fontSize: 20}}>Cycle length in days: </Text>
                        <NumericSelector onChange={v => rd('time', v)} numInfo={{def: time, min: 7, max: 56, increment: 7}}/>
                    </View>

                    <Text style={{color:'white', fontSize: 40}}>Workouts</Text>
                    <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                        {
                            Object.entries(workouts).map(([k,v], index) =>
                                <WorkoutEditor
                                    key={k} exercises={v} name={k}
                                    editSuperset={(val, exerciseIndex, supersetIndex) => {
                                        //exerciseindex is the superset order in the workout
                                        //superset index is the exercise order in the super set

                                        //SUPASET TS TS TS TS

                                        routinesDispatch(prev => {
                                            let x = prev.editRoutine[k][exerciseIndex];
                                            x[supersetIndex] = val;

                                            if(x.every(i => i !== ''))
                                                prev.editRoutine.info[x.join('/')] = DEFAULT_SUPERSET_INFO(x);

                                            return prev;
                                        });

                                    }}

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
                                <Text style={{fontSize: 30}}>Add Workout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <Text style={{color:'white', fontSize: 40}}>Exercises</Text>
                    <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>{
                        //definitely the trickiest of all
                        //editing exercises involves much of the state, so I've just added them
                        Object.entries(info).map(([k,v]) =>
                            <ExerciseEditor
                                key={k}
                                name={k} info={v}
                                deleteExercise={() => deleteAnExercise(k)}
                            />
                        )
                    }
                    </ScrollView>

                    {
                        customScheme &&
                        <RepSchemeEditor sets={customSets} edit={v => rd('customSets', v)}/>
                    }

                    <Text style={{color:'white', fontSize: 40}}>Days</Text>
                    <DaysEditor workouts={Object.keys(workouts)} days={days} editDays={(day, val) =>
                        //ok now i see how a path array could be nice
                        routinesDispatch({path: 'editRoutine.days.' + day, value: val})
                    }/>

                    <View style={{height: 25/*for the red button*/}}/>
                </ScrollView>
                <NavBar current={/*better way to handle this?*/'routine'} navigation={props.navigation}/>
            </SafeAreaView>
        </>
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
