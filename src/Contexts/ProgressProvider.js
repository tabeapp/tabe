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
    addExercise = (name) => {
        this.setState(state => {
            let newState = {...state};

            const exercises = newState.workout.exercises;
            exercises.push({
                name: name,
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

    //we need to use state.workout, it has more info
    //holy shit this is so complex
    analyzeWorkout = async () => {
        const workout = {...this.state.workout};
        const report = {...this.state.report};

        //so what are we looking for
        //prs

        //finally, user info comes into play
        let userStats = await AsyncStorage.getItem('@userStats');
        if(userStats === null)
            userStats = {
                'bench': 0,
                'squat': 0,
                'deadlift': 0,
                'press': 0
            };
        else
            userStats = JSON.parse(userStats);

        //this is pretty cool, and will enable progress tracking
        const workoutMaxes = {};

        if(report.exercises){
            report.exercises.forEach(ex => {
                //or do we want to track accessory PRs???
                if(!(ex.name in userStats))
                    return;

                //calculate the largest 5rm for the day
                let fiveRM = -1;

                ex.work.forEach(info => {
                    //this has sets, weight, and reps
                    const repCount = info.reps > 10? 10 : info.reps

                    //just use the weight if there were 5 reps, otherwise formula
                    let calculated = repCount === 5?
                        info.weight :
                        6*(info.weight*(1+repCount/30))/7;

                    calculated = Math.floor(calculated);

                    if(calculated > fiveRM)
                        fiveRM = calculated;

                });

                //this would be a good place to detect PRs
                //maybe this should be ran before showing the summary...
                if(fiveRM > userStats[ex.name])
                    userStats[ex.name] = fiveRM;

                //would be a good idea to save 5rm to some list, use later for graph
                workoutMaxes[ex.name] = fiveRM;
            });
        }

        let statProgress = await AsyncStorage.getItem('@progress');
        if(statProgress === null)
            statProgress = [];
        else
            statProgress = JSON.parse(statProgress);

        statProgress.push({
            time: report.time,
            stats: workoutMaxes
        });
        AsyncStorage.setItem('@progress', JSON.stringify(statProgress));

        console.log(statProgress[statProgress.length-1]);
        AsyncStorage.setItem('@userStats', JSON.stringify(userStats));


        //also if you hit all the sets
        //update routine weights
        const newRoutine = {...this.state.routine};

        //check for progression
        if(workout.exercises) {
            workout.exercises.forEach(ex => {

                //ex has name, and array of sets
                //this is what we added
                const exInfo = newRoutine.info[ex.name];

                //this exercise doesn't progress
                if (!exInfo.progress)
                    return;

                //check if progress >= reps for every set
                //then you have completed it
                //maybe have some minimum for
                const passed = ex.sets.every(set => set.progress >= set.reps)

                //if you dont pass, you dont decremenent the counter
                if (passed) {
                    //progress every session
                    //i need to add a countdown
                    ////progress rate is a number, 7 or 28 nvm
                    //the problem is it that if there is a a break, it could be more than 7 days

                    //best idea: is to have progress rate as depending on how many times it's done
                    //this also handles the problem of "light" days, as they could have a separate countdown

                    //decrement teh counter
                    exInfo.progress.countdown--;
                    if (exInfo.progress.countdown === 0) {
                        //reset the counter
                        exInfo.progress.countdown = exInfo.progress.rate;
                        //the actual progression
                        exInfo.current += exInfo.progress.amount;
                    }
                }
            });


            //check the failures
            workout.exercises.forEach(ex => {
                //fail one, fail the exercise
                const failure = ex.sets.some(set => {
                    //I'll add this feature later, but metallica ppl has a minimum of 8 for some reps
                    //otherwise just use
                    if (set.minReps)
                        return set.progress < set.minReps;
                    else
                        return set.progress < set.reps;
                });

                if (failure) {

                    const exInfo = newRoutine.info[ex.name];
                    //this won't be initialized on routine creation
                    if (!exInfo.strikes)
                        exInfo.strikes = 0;
                    exInfo.strikes++;

                    //deload if you hit 3 strikes
                    //im maybe too lazy to add failure to all the routines
                    if (newRoutine.failure && exInfo.strikes >= newRoutine.failure.strikesToDeload) {
                        exInfo.strikes = 0;
                        exInfo.current *= newRoutine.failure.deload;
                    }
                    //add a strike for failure
                }

            });
        }

        //just look over this logic to make sure it's good

        //scan through the routine to find next workout
        let nextWorkoutTime = new Date();
        //not a rest day
        let daysToNext = 1;
        //scan through days to find next workout day
        //limit 14, just in case of errors
        while(!newRoutine.days[(newRoutine.currentDay+daysToNext)%newRoutine.time] && daysToNext < 14)
            daysToNext++;

        //temporarily set it to minutes to test it out
        /*nextWorkoutTime.setMinutes(nextWorkoutTime.getMinutes() + daysToNext);
        nextWorkoutTime.setSeconds(0);*/

        //we now know how many days until next workout
        nextWorkoutTime.setDate(nextWorkoutTime.getDate() + daysToNext);
        //set to midnight
        nextWorkoutTime.setHours(0);
        nextWorkoutTime.setMinutes(0);
        nextWorkoutTime.setSeconds(0);
        console.log('next workout: ' + nextWorkoutTime);
        //and save
        newRoutine.nextWorkoutTime = nextWorkoutTime.getTime();



        //increment day
        newRoutine.currentDay++;

        //and finally, save the thing
        //routiensDispatch(() => newROutine)
        //this.setRoutine(newRoutine)
        //this.setState({routine: newRoutine})
    };


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
