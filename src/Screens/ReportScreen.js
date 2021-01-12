import React, {useState, useEffect, useContext} from 'react';
import { TextInput, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
//get custom icons eventually

import ProgressContext from '../Contexts/ProgressContext';
import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import { FONT } from "../Style/Values";

const primaryColor = '#66d6f8';

const ReportScreen = props => {
    let { report, saveWorkout, analyzeWorkout}  = useContext(ProgressContext);
    //you know what fuck this, report will always be sent as an object.

    //should this be passed as params or generated here?
    //const [rep, setRep] = useState(report);

    //console.log(report);
    //const [title, setTitle] = useState(props.route.params.report.name);
    //const [description, setDescription] = useState(props.route.params.report.summary);

    //report should almost always not be null, even if it is the user can just add their own title
    const [title, setTitle] = useState(report?report.name:'');

    const [description, setDescription] = useState(report?report.summary:'');
    //useEffect(() =>
    //setSummary(generateReport())
    //)

    //console.log('summary ' + JSON.stringify(workout));

    const handleNext = () => {
        //idk what else to call this
        //but essentially increment progressing weights, look for prs, etc
        analyzeWorkout();

        //combine workout and title and description
        saveWorkout({...report, title: title, description: description});


        props.navigation.navigate('home');

    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.topButton}>
                        <Words/>
                    </TouchableOpacity>
                    <Words style={{fontSize: 20}}>Workout Summary</Words>
                    <TouchableOpacity onPress={handleNext} style={styles.topButton}>
                        <Words style={{fontSize: 20}}>
                            Next
                        </Words>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                        <Words>Zyzz</Words>
                    </View>
                    <TextInput
                        style={{fontFamily: FONT, fontSize: 40, color: 'white'}}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={{fontFamily: FONT, color:'white'}}
                        value={description}
                        onChangeText={setDescription}
                    />
                    {
                        report && report.exercises.map((ex, index) =>
                            index === 0?
                                //first one is biggest
                                <View style={{alignItems: 'center', margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                    <Words style={{fontSize: 40}}>{ex.name}</Words>
                                    {
                                        ex.work.map((set,i) =>
                                            <Words key={i} style={{fontSize:40}}>
                                                {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                            </Words>)
                                    }
                                </View>
                                :
                                <View style={{margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                    <Words style={{fontSize: 20}}>{ex.name}</Words>
                                    {
                                        ex.work.map((set,i) =>
                                            <Words key={i} style={{fontSize: 20}}>
                                                {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                            </Words>)
                                    }
                                </View>
                        )
                    }
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {justifyContent: 'center', margin: 5},
    //top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
});

export default ReportScreen;
