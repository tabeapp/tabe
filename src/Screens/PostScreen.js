import React, {useState, useEffect, useContext} from 'react';
import { TextInput, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
//get custom icons eventually

import ProgressContext from '../Contexts/ProgressContext';
import ExerciseCard from '../Components/ExerciseCard';
import { PRIMARY } from '../Constants/Theme';

const primaryColor = '#66d6f8';

const PostScreen = props => {
    //this will ALWAYS be passed a param of id,
    //sometimes it'll just be passed the workout itself
    //but id will enable it to load and send requests
    //let { report, saveWorkout, generateReport} = useContext(ProgressContext);

    //const id = props.route.params.postId;
    const workout = props.route.params.workout;

    //you know what fuck this, report will always be sent as an object.

    //should this be passed as params or generated here?
    //const [rep, setRep] = useState(report);

    //console.log(report);
    //const [title, setTitle] = useState(props.route.params.report.name);
    //const [description, setDescription] = useState(props.route.params.report.summary);

    //report should almost always not be null, even if it is the user can just add their own title

    //useEffect(() =>
    //setSummary(generateReport())
    //)

    //console.log('summary ' + JSON.stringify(workout));

    /*const handleNext = () => {
        //combine workout and title and description
        saveWorkout({...report, title: title, description: description})
        props.navigation.navigate('home');

    };*/

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
                    <TouchableOpacity onPress={_=>{}} style={styles.topButton}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                        <Text style={{color:'white'}}>Zyzz</Text>
                    </View>
                    <Text style={{fontSize: 40, color: 'white'}} >
                        {workout.title}
                    </Text>
                    <Text style={{color:'white'}}>
                        {workout.summary}
                    </Text>
                    {
                        workout && workout.exercises.map((ex, index) =>
                            index === 0?
                                //first one is biggest
                                <View style={{alignItems: 'center', margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                    <Text style={{fontSize: 40, color:'white'}}>{ex.name}</Text>
                                    {
                                        ex.work.map((set,i) =>
                                            <Text key={i} style={{fontSize:40, color:'white'}}>
                                                {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                            </Text>)
                                    }
                                </View>
                                :
                                <View style={{margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                    <Text style={{fontSize: 20, color:'white'}}>{ex.name}</Text>
                                    {
                                        ex.work.map(set => <Text style={{fontSize: 20, color:'white'}}>
                                            {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                        </Text>)
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

export default PostScreen;
