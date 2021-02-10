import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { PRIMARY } from '../Constants/Theme';
import Words from '../Components/Words';
import WorkoutContext from '../Contexts/WorkoutContext';
import Write from '../Components/Write';
import SafeBorder from "../Components/SafeBorder";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";
import { NavigationActions, } from "react-navigation";
import { CommonActions, StackActions } from '@react-navigation/native';

const primaryColor = '#66d6f8';

//lets go add media additions, using s3
const ReportScreen = props => {
    const {workout, saveWorkout, generateReport, analyzeWorkout} = useContext(WorkoutContext);
    //you know what fuck this, report will always be sent as an object.

    //this is fucky
    const [report, setReport] = useState({
        title: '',
        summary: '',
        exercises: []
    });
    //bruh
    useEffect(() => {
        let x = generateReport();
        setReport(x);
        setTitle(x.title);
        setDescription(x.summary);
    }, [/*workout*/]);

    const [title, setTitle] = useState(report.title);

    const [description, setDescription] = useState(report ? report.summary : '');
    //useEffect(() =>
    //setSummary(generateReport())
    //)

    //console.log('summary ' + JSON.stringify(workout));

    const handleNext = () => {
        //idk what else to call this
        //but essentially increment progressing weights, look for prs, etc
        analyzeWorkout(report);



        //clear the entire nav stack, no going back through workouts
        //props.navigation.dispatch(StackActions.popToTop());
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'home'}]
        }))
            //index: 0,
            //routes: {name: 'home'}
        //}));
        //props.navigation.navigate('home');

        //combine workout and title and description
        //necessary transformation
        saveWorkout({title: title, description: description, data: JSON.stringify(report.exercises)});

    };

    return (
        <SafeBorder>
            <TopBar title='Workout Summary' rightText='Save' onPressRight={handleNext}/>
            <View style={STYLES.card}>
                <Row>
                    <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                    <Words>Zyzz</Words>
                </Row>
                <Write
                    style={{fontSize: 20, height: 100}}
                    value={title}
                    onChange={setTitle}
                />
                <Write
                    value={description}
                    onChange={setDescription}
                />
                {
                    report && report.exercises.map((ex, index) =>
                        index === 0 ?
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
        </SafeBorder>
    );
};

export default ReportScreen;
