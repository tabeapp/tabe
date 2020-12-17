import { Switch, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useState, useContext} from "react";
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import NumericSelector from "../Components/NumericSelector";

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

//i guess you could have the option to build a routine here too, but for now it's just for editing the current routine
//this can't be default screen, otherwise routine doesnt' have time to load
const RoutineScreen = props => {
    const data = ['pee pee', 'poo poo', 'oooooh'];
    const { routine } = useContext(ProgressContext);

    //nearly everything is gonna be editable
    const [rName, setRName] = useState(routine.title);
    const [rTime, setRTime] = useState(routine.time);
    const [info, setInfo] = useState(routine.info);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <ScrollView style={styles.box}>
                    <TextInput
                        style={{color:'white', fontSize: 40}}
                        value={rName}
                        onChangeText={setRName}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color:'white'}}>Cycle length in days: </Text>
                        <NumericSelector onChange={setRTime} numInfo={{def: rTime, min: 7, max: 28, increment: 7}}/>
                    </View>
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
                                {
                                    //this should actually be very similar to custom workout scree
                                    v.setInfo.type === 'normal' &&
                                    v.setInfo.sets.map(v =>
                                        <View style={{ ...styles.circle }}>
                                            <Text style={{ color: 'white' }}>{v}</Text>
                                        </View>
                                    )
                                }
                                <Text>Progression:</Text>

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

                    <Text style={{color: 'white'}}>{JSON.stringify(routine)}</Text>

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
