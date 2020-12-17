import { Switch, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useState, useContext} from "react";
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import NumericSelector from "../Components/NumericSelector";
import ExercisePicker from "../Components/ExercisePicker";
import WorkoutEditor from "../Components/WorkoutEditor";
import { DEFAULT_EX_INFO } from "../Constants/DefaultExInfo";
import DaysEditor from "../Components/DaysEditor";

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



    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
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
                                        //we know which workout to add it to cuz of k
                                        //ugh this is so annoying why cant we just do
                                        //workouts[k].push(ex)
                                        setWorkouts({...workouts, [k]: [...workouts[k], ex]})

                                        //also need to add it to exerdcises so we can edit it later

                                        //problem: what about adding lighter versions of exercises like in ppl?
                                        //solution: alert the user and let them choose
                                        if(ex in info){
                                            //if no, just cancel addition and use the info already there
                                            //if yes, just add 'Bench Press.b'

                                        }
                                        if(!(ex in info)){
                                            setInfo({
                                                ...info, [ex]: DEFAULT_EX_INFO(ex)
                                            })
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
                        Object.entries(info).map(([k,v]) => {

                            //i guess the width is 400?
                            //there's gotta be a more programmatic way to do this
                            return <View key={k} style={{margin: 5, width: 400, backgroundColor: '#333'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{color:'white'}}>{k}</Text>
                                    <TouchableOpacity style={{width: 20, borderWidth: 1, borderColor: 'red', borderRadius: 10}}>
                                        <Text style={{color:'red'}}>X</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text>Current Working Weight: </Text>
                                <NumericSelector onChange={() => {}} numInfo={{def:v.current, min: 0, max: 995, increment: 5}}/>
                                <Text>Sets:</Text>

                                <Text>Custom prgression(like5/3/1):</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={v.setInfo.type==='custom' ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {/*all hell breaks loose*/}}
                                    value={v.setInfo.type==='custom'}
                                />
                                {
                                    //this should actually be very similar to custom workout screen
                                    v.setInfo.type === 'normal' &&
                                    v.setInfo.sets.map((v, index) =>
                                        <View key={index} style={{ ...styles.circle }}>
                                            <Text style={{ color: 'white' }}>{v}</Text>
                                        </View>
                                    )
                                }
                                {
                                    //oh god wtf should we do here for 5/3/1
                                    v.setInfo.type === 'custom' &&
                                    <View></View>
                                }
                                <Text>Progression:</Text>
                                {
                                    v.progress &&
                                    <>
                                        <NumericSelector onChange={() => {}} numInfo={{def:v.progress.amount, min: 0, max: 25, increment: 2.5}}/>
                                        <Text>every</Text>
                                        <NumericSelector onChange={() => {}} numInfo={{def:v.progress.rate, min: 1, max: 10, increment: 1}}/>
                                        <Text>times the workout is done</Text>
                                    </>

                                }


                                <Text>AMRAP Last Set:</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={v.amrap ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => {}}
                                    value={v.amrap}
                                />



                            </View>
                            //return <Text style={{color:'white'}}>{k + ' ' + JSON.stringify(v)}</Text>

                        })
                    }</ScrollView>

                    <Text style={{color:'white', fontSize: 40}}>Days</Text>
                    <DaysEditor/>

                </View>
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
