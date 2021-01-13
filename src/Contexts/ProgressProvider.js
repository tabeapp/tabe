import React from 'react';
import {AppState} from 'react-native';
import ProgressContext from './ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//one way to do it, custom provider object

//idk
const maxSets = 12;

//5x5

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
        workout: null,
        report: null,
        done: false
    }


    //fuck this, we're just gonna use the "next workout date"

    //COMPLETELY redoing this for new routine format
    //then again, all we need to do is set efforts
    //this is for when a routine is generated with 'wizard'
    //all it does is get weights
    generateRoutine = async (baseRoutine, efforts) => {
        const routine = {...baseRoutine};
        routine.currentDay = 0;//seems unnecssary
        //just setting this to dumb value for now
        //next work out is today, buddy
        //set it to super early in the morning for easy comparison
        let nextW = new Date();
        nextW.setHours(0);
        nextW.setMinutes(0);
        routine.nextWorkoutTime = nextW.getTime();

        //need to iterate because of press vs press.ez
        //efforts.forEach(ex => {
        for(let i = 0; i < efforts.length; i++){
            const ex = efforts[i];
            //progress is copied in right here
            const routineEx = routine.info[ex.name];
            //if(routineEx.progress.rate !== 'session')
            //this is actually pretty imporatnt, forgot it in routineedit
            routineEx.progress.countdown = routineEx.progress.rate;

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
            routineEx.current = orm/(1+routineEx.setInfo.sets[0]/30);
            routineEx.current = Math.floor(routineEx.current/5)*5;
            //otherwise, just use the orm, like in 5/3/1

            //i guess we should go throught the entire alphabet
            const ez = routine.info[ex.name + '-b'];
            if(ez){
                ez.current = orm/(1+ez.setInfo.sets[0]/30);
                ez.current = Math.floor(ez.current/5)*5;
            }

        }
        await this.setRoutine(routine);
        //this.setRoutine(routine).then();
    }


    //custom workout methods incoming


    // just put out a good json for posting to the feed
    //we need to use state.workout, it has more info
    //holy shit this is so complex


    //this is a big array of workouts
    saveWorkout = async workoutData => {
        //finally clear it
        await AsyncStorage.removeItem('@currentWorkout');
        AsyncStorage.getItem('@workouts', (_, result) => {
            let workouts = [];
            if(result !== null)
                workouts = JSON.parse(result);

            workouts.push(workoutData);
            AsyncStorage.setItem('@workouts', JSON.stringify(workouts));
        });
        //need to clear workout from state as well
        //and the report, it doesn't get cleared
        this.setState({report: null, workout: null});
    };


    render() {
        return (
            <ProgressContext.Provider value={{

                routine: this.state.routine,
                workout: this.state.workout,
                report: this.state.report,

                generateRoutine: this.generateRoutine,
                analyzeWorkout: this.analyzeWorkout,
                generateReport: this.generateReport,
                saveWorkout: this.saveWorkout,

                addExercise: this.addExercise,
                title: this.state.title,
                loaded: this.state.loaded,
                done: this.state.done,
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
