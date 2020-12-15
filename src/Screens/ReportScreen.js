import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
//get custom icons eventually

import ProgressContext from '../Contexts/ProgressContext';
import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';

const primaryColor = '#66d6f8';

const ReportScreen = props => {
    let { report, generateReport} = useContext(ProgressContext);

    //should this be passed as params or generated here?
    //const [rep, setRep] = useState(report);

    console.log(report);
    //const [title, setTitle] = useState(props.route.params.report.name);
    //const [description, setDescription] = useState(props.route.params.report.summary);
    //const [title, setTitle] = useState(report?report.name:'');
    //const [description, setDescription] = useState(report?report.summary:'');
    //useEffect(() =>
        //setSummary(generateReport())
    //)

    //console.log('summary ' + JSON.stringify(workout));

    const handleNext = () => {
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.topButton}>
                        <Text style={{color: 'white', fontSize: 20}}>
                        </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}>Workout Summary</Text>
                    <TouchableOpacity onPress={handleNext} style={styles.topButton}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                        <Text style={{color:'white'}}>Zyzz</Text>
                    </View>
                    <Text style={{fontSize: 40, color:'white'}}>{report&&report.name}</Text>
                    <Text style={{color:'white'}}>{report&&report.summary}</Text>
                    {
                        report && report.exercises.map(ex =>
                            <View style={{padding: 4, backGroundColor: '#333'}} key={ex.name}>
                                <Text style={{color:'white'}}>{ex.name}</Text>
                                {
                                    ex.work.map(set => <Text style={{color:'white'}}>{set.sets + ' ' + set.reps + ' ' + set.weight}</Text>)
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
