import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import ProgressContext from '../Contexts/ProgressContext';
import CustomExerciseCard from '../Components/CustomExerciseCard';
import { PRIMARY } from '../Constants/Theme';
import ExercisePicker from '../Components/ExercisePicker';


const primaryColor = '#66d6f8';

//idk what im doing
//const ProgressContext = React.createContext();
//later would be generated more intelligently
const sampleSuggestion = [
    'bench', 'curl', 'deadlift',
];

//completely customizable
const CustomWorkoutScreen = () => {
    let {loaded, initializeCustom, workout, addExercise, generateReport} = useContext(ProgressContext);
    useEffect(() => {
        if (!loaded)
        {initializeCustom();}
    }, []);

    const [modal, setModal] = useState(false);

    const addFromSuggestions = name => {
        addExercise(name);
        sampleSuggestion.splice(sampleSuggestion.indexOf(name), 1);

    };

    const openExerciseSelect = () => {
        setModal(true);
    };

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>{workout?workout.title:''}</Text>
                </View>
                <View style={styles.container}>{
                    workout&&workout.exercises.map((ex, index) => (
                        <CustomExerciseCard key={ex.name} exercise={ex} exerciseN={index} />
                    ))
                }</View>
                <View style={{flexDirection: 'row' }}>{
                    sampleSuggestion.map(name => {
                        return (<TouchableOpacity
                            key={name}
                            style={{borderColor: 'white', borderWidth: 1, borderRadius: 20, padding: 2, paddingHorizontal: 5, margin: 2}}
                            onPress={() => addFromSuggestions(name)}>
                            <Text style={{color: 'white'}}>{name}</Text>
                        </TouchableOpacity>);
                    })
                }</View>
                <TouchableOpacity style={styles.configButton} onPress={openExerciseSelect}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
                <ExercisePicker visible={modal} close={() => setModal(false)}/>
                {
                    //done && <TouchableOpacity style={{backgroundColor: 'green', width: 50, height: 30}}/>
                    <Text style={{color:'white'}} >{generateReport()}</Text>
                }
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    plus: {
        fontSize: 35,
    },
    configButton: {
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        width: 50,
        height: 50,
    },

    container: {alignItems: 'center', justifyContent: 'center', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default CustomWorkoutScreen;
