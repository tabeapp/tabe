import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';
import { SS } from "../Assets/Routines/SS";
import { FiveThreeOne } from "../Assets/Routines/FiveThreeOne";

//one way to do it, custom provider object
const routine = {...FiveThreeOne};

//idk
const maxSets = 12;

const defaultSets = [5,5,5,5,5];

//later use user data to get weigths
const defaultWeight = {
    curl: 15,
    bench: 135,
    deadlift: 185,
}

const primaries = [
    'bench', 'deadlift', 'press', 'squat'
];

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re
class ProgressProvider extends React.Component {
    //load from local storage?
    //save that to contstans lol
    state = {
        loaded: false,
        workout: {
            title: ''+routine.title,
            exercises: []
        },
        done: false
    }

    initializeWorkout = () => {
        //load from storage here
        //this is just a string
        //this gets something like 'a'
        let day = routine.days[routine.currentDay % routine.time];

        //rest day,null
        if(!day)
            return [];

        //this gets ['ohp', 'dip', 'chinup']
        let exercises = routine.workouts[day];

        let compiledExercises = [];

        for(let i = 0; i < exercises.length; i++){
            let name = exercises[i];

            //the complex part
            let sets = [];
            if(routine.info[name].setInfo.type === 'normal'){
                sets = routine.info[name].setInfo.sets.map(reps => ({
                    reps: reps,
                    progress: null,
                    weight: routine.info[name].current
                }))
            }
            else if(routine.info[name].setInfo.type === 'custom') {
                //this is [{reps:5, %: .75}...]
                let custom = routine.customSet
                    [routine.info[name].setInfo.name]
                    [routine.info[name].setInfo.selector];

                sets = custom.map(set => ({
                    reps: set.reps,
                    progress: null,
                    weight: set['%'] * routine.info[name].current
                }))
            }

            //amrap for last set
            if(routine.info[name].amrap){
                sets[sets.length-1].amrap = true;
            }





            compiledExercises.push({
                name: name,
                barbell: routine.info[name].barbell,
                sets: sets
            })

        }




        /*//add weight info
        workout = workout.map(e => (
            {name: e, ...routine.info[e]} ));
        //add prgress
        workout = workout.map(e => (
            //set to null?
            {...e, progress: e.sets.map(_ => null)}
        ));*/
        //set first set to current set

        compiledExercises[0].sets[0].progress = 'c';
        const workout = {
            title: routine.name + ' ' + day,
            exercises: compiledExercises
        };

        this.setState({workout: workout, loaded: true});
    }

    //just gonna have it be empty for now, initiallize workout doesn't seem to want to work rn
    //loaded = this.initializeWorkout();


    initializeCustom = () => {
        this.setState({workout: []});
    }

    //workout = this.initalizeWorkout();

    //redoing this whole thing
    //workout is a copy of the current day
    //weight is a copy of weight info

    //the most simple of the workout functions
    //you can also go back and update old sets
    updateSet = (exerciseN, setN, reps) => {
        this.setState(state => {
            let newState = {...state};
            //check to see if we need to move the current indicator
            //const move = newState.workout[exerciseN].progress[setN] === 'c';
            const move = newState.workout.exercises[exerciseN].sets[setN].progress === 'c';
            //newState.workout[exerciseN].progress[setN] = reps;
            newState.workout.exercises[exerciseN].sets[setN].reps = reps;

            if(move) {
                if (setN + 1 === newState.workout.exercises[exerciseN].sets.length){
                    if (exerciseN + 1 === newState.workout.exercises.length) {
                        //gotta do somethign about that, maybe open a summary screen
                        newState.done = true;
                    } else
                        newState.workout.exercises[exerciseN + 1].sets[0].progress = 'c';
                }
                else
                    newState.workout.exercises[exerciseN].sets[setN+1].progress = 'c';
            }

            return newState;
        });
    };

    //custom workout methods incoming
    addExercise = (name) => {
        this.setState(state => {
            let newState = {...state};
            newState.workout.push({
                name,
                sets: [...defaultSets],
                progress: defaultSets.map(_ => null),
                current: defaultWeight[name],
                primary: primaries.includes(name)
                //need to add weight info in here
            });
            if(newState.workout.length === 1)
                newState.workout[0].progress[0] = 'c';
            return newState;
        });
    }

    //maybe move to have progress and weight within sets array
    updateExercise = (exN, add) => {
        this.setState(state => {
            let newState = {...state};
            let exercise = newState.workout[exN];
            if(add){
                if(exercise.progress.length >= maxSets)
                    return;

                //if the last one is c, push null
                //if the last one is a number, push c
                //if the last one is null, push null
                const lastSet = exercise.progress[exercise.progress.length-1];

                if(lastSet === 'c' || lastSet === null)
                    exercise.progress.push(null);
                //'c' or null
                else
                    exercise.progress.push('c');

                //may need to propogate 'c' all the way to the end
                exercise.sets.push(exercise.sets[exercise.sets.length-1]);
            }
            else{
                //remove last set
                exercise.sets.splice(exercise.sets.length-1);
                exercise.progress.splice(exercise.progress.length-1);

            }

            return newState;



        })

    }

    //get rid of all the unnecessary stuff and
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
            let curReps = exercise.sets[0].reps;
            let curRun = 1;
            for(let j = 1; j < exercise.sets.length; j++){
                const set = exercise.sets[j];

                if(set.weight === curWeight && set.reps === curReps)
                    curRun++;
                else{
                    //save and restart counter
                    exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });
                    curWeight = set.weight;
                    curReps = set.reps;
                    curRun = 1;
                }

            }
            //save the last one
            exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });

            report.exercises.push(exReport);
        }

        //report is now good to save, I think




        /*//use workout
        let workoutSummary = this.state.workout.exercises.map(e => ({
            name: e.name,
            sets: e.progress.filter(s => s && s !== 'c'),
            weight: e.current
        }));

        //this is good enough to save to file
        workoutSummary = workoutSummary.filter(e => e.sets.length);

        //heres a cool string

        let heaviest = workoutSummary.sort((a,b) => a.weight < b.weight)[0];
        if(!heaviest)
            return;

        let desc = heaviest.name + ' ';

        let sets = 1;
        let reps = heaviest.sets[0];

        for(let i = 1; i < heaviest.sets.length; i++){
            if(heaviest.sets[i] >= reps)
                sets++;
        }

        desc += sets + 'x';
        desc += reps + '@';
        desc += heaviest.weight;*/

        return JSON.stringify(report);

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
