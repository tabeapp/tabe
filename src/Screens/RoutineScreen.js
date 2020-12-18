import { Alert, Switch, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState, useContext} from "react";
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import NumericSelector from "../Components/NumericSelector";
import ExercisePicker from "../Components/ExercisePicker";
import WorkoutEditor from "../Components/WorkoutEditor";
import { DEFAULT_EX_INFO } from "../Constants/DefaultExInfo";
import DaysEditor from "../Components/DaysEditor";
import ExerciseEditor from "../Components/ExerciseEditor";
import Words from "../Components/Words";
import RepSchemeEditor from "../Components/RepSchemeEditor";

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

//i guess you could have the option to build a routine here too, but for now it's just for editing the current routine
//this can't be default screen, otherwise routine doesnt' have time to load
const RoutineScreen = props => {
    //const { routine } = useContext(ProgressContext);

    //nearly everything is gonna be editable
    //fuck this, I'm gonna start from scratch and use this to make a new routine
    const [rName, setRName] = useState('Routine Name');
    const [rTime, setRTime] = useState(7);
    const [info, setInfo] = useState({});
    const [workouts, setWorkouts] = useState({});

    const [days, setDays] = useState([]);

    const [customScheme, setCustomScheme] = useState(false);
    const [customSets, setCustomSets] = useState([]);

    //this takes fucking forever
    useEffect(() => {
        setDays(Array.from(new Array(rTime), () => 'R'));
    }, [rTime]);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <ScrollView style={styles.box}>
                    <TextInput
                        style={{color:'white', textAlign: 'center', fontSize: 40}}
                        value={rName}
                        onChangeText={setRName}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{color:'white', fontSize: 20}}>Cycle length in days: </Text>
                        <NumericSelector onChange={setRTime} numInfo={{def: rTime, min: 7, max: 28, increment: 7}}/>
                    </View>

                    <Text style={{color:'white', fontSize: 40}}>Workouts</Text>
                    <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                        {
                            Object.entries(workouts).map(([k,v], index) =>
                                <WorkoutEditor
                                    key={k} exercises={v} name={k}
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
                        <View style={{justifyContent: 'center', height: 200, margin: 5, width: 400, backgroundColor: '#333'}}>
                            <TouchableOpacity style={styles.configButton} onPress={() => {
                                //append a new obj
                                //works, but ideally I'd like A B C instead of 1 2 3
                                setWorkouts({...workouts, [Object.keys(workouts).length+1]: []});
                            }}>
                                <Text style={{fontSize: 30}}>Add Workout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <Text style={{color:'white', fontSize: 40}}>Exercises</Text>
                    <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>{
                        //definitely the trickiest of all
                        Object.entries(info).map(([k,v]) =>
                            <ExerciseEditor
                                key={k}
                                name={k} info={v}
                                updateType={value => {
                                    //the only thign we're looking for is custom
                                    if(value === 'Custom')
                                        setCustomScheme(true);
                                    else{
                                        //scan to see if any exercise is custom
                                        setCustomScheme(Object.values(info).some(i =>
                                            i.setInfo.type === 'Custom'
                                        ));

                                    }


                                }}
                                editSets={add => {
                                    setInfo(prev => {
                                        const next = { ...prev[k] };
                                        if(add){
                                            if(next.setInfo.sets.length <= 12)
                                                next.setInfo.sets.push(next.setInfo.sets[next.setInfo.sets.length - 1]);
                                        }
                                        else
                                            next.setInfo.sets.splice(next.setInfo.sets.length-1);

                                        return {...prev, [k]: next};
                                    })
                                }}
                                deleteExercise={() => {

                                    setInfo(prev => {
                                        const next = {...prev};
                                        delete next[k];
                                        return next;

                                    });
                                    //clear from all workouts as well
                                    setWorkouts(prev => {
                                        const next = {...prev};
                                        Object.keys(next).forEach(key => {
                                            next[key] = next[key].filter(e => e !== k)
                                        })
                                        return next;

                                    });

                                }}
                                editExercise={(value, field, field2, field3) => {
                                    setInfo(prev => {
                                        //i really hate editing arrays in react
                                        const next = {...prev[k]};
                                        //yeah this is increidbly stupid but whatever
                                        if(field3 !== undefined)
                                            next[field][field2][field3] = value;
                                        else if(field2 !== undefined)
                                            next[field][field2] = value;
                                        else
                                            next[field] = value;
                                        return {...prev, [k]:next};
                                    })

                                }}/>
                        )
                    }</ScrollView>

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

                </ScrollView>
                <NavBar current={/*better way to handle this?*/'routine'} navigation={props.navigation}/>
            </SafeAreaView>
        </>
    );
};
//useful later
//<ScrollView pagingEnabled style={styles.box} horizontal={true}/>

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

    topBar: {
        height: 40,
        width: '100%',
        backgroundColor: PRIMARY,
        alignItems: 'center',
        borderStyle: 'solid',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
    },
    scroller: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
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
