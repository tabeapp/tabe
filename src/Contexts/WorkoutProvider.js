import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutContext from './WorkoutContext';
import { useReducer, useEffect, useContext }  from 'react';
import { FULL_COPY, ROUND_5 } from "../Utils/UtilFunctions";
import RoutinesContext from './RoutinesContext';
import { CURRENT, FAILURE, NEW_PR, REST_DAY } from "../Constants/Symbols";
import { Alert } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { WARMUP_WEIGHTS } from "../Utils/WarmupCalc";

const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //is this legal
    const {current, routines} = useContext(RoutinesContext).routines;
    const {routinesDispatch} = useContext(RoutinesContext);

    useEffect(() => {
        AsyncStorage.getItem('@workout').then(obj => {
            //do we need to call generateReport here?
            if(obj !== null)
                workoutDispatch(() => JSON.parse(obj));
        });
    }, []);

    //heavy logic here, not much you can do with usereducer here
    //wonder if this could be a lambda function...
    const generateWorkout = () => {
        //comment this out to clear workout
        if(JSON.stringify(workout) !== '{}')
            return;

        const r = FULL_COPY(routines[current]);

        console.log(r)
        let day = r.days[r.currentDay % r.time];

        while(day === REST_DAY){
            r.currentDay++;
            day = r.days[r.currentDay%r.time];
        }

        const exercises = r.workouts[day];

        //just be careful about copying objects
        const compiledExercises = [];
        exercises.forEach(name => {
            //wait til you hear about supersets
            if(name.includes('/'))
                return null;

            const exInfo = r.info[name];
            const setInfo = exInfo.setInfo;


            let sets = [];
            if(setInfo.type === 'Normal'){
                sets = setInfo.sets.map(reps => ({
                    reps: reps,
                    progress: null,
                    weight: exInfo.current
                }));
            }
            else if(setInfo.type === 'Custom'){
                //very complex, but it works
                //selector is missing, I wonder why though
                const custom = r.customSets[setInfo.scheme][setInfo.selector]

                sets = custom.map(set => {
                    let w;
                    if(set['%'] === NEW_PR)
                        //is this really the best place to store it?
                        //no
                        w = exInfo.current + 5;
                    else
                        w = ROUND_5(set['%'] / 100 * exInfo.current);

                    return {
                        reps: set.reps,
                        progress : null,
                        weight : w
                    };
                });

            }
            else if(setInfo.type === 'Sum'){
                //TODO
            }
            else if(setInfo.type === 'Timed'){
                //TODO
            }

            if(exInfo.amrap)
                sets[sets.length-1].amrap = true;

            //add a warmup as a separate exercise
            if(exInfo.warmup){
                //entirely based on first set weight
                let warmupSets = WARMUP_WEIGHTS(name, sets[0].weight);

                compiledExercises.push({
                    name: name + '-Warmup',
                    barbell: exInfo.barbell,
                    sets: warmupSets,
                    rest: 0//too much?
                });
            }

            compiledExercises.push({
                name: name,
                barbell: exInfo.barbell,
                sets: sets,
                rest: exInfo.rest
            });

            //return;

        });
        compiledExercises[0].sets[0].progress = CURRENT;

        //cuz we updated days
        routinesDispatch(prev => {
            prev.routines[prev.current] = r;
            return prev;
        });

        workoutDispatch(() => ({
            title: r.title + ' ' + day,
            exercises: compiledExercises,
            edit: false,
            //very necessary for knowing which routine to progress
            routine: r.title,
            //are these even necessary
            timer: 0,
            restStart: 0

        }));
    };

    const generateCustom = () => {
        workoutDispatch(() => ({
            title: '',
            exercises: [],
            edit: true,
            routine: '',
            //necessary?
            timer: 0,
            restStart: 0

        }));
    }

    //can't avoid doing this
    const checkRest = () => {
        //if the current time is before the nextWorkout time, take a rest
        const now = new Date().getTime();
        //even if this isn't initialized, it should work as it just returns the current day
        if(now < routines[current].nextWorkoutTime)
            return true;

        //if it's after, advance currentday until there's a workout
        //and return false
        const r = FULL_COPY(routines[current]);
        while(r.days[r.currentDay%r.time] === REST_DAY)
            r.currentDay++;

        routinesDispatch(prev => {
            prev.routines[prev.current] = r;
            return prev;
        });

        return false;
    };

    const generateReport = () => {
        //just default for the report
        if(!workout)
            return {
                title: '',
                summary: '',
                exercises: []
            };

        let report = {};
        report.title = workout.title;
        report.time = new Date().getTime();//get current time;

        //now that we have workout-warmup, this is parsing incorrectly
        report.exercises = workout.exercises.map(exercise => {
            if(exercise.name.includes('-Warmup'))
                return {work: []}

            let exReport = {
                name: exercise.name,
                work: []
            };

            //not sure when tf this would happen
            if(!exercise.sets[0])
                return {work:[]};

            //scan and compile into somethign like 2x3@150, 1x5@180
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
                s.reps && s.reps !== CURRENT
            )

            return exReport;
        });

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

        //this.setState({report: report});
        return report;
    };

    //this is the real meat and potatoes that handles this entire app
    //i guess put it here tomorrow, but you need to clear workout out of state & storage
    const analyzeWorkout = async report => {
        //console.log(report);

        ///----------------update user stats and get effort of workout ---------------
        //finally, user info comes into play
        let userStats = await AsyncStorage.getItem('@userStats');
        if(userStats === null)
            userStats = {
                'Bench': 0,
                'Squat': 0,
                'Deadlift': 0,
                'Press': 0
            };
        else
            userStats = JSON.parse(userStats);

        //this is pretty cool, and will enable progress tracking
        const workoutMaxes = {};

        if(report.exercises){
            report.exercises.forEach(ex => {
                const name = ex.name.split('-')[0];
                //or do we want to track accessory PRs???
                if(!(name in userStats))
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
                if(fiveRM > userStats[name])
                    userStats[name] = fiveRM;

                //would be a good idea to save 5rm to some list, use later for graph
                workoutMaxes[name] = fiveRM;
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

        //console.log(statProgress[statProgress.length-1]);
        AsyncStorage.setItem('@userStats', JSON.stringify(userStats));

        //----------------------------------------


        //-------------------Increment linear progression-----------
        //also if you hit all the sets
        //update routine weights
        //wait what if we just wing it

        //so instead of current, we need to somehow indicate the routine the workout is based on

        //the rest of this function involves progressing the routine
        //without a routine, just quit
        //maybe all this should go to routineprovider?
        if(workout.routine === '')
            return;

        const newRoutine = FULL_COPY(routines[workout.routine]);

        console.log(newRoutine);
        console.log(workout);

        //check for progression
        //this needs progress, so it uses workout
        workout.exercises.forEach(ex => {
            //dont progress warmup
            if(ex.name.includes('-Warmup'))
                return;

            //ex has name, and array of sets
            //this is what we added
            const exInfo = newRoutine.info[ex.name];

            //how the fuck would we increment 5/3/1
            // a progress rate of 4 is perfect for this
            //if(exInfo.setInfo.type === 'Custom')
                //return;
            //5/3/1 will progress here
            //texas method will progress by detecting 5rm

            //this exercise doesn't progress
            if (!exInfo.progress || exInfo.progress.amount === 0)
                return;

            //check if progress >= reps for every set
            //then you have completed it
            //maybe have some minimum for
            const passed = ex.sets.every(set =>
                set.reps === FAILURE || set.progress >= set.reps
            );

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
        //-----------------

        //-----------------increment cusotm cycles------
        //i don't know why this uses workout, not anymore
        report.exercises.forEach(ex => {
            const setInfo = newRoutine.info[ex.name].setInfo;
            if(setInfo.type !== 'Custom')
                return;

            //i know this seems complex but it just cycles through the cycles
            //the custom scheme is selected with customsets[scheme]
            //the length is used to mod the selector
            setInfo.selector = (setInfo.selector+1)%newRoutine.customSets[setInfo.scheme].length;
        });
        //-----------

        //-----------------see if PRs attempts worked---------
        Object.entries(workoutMaxes).forEach(([k,v]) => {
            if(k.includes('-Warmup'))
                return;

            const exInfo = newRoutine.info[k];
            //this only happens with cusomt sets, NEW_PR specifically
            if(exInfo.setInfo.type !== 'Custom')
                return;

            //essentially, go through the best calculated 5rm efforts
            //and go through the
            if(v > exInfo.current)
                exInfo.current = ROUND_5(v);//lol
        });
        //----------------------


        //------------------incrementn fialure countdowns-----------
        //check the failures
        //uses workout becuase this has progress info
        workout.exercises.forEach(ex => {
            //cant fail a warmup
            if(ex.name.includes('-Warmup'))
                return;

            //fail one, fail the exercise
            const failure = ex.sets.some(set => {
                //I'll add this feature later, but metallica ppl has a minimum of 8 for some reps
                //otherwise just use
                if(set.reps === FAILURE)
                    return false;

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
        //-------------------------



        //----------------figureout next workout time
        //just look over this logic to make sure it's good

        //scan through the routine to find next workout
        let nextWorkoutTime = new Date();
        //not a rest day
        //this isn't caluclting correctly
        let daysToNext = 1;
        //scan through days to find next workout day
        //limit 14, just in case of errors
        while(newRoutine.days[(newRoutine.currentDay+daysToNext)%newRoutine.time] === REST_DAY && daysToNext < 14)
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
        routinesDispatch({
            path: `routines.${workout.routine}`,
            value: newRoutine
        });
    };

    //only here cuz of the async storage
    const quitWorkout = () => {
        workoutDispatch(() => ({}));
        AsyncStorage.removeItem('@workout');
    };

    const saveWorkout = async workoutData => {
        //finally clear it
        await AsyncStorage.removeItem('@workout');
        AsyncStorage.getItem('@workouts', (_, result) => {
            let workouts = [];
            if(result !== null)
                workouts = JSON.parse(result);

            workouts.push(workoutData);
            AsyncStorage.setItem('@workouts', JSON.stringify(workouts));
        });
        //need to clear workout from state as well
        //and the report, it doesn't get cleared
        //does this not work?
        workoutDispatch(() => initState);
    };

    //i guess like use effect?
    //this same logic shows up over and over again in the old code
    //just make sure the next set is marked as 'c', that simple
    //this seems to work, just make sure adding workouts doesn't mess with this
    const invariantCheck = next => {
        if(!next || !next.exercises)
            return next;

        let found = false;

        for(let e = 0; e < next.exercises.length; e++){
            const ex = next.exercises[e];
            for(let s = 0; s < ex.sets.length; s++){
                const set = ex.sets[s];
                if(set.progress === CURRENT)
                    found = true;
                else if(set.progress === null && !found){
                    set.progress = CURRENT;
                    found = true;
                }
                else if(set.progress === CURRENT && found)
                    set.progress = null;
            }
        }

        next.done = !found

        return next;
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //guess it would make sense to save workout to disk every time, maybe YES
    const workoutReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            const x = invariantCheck(action(next));
            AsyncStorage.setItem('@workout', JSON.stringify(x))
                .then(() => {})
                .catch(e => console.log(e));
            //AsyncStorage.setItem('@workout', JSON.stringify( x )).catch(e => {
            //console.log(e);
            //});
            return x;
        }

        //otherwise
        //drill into state programmatically
        //action.path //'editroutine.title']
        //action.value///startingstrength
        //or you can do action = ['editroutine.title', 'startingstrength']
        if(action.path || action.length === 2){
            let path, value;
            if(action.path) {
                path = action.path.split('.');
                value = action.value;
            } else {
                path = action[0].split('.');
                value = action[1];
            }

            let target = next;
            //stop right before last
            for(let i = 0; i < path.length-1; i++){
                const p = path[i];
                if(!(p in target)){
                    //words. needs this cuz the splitter will split like 'set', '0'
                    if(isNaN(p))
                        target[p] = {};
                    else
                        target[p] = [];
                }
                target = target[p];
            }
            //and finally set it
            target[path[path.length-1]] = value;
        }

        //i guess we could store some logic here
        //if(action.type){
        //this needs to happen a lot
        //if(action.type === 'setItem')
        //don't save editRoutine... or should we?
        const x = invariantCheck(next);
        //AsyncStorage.setItem('@workout', JSON.stringify( x ));
        AsyncStorage.setItem('@workout', JSON.stringify(x))
            .then(() => {})
            .catch(e => console.log(e));
        //}

        return x;
    };

    const [workout, workoutDispatch] = useReducer(workoutReducer, initState);

    return (
        <WorkoutContext.Provider value={{
            //during
            workout: workout,
            workoutDispatch: workoutDispatch,
            quitWorkout:quitWorkout,

            //pre
            checkRest: checkRest,
            generateWorkout: generateWorkout,
            generateCustom: generateCustom,

            //after
            generateReport: generateReport,
            analyzeWorkout: analyzeWorkout,
            saveWorkout: saveWorkout
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
