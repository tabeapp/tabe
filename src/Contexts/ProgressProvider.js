import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL, SampleProgress } from '../Assets/Routines/MetallicaPPL';

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
            let newState = {...state}
            if(!state.progress[exerciseN])
                newState.progress[exerciseN] = [];
            newState.progress[exerciseN][setN] = reps;

            //if that was the last rep, start the next set by adding it to prog
            if(this.currentWorkout()[exerciseN].length === newState.progress[exerciseN].length)
                newState.progress[exerciseN+1] = [];
            //that's fucking it, we're converting to arry rather than objcs


            return newState;
        });
    };

    currentWorkout = () => {
        return this.state.routine.days[this.state.routine.currentDay];
    }

    //might put timer in here
    //this looks at progress to determine
    //this is the next set you're doing, pretty useful
    /*currentSet = () => {
        const exercises = Object.keys(this.state.progress);
        const name = exercises[exercises.length - 1];

        return [
            name,
            this.state.progress[name].length,
            0.5 ];//yeah this is gonna be fun
    }*/

    state = {
        title: ''+MetallicaPPL.title,
        workout: this.workout,
        weight: {...MetallicaPPL.weight}//routine.weigth
        //progress: {...SampleProgress}// progress is part of  workout now
    }

    render() {
        return (
            <ProgressContext.Provider value={{
                workout: this.state.workout,
                weight: this.state.weight,
                title: this.state.title,
                updateSet: this.updateSet,
                //currentSet: this.currentSet
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
