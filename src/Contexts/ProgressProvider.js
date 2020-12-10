import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL } from '../Assets/Routines/MetallicaPPL';

//one way to do it, custom provider object

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re
class ProgressProvider extends React.Component {
    //load from local storage?
    //save that to contstans lol

    initalizeWorkout = () => {
        //load from storage here
        let workout = [...MetallicaPPL.days[MetallicaPPL.currentDay]];
        //add weight info
        workout = workout.map(e => (
            {...e, ...MetallicaPPL.weight[e.name]}
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
                        //???
                        //set a workout complete flag?
                    } else
                        newState.workout[exerciseN + 1].progress[0] = 'c';
                }
                else
                    newState.workout[exerciseN].progress[setN+1] = 'c';
            }

            return newState;
        });
    };

    state = {
        title: ''+MetallicaPPL.title,
        workout: this.workout,
    }

    render() {
        return (
            <ProgressContext.Provider value={{
                workout: this.state.workout,
                title: this.state.title,
                updateSet: this.updateSet,
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
