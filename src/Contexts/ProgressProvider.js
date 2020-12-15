import React from 'react';
import {AppState} from 'react-native';
import ProgressContext from './ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';
import { SS1 } from '../Assets/Routines/SS1';
import { FiveThreeOne } from '../Assets/Routines/FiveThreeOne';

//one way to do it, custom provider object

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
        routine: null,
        //workout: {
            //title: '',
            //exercises: []
        //},
        workout: null,
        report: null,
        done: false
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        //don't initialize the workout, just load the routine if it's there

        //load the routine, if it exists

        (async () => {
            try {
                const val = await AsyncStorage.getItem('@currentRoutine');

                //if there is no current workout, reinitalize
                if (val !== null){
                    this.setState({
                        routine: JSON.parse(val)
                    });

                    //if it exists, also load the workout
                    const workout = await AsyncStorage.getItem('@currentWorkout');
                    console.log(workout);
                    if(workout !== null){
                        this.setState({
                            workout: JSON.parse(workout)
                        }, this.generateReport)//yeah we need this
                    }



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

    //this saves workout to storage when the app is closed
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

    //this checks if the user is following a routine as of now
    //if not it returns false
    //used for navigation, setting up new routine
    checkRoutine = async () => {
        return this.state.routine;
        //const routine = await AsyncStorage.getItem('@currentRoutine');

        //just return false for testing for now
        //return false;
        //return routine !== null;
    }

    generateRoutine = async (baseRoutine, efforts) => {
        const routine = {...baseRoutine};
        routine.currentDay = 0;

        //need to iterate because of press vs press.ez
        //efforts.forEach(ex => {
        for(let i = 0; i < efforts.length; i++){
            const ex = efforts[i];
            const routineEx = routine.info[ex.name];

            //step 1, calculate one rep max
            //using epley
            let orm = ex.reps === 1 ? ex.weight : ex.weight*(1+ex.reps/30);
            //step 2, multiply * .9 to get training orm
            orm *= .9;

            //orm = w * (1+r/30)
            //orm/(1+r/30) = w

            //step 3, 5/3/1 will just take that orm, starting strength will use 5RM
            //the calculation isn't perfect, but who cares tbh
            //the current weight will incrmement anyways, and you can change it if you need
            //if normal, all sets have the same reps
            if(routineEx.setInfo.type === 'normal')
                routineEx.current = orm/(1+routineEx.setInfo.sets[0]/30);
            //otherwise, just use the orm, like in 5/3/1
            else
                routineEx.current = orm;

            routineEx.current = Math.floor(routineEx.current/5)*5;

            const ez = routine.info[ex.name + '.ez'];
            if(ez){
                if(ez.setInfo.type === 'normal')
                    ez.current = orm/(1+ez.setInfo.sets[0]/30);
                else
                    ez.current = orm;
                ez.current = Math.floor(ez.current/5)*5;
            }

        }
        await this.setRoutine(routine);
        //this.setRoutine(routine).then();
    }

    setRoutine = async routine => {
        this.setState({routine: routine});
        //console.log(this.state.routine);
        //no you don't just save teh routine string, you actually need the object
        await AsyncStorage.setItem('@currentRoutine', JSON.stringify(routine));
    }

    //load from local storage?
    //save that to contstans lol

    //load from storage here
    //this will look at the provided routine and create a workout for the day
    initializeWorkout = () => {
        //this might be loaded on component mount form asyncStorage
        if(this.state.workout)
            return;

        const ro = this.state.routine;
        //this gets something like 'a'
        let day = ro.days[ro.currentDay % ro.time];

        //null means rest day
        if(!day)
            return [];

        //this gets ['ohp', 'dip', 'chinup']
        let exercises = ro.workouts[day];

        let compiledExercises = [];

        for(let i = 0; i < exercises.length; i++){
            let name = exercises[i];

            const exInfo = ro.info[name];
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
                let custom = ro.customSet
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
            title: ro.title + ' ' + day,
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
        //just default for the report
        if(!this.state.workout)
            return {
                name: '',
                exercises: []
            };

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
                x += info.sets + 'x' + info.reps + '@' + info.weight + ', ';
            });
        });
        x = x.substring(0, x.length-2);
        report.summary = x;

        this.setState({report: report});
        return report;
    };

    //this is a big array of workouts
    saveWorkout = async workoutData => {
        AsyncStorage.getItem('@workouts', (_, result) => {
            let workouts = [];
            if(result !== null)
                workouts = JSON.parse(result);

            workouts.push(workoutData);
            AsyncStorage.setItem('@workouts', JSON.stringify(workouts));
        });
    };

    render() {
        return (
            <ProgressContext.Provider value={{
                loaded: this.state.loaded,
                routine: this.state.routine,
                report: this.state.report,
                generateRoutine: this.generateRoutine,
                checkRoutine: this.checkRoutine,
                setRoutine: this.setRoutine,
                initializeWorkout: this.initializeWorkout,
                initializeCustom: this.initializeCustom,
                saveWorkout: this.saveWorkout,
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
