import React, {useState, useContext} from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { PRIMARY } from '../Constants/Theme';
import Words from '../Components/Words';
import WorkoutContext from '../Contexts/WorkoutContext';
import Write from '../Components/Write';
import SafeBorder from "../Components/SafeBorder";

const primaryColor = '#66d6f8';

const ReportScreen = props => {
    const {saveWorkout, generateReport, analyzeWorkout} = useContext(WorkoutContext);
    //you know what fuck this, report will always be sent as an object.

    const [report] = useState(generateReport()/*props.route.params.report*/);

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

        //combine workout and title and description
        saveWorkout({...report, title: title, description: description});


        props.navigation.navigate('home');

    };

    return (
        <SafeBorder>
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
                <Write
                    value={title}
                    onChange={setTitle}
                />
                <Write
                    style={{fontSize: 20, height: 100}}
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

const styles = StyleSheet.create({
    container: {justifyContent: 'center', margin: 5},
    //top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    top: {height: 40, width: '100%', flexDirection: 'row', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'space-between'},
    topButton: {alignItems: 'center', width: 80, paddingHorizontal: 15},
});

export default ReportScreen;
