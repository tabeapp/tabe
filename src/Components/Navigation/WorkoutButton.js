import React, { useContext } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Words from '../Simple/Words';
import { WorkoutContext } from '../../Contexts/WorkoutProvider';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import { useNavigation } from '@react-navigation/native';

const WorkoutButton = () => {
    const {routines} = useContext(RoutinesContext);
    const {generateCustom, checkRest, createWorkout} = useContext(WorkoutContext);

    const navigation = useNavigation();

    const customStart = () => {
        //set up
        generateCustom();
        navigation.navigate('workout');
    };

    //need to fucking redo this whole thing too
    const routineStart = async () => {
        const currentR = routines.find(x => x.current === 1);
        if(currentR){
            //if it's a rest day, ask for confirmation
            let isRest = checkRest();

            if(!isRest){
                //no it's possible it's already loaded
                createWorkout();
                navigation.navigate('workout');
            }
            else{
                Alert.alert(
                    "Recovery Day",
                    "Are you sure you want to skip recovery?",
                    [
                        {
                            text: "Cancel",//don't do the workout
                            onPress: () => {},
                            style: "cancel"
                        },
                        {
                            text: "Override",
                            onPress: () => {
                                createWorkout();
                                navigation.navigate('workout');
                            },
                        }
                    ],
                    {cancelable: false}
                )

            }
        }else{
            navigation.navigate('chooseroutine');
        }
    };

    let icon = 'barbell';

    return (<TouchableOpacity style={styles.workoutButton} key={'workout'} onPress={routineStart} onLongPress={customStart}>
        <Words>
            <Ionicons name={icon} color={'white'} size={50} />
        </Words>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    //kinda squishes the other buttons, but whatever
    workoutButton:{
        backgroundColor: 'red',
        height: 80,
        width: 80,
        bottom: 10,
        //this
        marginHorizontal: -10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
    },
});

export default WorkoutButton;
