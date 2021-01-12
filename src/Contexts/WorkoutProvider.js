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

const CURRENT = 'c';

const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //is this legal
    const {current, routines} = useContext(RoutinesContext).routines;
    const {routinesDispatch} = useContext(RoutinesContext);

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

    //heavy logic here, not much you can do with usereducer here
    const generateWorkout = () => {
        if(JSON.stringify(workout) !== '{}')
            return workout;

        console.log(routines);
        console.log(current);
        const r = FULL_COPY(routines[current]);
        console.log('here')
        let day = r.days[r.currentDay % r.time];

        while(day === 'R'){
            r.currentDay++;
            day = r.days[r.currentDay%r.time];
        }

        const exercises = r.workouts[day];

        //just be careful about copying objects
        const compiledExercises = exercises.map(name => {
            //wait til you hear about supersets
            if(name.includes('/'))
                return null;

            const exInfo = r.info[name];
            const setInfo = exInfo.setInfo;

            let sets = [];
            if(setInfo.type === 'Normal'){
                sets = setInfo.sets.map(reps => ({
                    reps: reps,
                    progress: null,
                    weight: exInfo.current
                }));
            }
            else if(setInfo.type === 'Custom'){
                //very complex, but it works
                //selector is missing, I wonder why though
                const custom = r.customSets[setInfo.scheme][setInfo.selector]

                sets = custom.map(set => ({
                    reps: set.reps,
                    progress: null,
                    //next step, rewritew workout screen and its components
                    weight: Math.ceil(set['%']/100 * exInfo.current/5)*5
                }));

            }
            else if(setInfo.type === 'Sum'){
                //TODO
            }
            else if(setInfo.type === 'Timed'){
                //TODO
            }

            if(exInfo.amrap)
                sets[sets.length-1].amrap = true;

            return {
                name: name,
                barbell: exInfo.barbell,
                sets: sets,
                rest: exInfo.rest
            }


        });
        compiledExercises[0].sets[0].progress = 'c';

        //cuz we updated days
        routinesDispatch(prev => {
            prev.routines[prev.current] = r;
            return prev;
        });

        workoutDispatch(() => ({
            title: r.title + ' ' + day,
            exercises: compiledExercises
        }));
    };

    //can't avoid doing this
    const checkRest = () => {
        //if the current time is before the nextWorkout time, take a rest
        const now = new Date().getTime();
        //even if this isn't initialized, it should work as it just returns the current day
        if(now < routines[current].nextWorkoutTime)
            return true;

        //if it's after, advance currentday until there's a workout
        //and return false
        const r = FULL_COPY(routines[current]);
        while(!r.days[r.currentDay%r.time])
            r.currentDay++;

        routinesDispatch(prev => {
            prev.routines[prev.current] = r;
            return prev;
        });

        return false;
    };


    //i guess like use effect?
    //this same logic shows up over and over again in the old code
    //just make sure the next set is marked as 'c', that simple
    //this seems to work, just make sure adding workouts doesn't mess with this
    const invariantCheck = next => {
        if(!next.exercises)
            return next;

        let found = false;

        for(let e = 0; e < next.exercises.length; e++){
            const ex = next.exercises[e];
            for(let s = 0; s < ex.sets.length; s++){
                const set = ex.sets[s];
                if(set.progress === CURRENT)
                    found = true;
                else if(set.progress === null && !found){
                    set.progress = CURRENT;
                    found = true;
                }
                else if(set.progress === CURRENT && found)
                    set.progress = null;
            }
        }

        return next;
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //guess it would make sense to save workout to disk every time, maybe
    const workoutReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            return invariantCheck(action(next));
        }

        //otherwise
        //drill into state programmatically
        //action.path //'editroutine.title']
        //action.value///startingstrength
        //or you can do action = ['editroutine.title', 'startingstrength']
        if(action.path || action.length === 2){
            let path, value;
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

        return invariantCheck(next);
    };

    const [workout, workoutDispatch] = useReducer(workoutReducer, initState);

    return (
        <WorkoutContext.Provider value={{
            workout: workout,
            workoutDispatch: workoutDispatch,
            checkRest: checkRest,
            generateWorkout: generateWorkout,
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
