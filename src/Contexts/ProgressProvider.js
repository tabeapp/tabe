import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';
import { SS } from "../Assets/Routines/SS";

//one way to do it, custom provider object
const routine = {...SS};

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
        title: ''+routine.title,
        workout: [],
        done: false
    }

    initializeWorkout = () => {
        //load from storage here
        //this is just a string
        let day = routine.days[routine.currentDay % routine.time];
        //rest day
        if(!day)
            return [];

        let workout = routine.workouts[day];

        //add weight info
        workout = workout.map(e => (
            {...e, ...routine.weight[e.name]} ));
        //add prgress
        workout = workout.map(e => (
            //set to null?
            {...e, progress: e.sets.map(_ => null)}
        ));
        //set first set to current set
        workout[0].progress[0] = 'c';
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
            const move = newState.workout[exerciseN].progress[setN] === 'c';
            newState.workout[exerciseN].progress[setN] = reps;

            if(move) {
                if (setN + 1 === newState.workout[exerciseN].progress.length){
                    if (exerciseN + 1 === newState.workout.length) {
                        //gotta do somethign about that, maybe open a summary screen
                        newState.done = true;
                    } else
                        newState.workout[exerciseN + 1].progress[0] = 'c';
                }
                else
                    newState.workout[exerciseN].progress[setN+1] = 'c';
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
        //use workout
        let workoutSummary = this.state.workout.map(e => ({
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
        desc += heaviest.weight;

        return desc;

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
