import React from 'react';
import {AppState} from 'react-native';
import ProgressContext from './ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';
import { SS1 } from '../Assets/Routines/SS1';
import { FiveThreeOne } from '../Assets/Routines/FiveThreeOne';

//one way to do it, custom provider object
const routine = {...FiveThreeOne};

//idk
const maxSets = 12;

//5x5
const defaultSets = [
    { reps: 5 },
    { reps: 5 },
    { reps: 5 },
    { reps: 5 },
    { reps: 5 },
];

//later use user data to get weigths
const defaultWeight = {
    curl: 15,
    bench: 135,
    deadlift: 185,
}

const barbells = [
    'bench', 'deadlift', 'press', 'squat'
];

/*
basic workout structure:

workout:{
    name: '',
    exercises: [
        {
            name:'ohp',
            barbell: true,
            sets:[
                {
                    reps: 5, weight: 150, progress: null
                    reps: 5, weight: 150, progress: null
                    reps: 5, weight: 150, progress: null
                    ...
                }
            ]

        }
        ...
    ] }
*/

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re
class ProgressProvider extends React.Component {
    state = {
        loaded: false,
        workout: {
            title: ''+routine.title,
            exercises: []
        },
        done: false
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        (async () => {
            try {
                const val = await AsyncStorage.getItem('@currentWorkout');

                //if there is no current workout, reinitalize
                if (val === null)
                    this.initializeWorkout();
                //if there is a workout, use that
                else{
                    this.setState({
                        workout: JSON.parse(val)
                    });
                }
            }catch(e){
            }
        })();

        //if(!this.state.loaded)
        //this.initializeWorkout()
    }

    //save
    //it's either this or save on every change
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => {
        if(nextAppState === 'inactive') {
            (async () => {
                try {
                    await AsyncStorage.setItem('@currentWorkout',
                        JSON.stringify(this.state.workout)
                    );
                } catch (e) { }
            })();
        }
    }

    //load from local storage?
    //save that to contstans lol

    //load from storage here
    //this will look at the provided routine and create a workout for the day
    initializeWorkout = () => {
        //this gets something like 'a'
        let day = routine.days[routine.currentDay % routine.time];

        //null means rest day
        if(!day)
            return [];

        //this gets ['ohp', 'dip', 'chinup']
        let exercises = routine.workouts[day];

        let compiledExercises = [];

        for(let i = 0; i < exercises.length; i++){
            let name = exercises[i];

            const exInfo = routine.info[name];
            const setInfo = exInfo.setInfo;

            //the complex part
            let sets = [];
            if(setInfo.type === 'normal'){
                sets = setInfo.sets.map(reps => ({
                    reps: reps,
                    progress: null,
                    weight: exInfo.current
                }))
            }
            else if(setInfo.type === 'custom') {
                //this is [{reps:5, %: .75}...]
                let custom = routine.customSet
                    [setInfo.name]
                    [setInfo.selector];

                sets = custom.map(set => ({
                    reps: set.reps,
                    progress: null,
                    weight: Math.ceil(set['%'] * exInfo.current/5)*5
                }));
            }

            //amrap for last set
            if(exInfo.amrap){
                sets[sets.length-1].amrap = true;
            }

            compiledExercises.push({
                name: name,
                barbell: exInfo.barbell,
                sets: sets
            })
        }

        //set first set to current set
        compiledExercises[0].sets[0].progress = 'c';

        const workout = {
            title: routine.title + ' ' + day,
            exercises: compiledExercises
        };

        this.setState({workout: workout, loaded: true});
    }

    initializeCustom = () => {
        this.setState({
            workout: {
                title: 'Custom Workout',
                exercises: []
            },
            loaded: true
        });
    }

