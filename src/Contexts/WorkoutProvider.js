import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutContext from './WorkoutContext';
import { useReducer, useEffect, useContext }  from 'react';
import { FULL_COPY } from "../Utils/UtilFunctions";
import { AppState } from "react-native";
import RoutinesContext from "./RoutinesContext";

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re

//so the idea behind this shit is that i'm really tired of passing down modifying functions
//so we're gonna use useReducer


const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {
    };

    //is this legal
    const {current, routines} = useContext(RoutinesContext);

    const handleAppStateChange = nextAppState => {
        if(nextAppState === 'inactive' || nextAppState === 'background') {
            (async () => {
                try {
                    await AsyncStorage.setItem('@workout',
                        JSON.stringify(workout)
                    );
                } catch (e) { }
            })();
        }
    };

    //initial load from storage
    useEffect(() => {
        //componentdidmount
        AppState.addEventListener('change', handleAppStateChange);

        AsyncStorage.getItem('@workout').then(obj => {
            //do we need to call generateReport here?
            if(obj !== null)
                workoutDispatch(() => JSON.parse(obj));
        });

        //componentwillunmount
        return () =>
            AppState.removeEventListener('change', handleAppStateChange);
    }, []);


    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    const workoutReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            return action(next);
        }

        //otherwise
        //drill into state programmatically
        //action.path //'editroutine.title']
        //action.value///startingstrength
        //or you can do action = ['editroutine.title', 'startingstrength']
        if(action.path || action.length === 2){
            let path, value;
            //TODO: oh fuck this also means we cant use '.' in workout names
            //use - instead
            if(action.path) {
                path = action.path.split('.');
                value = action.value;
            } else {
                path = action[0].split('.');
                value = action[1];
            }

            let target = next;
            //stop right before last
            for(let i = 0; i < path.length-1; i++){
                const p = path[i];
                if(!(p in target)){
                    //words. needs this cuz the splitter will split like 'set', '0'
                    if(isNaN(p))
                        target[p] = {};
                    else
                        target[p] = [];
                }
                target = target[p];
            }
            //and finally set it
            target[path[path.length-1]] = value;
        }

        //i guess we could store some logic here
        if(action.type){
            //this needs to happen a lot
            if(action.type === 'setItem')
                //don't save editRoutine... or should we?
                AsyncStorage.setItem('@workout', JSON.stringify({
                    workout: next.workout
                }));
        }

        return next;
    };

    const [workout, workoutDispatch] = useReducer(workoutReducer, initState);

    return (
        <WorkoutContext.Provider value={{
            workout: workout,
            workoutDispatch: workoutDispatch
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
