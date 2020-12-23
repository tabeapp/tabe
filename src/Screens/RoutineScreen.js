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

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

//i guess you could have the option to build a routine here too, but for now it's just for editing the current routine
//this can't be default screen, otherwise routine doesnt' have time to load
const RoutineScreen = props => {
    //const { routine } = useContext(ProgressContext);

    //nearly everything is gonna be editable
    //fuck this, I'm gonna start from scratch and use this to make a new routine
    //how the fuck do we load current routine
    const [rName, setRName] = useState('Routine Name');
    const [rTime, setRTime] = useState(7);
    const [info, setInfo] = useState({});
    const [workouts, setWorkouts] = useState({});

    const [days, setDays] = useState([]);

    const [customScheme, setCustomScheme] = useState(false);
    const [customSets, setCustomSets] = useState([]);

    const [currentDay, setCurrentDay] = useState(0);
    const [nextWorkoutTime, setNextWorkoutTime] = useState(0);

    const {setRoutine} = useContext(ProgressContext);

    const deleteAnExercise = (k) => {
        //this is fine
        setInfo(prev => {
            const next = {...prev};
            delete next[k];
            return next;
        });
        //clear from all workouts as well
        //this is more complex if it's a super set
        //I thi
        let removal = k;
        if(k.includes('/'))
            removal = k.split('/');//that might do it, who knows

        setWorkouts(prev => {
            const next = {...prev};
            Object.keys(next).forEach(key => {
                next[key] = next[key].filter(e => {
                    console.log('key ' + e + ' removal ' + removal)
                    return  JSON.stringify(e) !== JSON.stringify(removal);
                });
            })
            return next;
        });
    };

    //this is how use effect works, right?
    //depend on changes in info
    useEffect(() => {
        setCustomScheme(Object.values(info).some(i =>{
            //always jujmping through hoops for supersets
            //maybe regular workouts should just be arrays of size 1?
            if(Array.isArray(i))
                return i.some(j => j.setInfo.type === 'Custom');
            return i.setInfo.type === 'Custom';
        }))
    }, [info]);

    //this takes fucking forever
    useEffect(() => {
        setDays(Array.from(new Array(rTime), () => 'R'));
    }, [rTime]);

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
                        setRoutine({
                            title: rName,
                            time: rTime,
                            info: {...info},
                            workouts: {...workouts},
                            days: [...days],
                            customSets: [...customSets],
                            //current day
                            currentDay: currentDay || 0,//this shouldn't chnage if we're copying a routine
                            nextWorkoutTime: nextWorkoutTime || new Date().getTime()
                            //next workout time
                        })
                        //ideally we would then navigate to a list of editable routines
                        //but for now we just go home
                        props.navigation.navigate('home');
                        /*Alert.alert(
                            "Info summary",
                            JSON.stringify(rName) + JSON.stringify(rTime) + JSON.stringify(info) + JSON.stringify(workouts) + JSON.stringify(days) + JSON.stringify(customSets)
                        );*/

                    }} style={styles.topButton}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.box}>
                    <TextInput
                        style={{color:'white', textAlign: 'center', fontSize: 40}}
                        value={rName}
                        onChangeText={setRName}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{color:'white', fontSize: 20}}>Cycle length in days: </Text>
                        <NumericSelector onChange={setRTime} numInfo={{def: rTime, min: 7, max: 56, increment: 7}}/>
                    </View>

                    <Text style={{color:'white', fontSize: 40}}>Workouts</Text>
                    <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                        {
                            Object.entries(workouts).map(([k,v], index) =>
                                <WorkoutEditor
                                    key={k} exercises={v} name={k}
                                    editWorkouts={setWorkouts}
                                    editSuperset={(val, exerciseIndex, supersetIndex) => {
                                        //exerciseindex is the superset order in the workout
                                        //superset index is the exercise order in the super set

                                        //SUPASET TS TS TS TS

                                        setWorkouts(prev => {
                                            const next = {...prev};
                                            const superset = next[k][exerciseIndex];
                                            superset[supersetIndex] = val;

                                            //check if we can add to exercise list
                                            //wtf kinda of default info should we add?
                                            if(superset.every(x => x !== ''))
                                                setInfo({...info, [superset.join('/')]: DEFAULT_SUPERSET_INFO(superset)})
                                            return next;
                                        });

                                    }}

                                    deleteExercise={deleteAnExercise}
                                    addExercise={ex => {
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
                                                            let suffix = '.b';
                                                            //yes this is weird but it works
                                                            while((ex + suffix) in info)
                                                                suffix = '.' + String.fromCharCode(suffix.charCodeAt(1)+1)

                                                            const altName = ex + suffix;


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

                                    }}
                                />
                            )
                        }
                        <View style={{justifyContent: 'center', height: 200, margin: 3, width: 406, backgroundColor: '#333'}}>
                            <TouchableOpacity style={styles.configButton} onPress={() => {
                                //append a new obj
                                //works, but ideally I'd like A B C instead of 1 2 3
                                //too complex?
                                setWorkouts({...workouts, [String.fromCharCode('A'.charCodeAt(0)+Object.keys(workouts).length)]: []});
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
                                editInfo={setInfo}
                                deleteExercise={() => deleteAnExercise(k)}
                            />
                        )
                    }
                    </ScrollView>

                    {
                        customScheme &&
                        <RepSchemeEditor sets={customSets} edit={setCustomSets}/>
                    }

                    <Text style={{color:'white', fontSize: 40}}>Days</Text>
                    <DaysEditor workouts={Object.keys(workouts)} days={days} editDays={(day, val) =>
                        setDays(old => {
                            const n = [...old];
                            n[day] = val;
                            return n;
                        })
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
        borderStyle: 'solid'
    },
});

export default RoutineScreen;