    //the most simple of the workout functions
    //you can also go back and update old sets
    updateSet = (exerciseN, setN, reps) => {
        this.setState(state => {
            let newState = {...state};

            const exercises = newState.workout.exercises;
            //check to see if we need to move the current indicator
            const move = exercises[exerciseN].sets[setN].progress === 'c';

            exercises[exerciseN].sets[setN].progress = reps;

            if(move) {
                if (setN + 1 === exercises[exerciseN].sets.length){
                    if (exerciseN + 1 === exercises.length) {
                        //gotta do somethign about that, maybe open a summary screen
                        //call generate report from here
                        newState.done = true;
                        AsyncStorage.removeItem('@currentWorkout');
                    }
                    else
                        exercises[exerciseN + 1].sets[0].progress = 'c';
                }
                else
                    exercises[exerciseN].sets[setN+1].progress = 'c';
            }

            return newState;
        });
    };

    //custom workout methods incoming
    addExercise = (name) => {
        this.setState(state => {
            let newState = {...state};
            const exercises = newState.workout.exercises;
            exercises.push({
                name,
                sets: defaultSets.map(s => ({
                    ...s,
                    progress: null,
                    weight: defaultWeight[name]
                })),
                barbell: barbells.includes(name)
            });
            if(exercises.length === 1)
                exercises[0].sets[0].progress = 'c';
            return newState;
        });
    }

    //maybe move to have progress and weight within sets array
    updateExercise = (exN, add) => {
        this.setState(state => {
            let newState = {...state};
            let exercise = newState.workout.exercises[exN];
            if(add){
                if(exercise.sets.length >= maxSets)
                    return;

                const lastSet = exercise.sets[exercise.sets.length-1];

                let nextProg;

                //if the last one is c, push null
                //if the last one is a number, push c
                //if the last one is null, push null
                if(lastSet.progress === 'c' || lastSet.progress === null)
                    nextProg = null;
                //'c' or null
                else
                    nextProg = 'c';

                //may need to propogate 'c' all the way to the end
                exercise.sets.push({...lastSet, progress: nextProg});
            }
            else{
                //remove last set
                exercise.sets.splice(exercise.sets.length-1);
            }

            return newState;
        })
    }

    // just put out a good json for posting to the feed
    generateReport = () => {
        let report = {};
        report.name = this.state.workout.title;
        report.time = new Date().getTime();//get current time;

        report.exercises = [];

        for(let i = 0; i < this.state.workout.exercises.length; i++){
            const exercise = this.state.workout.exercises[i];

            let exReport = {
                name: exercise.name,
                work: []
            };

            //scan and compile into somethign like 2x3@150, 1x5@180
            if(!exercise.sets[0])
                continue;

            let curWeight = exercise.sets[0].weight;
            let curReps = exercise.sets[0].progress;
            let curRun = 1;
            for(let j = 1; j < exercise.sets.length; j++){
                const set = exercise.sets[j];

                if(set.weight === curWeight && set.progress === curReps)
                    curRun++;
                else{
                    //save and restart counter
                    exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });
                    curWeight = set.weight;
                    curReps = set.progress;
                    curRun = 1;
                }

            }
            //save the last one
            exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });

            //will this filter out 0s?
            exReport.work = exReport.work.filter(s =>
                s.reps && s.reps !== 'c'
            )

            report.exercises.push(exReport);
        }

        //report is now good to save, I think
        //get rid of empty
        report.exercises = report.exercises.filter(ex => ex.work.length);

        let x = '';
        report.exercises.forEach(ex => {
            x += ex.name + ' ';
            ex.work.forEach(info => {
                x += info.sets + 'x' + info.reps + '@' + info.weight + ',';
            });
            x = x.substring(0, x.length-1);
            x += '\n';
        });

        return x;
    };

    render() {
        return (
            <ProgressContext.Provider value={{
                loaded: this.state.loaded,
                initializeWorkout: this.initializeWorkout,
                initializeCustom: this.initializeCustom,
                workout: this.state.workout,
                title: this.state.title,
                updateSet: this.updateSet,
                addExercise: this.addExercise,
                updateExercise: this.updateExercise,
                generateReport: this.generateReport,
                done: this.state.done
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
