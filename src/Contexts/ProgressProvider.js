import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';
import { SS } from "../Assets/Routines/SS";

//one way to do it, custom provider object
const routine = {...SS};

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re
class ProgressProvider extends React.Component {
    //load from local storage?
    //save that to contstans lol

    initalizeWorkout = () => {
        //load from storage here
        //this is just a string
        let day = routine.days[routine.currentDay % routine.time];
        //rest day
        if(!day)
            return [];

        let workout = routine.workouts[day];

        //add weight info
        workout = workout.map(e => (
            {...e, ...routine.weight[e.name]}
        ));
        //add prgress
        workout = workout.map(e => (
            //set to null?
            {...e, progress: e.sets.map(_ => null)}
        ));
        //set first set to current set
        workout[0].progress[0] = 'c';
        return workout;
    }

    workout = this.initalizeWorkout();

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
            if(heaviest.sets[i] === reps)
                sets++;
        }

        desc += sets + 'x';
        desc += reps + '@';
        desc += heaviest.weight;

        return desc;

    };

    state = {
        title: ''+routine.title,
        workout: this.workout,
        done: false
    }

    render() {
        return (
            <ProgressContext.Provider value={{
                workout: this.state.workout,
                title: this.state.title,
                updateSet: this.updateSet,
                generateReport: this.generateReport,
                done: this.state.done
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
