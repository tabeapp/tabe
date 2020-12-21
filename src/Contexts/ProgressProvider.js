import React from 'react';
import {AppState} from 'react-native';
import ProgressContext from './ProgressContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    //funny enough, this doesn't actually handle 'reload js'
    handleAppStateChange = nextAppState => {
        if(nextAppState === 'inactive' || nextAppState === 'background') {
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


    //fuck this, we're just gonna use the "next workout date"

    checkRest = () => {
        //easy
        //if the current time is before the nextWorkout time, take a rest
        const now = new Date().getTime();
        //even if this isn't initialized, it should work as it just returns the current day
        if(now < this.state.routine.nextWorkoutTime)
            return true;

        //if it's after, advance currentday until there's a workout
        //and return false
        const ro = {...this.state.routine};
        while(!ro.days[ro.currentDay%ro.time]){
            ro.currentDay++;

        }
        this.setRoutine(ro);
        //this.setState({routine: ro});

        return false;
    }

    generateRoutine = async (baseRoutine, efforts) => {
        const routine = {...baseRoutine};
        routine.currentDay = 0;
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

    //i think we need to call this in a few other places, routine isn't being saved to local store
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

        console.log(ro.currentDay);
        let day = ro.days[ro.currentDay % ro.time];
        //here's the deal.
        //calling initworkout means get the next workout, even if it's a rest day
        //so we need to advance time to the next workout
        //of course this means we also have to save routine

        //null means rest day
        //if(!day)
            //return [];

        while(day === 'R'){
            console.log(day);

            ro.currentDay++;
            day = ro.days[ro.currentDay % ro.time];
        }
        console.log(day);


        //this gets ['ohp', 'dip', 'chinup']
        let exercises = ro.workouts[day];

        let compiledExercises = [];

        for(let i = 0; i < exercises.length; i++){
            let name = exercises[i];

            const exInfo = ro.info[name];
            const setInfo = exInfo.setInfo;

            //the complex part
            let sets = [];
            console.log(setInfo);
            if(setInfo.type === 'Normal'){
                sets = setInfo.sets.map(reps => ({
                    reps: reps,
                    progress: null,
                    weight: exInfo.current
                }))
            }
            else if(setInfo.type === 'Custom') {
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
            //wait till I tell you about sum and timed

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
        //there's a prob here, somethings' undefined
        console.log(JSON.stringify(compiledExercises));
        compiledExercises[0].sets[0].progress = 'c';

        const workout = {
            title: ro.title + ' ' + day,
            exercises: compiledExercises
        };

        //the current day might've been advanced, so save ro to routine
        AsyncStorage.setItem('@currentRoutine', JSON.stringify(ro));
        this.setState({routine: ro, workout: workout, loaded: true});
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
                        //AsyncStorage.removeItem('@currentWorkout');
                    }
                    else
                        exercises[exerciseN + 1].sets[0].progress = 'c';
                }
                else
                    exercises[exerciseN].sets[setN+1].progress = 'c';
            }

            //should we do this to sync with server?
            //definitely the watch
            //AsyncStorage.setItem('@currentWorkout', JSON.stringify(newState.workout));
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
        this.setRoutine(newRoutine)
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

    //yes this will ideally load from server
    getPosts = async () => {
        const val = await AsyncStorage.getItem('@workouts');
        if(val === null)
            return [];
        return JSON.parse(val);
    }

    render() {
        return (
            <ProgressContext.Provider value={{

                routine: this.state.routine,
                workout: this.state.workout,
                report: this.state.report,

                generateRoutine: this.generateRoutine,
                checkRoutine: this.checkRoutine,
                checkRest: this.checkRest,
                setRoutine: this.setRoutine,
                initializeWorkout: this.initializeWorkout,
                updateSet: this.updateSet,
                analyzeWorkout: this.analyzeWorkout,
                generateReport: this.generateReport,
                saveWorkout: this.saveWorkout,
                getPosts: this.getPosts,

                initializeCustom: this.initializeCustom,
                addExercise: this.addExercise,
                updateExercise: this.updateExercise,
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
