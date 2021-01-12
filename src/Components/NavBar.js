import React, { useContext } from 'react';
import { Alert, TouchableOpacity, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Words from "./Words";
import RoutinesContext from "../Contexts/RoutinesContext";
import WorkoutContext from "../Contexts/WorkoutContext";

const routes = [
    'home',
    'explore',
    'workout',
    'routine',
    'profile',
];

const iconMapping = {
    home: 'home',
    explore: 'search',
    workout: 'barbell',
    routine: 'reload',
    profile: 'person',
};

const NavBar = props => {
    const {current, routines} = useContext(RoutinesContext).routines;
    const {workoutDispatch, checkRest, generateWorkout} = useContext(WorkoutContext);

    const currentPage = props.current;
    const handlePress = (r) => {
        if (r === currentPage)
            return;

        if (r === 'workout')
            props.navigation.navigate(r);
        else
            props.navigation.replace(r);
    };

    const customStart = () => {
        //set up
        workoutDispatch(() => ({
            title: 'Custom Workout',
            exercises: []
        }))
        props.navigation.navigate('customworkout');
    };

    //need to fucking redo this whole thing too
    const routineStart = async () => {
        if(routines[current]){
            //if it's a rest day, ask for confirmation
            let isRest = checkRest();

            if(!isRest){
                //no it's possible it's already loaded
                generateWorkout();
                props.navigation.navigate('workout');
            }
            else{
                console.log('no workout for you, take a breather')
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
                                generateWorkout();
                                props.navigation.navigate('workout');
                            },
                        }
                    ],
                    {cancelable: false}
                )

            }
        }else{
            props.navigation.navigate('chooseroutine');
        }
    };

    return (<View style={styles.navBar}>{
        routes.map(r => {
            let icon = iconMapping[r];
            if (r !== currentPage)
                icon += '-outline'

            if (r === 'workout') {
                return (<TouchableOpacity style={styles.workoutButton} key={r} onPress={routineStart} onLongPress={customStart}>
                    <Words>
                        <Ionicons name={icon} color={'white'} size={50} />
                    </Words>
                </TouchableOpacity>);
            }

            return (<TouchableOpacity style={styles.button} key={r} onPress={() => handlePress(r)}>
                <Words>
                    <Ionicons name={icon} color={'white'} size={40}/>
                </Words>
            </TouchableOpacity>); })
    }</View>);
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
    button:{
    },
    navBar: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default NavBar;
