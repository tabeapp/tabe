import React, { useState, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FULL_COPY, ROUND_5 } from '../Utils/UtilFunctions';
import { RoutinesContext } from './RoutinesProvider';
import { CURRENT, FAILURE, NEW_PR, REST_DAY } from '../Constants/Symbols';
import { WARMUP_WEIGHTS } from '../Utils/WarmupCalc';

import { API, Auth, DataStore, graphqlOperation, Storage } from 'aws-amplify';
import { createPostAndTimeline, createPostMedia } from '../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { CurrentWorkout, Routine } from '../../models';
import { UserContext } from './UserProvider';
import { analyzeWorkout } from '../Utils/AnalyzeWorkout';

export const WorkoutContext = React.createContext();

//this needs to really be redone because routines was redone too
//the state is just gonna be a CurrentWorkout obj
const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //const [workoutId, setWorkoutId] = useState('');
    const [original, setOriginal] = useState({});

    const {username} = useContext(UserContext);
    //is this legal
    const {routines, updateRoutine, getCurrent} = useContext(RoutinesContext);

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

    const updateDataStore = async data => {
        const result = await DataStore.save(CurrentWorkout.copyOf(original, updated => {
            updated.data = JSON.stringify(data);
            updated.routineID = data.routineId || '';
        }));
        setOriginal(result);
        console.log(result);
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //guess it would make sense to save workout to disk every time, maybe YES
    //step 2, make sure any change in workout reducer also syncs to datastore
    //ok fuck it, workout reducer will only operate on the data part
    const workoutReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            const x = invariantCheck(action(next));
            updateDataStore(x);

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
        //this needs to happen a lot
        //if(action.type === 'setItem')
        //don't save editRoutine... or should we?
        const x = invariantCheck(next);

        updateDataStore(x);

        return x;
    };

    const [workout, workoutDispatch] = useReducer(workoutReducer, initState);

    //step 1 this use effect should be all set
    useEffect(() => {
        //kinda annoying but it wont work without the username
        if(!username)
            return;
        DataStore.query(CurrentWorkout, cw => cw.userID('eq', username))
            .then(res => {
                console.log('current workout', res);
                if(!res[0]){
                    /*need to make new one*/
                    DataStore.save(new CurrentWorkout({
                        userID: username,
                        data: JSON.stringify({}),
                        routineID: ''
                    }))
                        .then(setOriginal);
                }
                else{
                    setOriginal(res[0]);
                    workoutDispatch(() => JSON.parse(res[0].data));
                }
            });
    }, [username]);

    //heavy logic here, not much you can do with usereducer here
    //wonder if this could be a lambda function...
    //step 4, generating a workout
    const generateWorkout = () => {
        //comment this out to clear workout
        if(JSON.stringify(workout) !== '{}')
            return;

        const current = getCurrent();

        //i'd think you return and not let this happen
        if(!current){
            console.log('generating workout, current routine not found');
            generateCustom();
            return;
        }

        const routineId = current.id;
        const r = FULL_COPY(current.routine);

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

        //this looks fine
        updateRoutine(routineId, r);

        const workout = {
            title: r.title + ' ' + day,
            exercises: compiledExercises,
            edit: false,
            //very necessary for knowing which routine to progress
            //hmmmm maybe there should be a mutuable routineid in workout...
            routineId: routineId,
            //are these even necessary
            timer: 0,
            restStart: 0
        };
        workoutDispatch(() => workout);

        /*if(workoutId){
            DataStore.save(new CurrentWorkout({
                userID: username,
                data: JSON.stringify(workout),
                routineID: routineId
            }))
        }
        else{
            DataStore.query(CurrentWorkout, workoutId)
                .then(original => {
                    DataStore.save(CurrentWorkout.copyOf(original, updated => {
                        updated.data = JSON.stringify(workout);
                        updated.routineID = routineId;
                    }))
                })
        }*/
    };

    const generateCustom = () => {
        workoutDispatch(() => ({
            title: '',
            exercises: [],
            edit: true,
            routineId: '',
            //necessary?
            timer: 0,
            restStart: 0

        }));
    }

    //can't avoid doing this
    //step 3, right before workout
    const checkRest = () => {
        //if the current time is before the nextWorkout time, take a rest
        const now = new Date().getTime();
        //even if this isn't initialized, it should work as it just returns the current day
        const current = getCurrent();
        if(now < current.routine.nextWorkoutTime)
            return true;

        //if it's after, advance currentday until there's a workout
        //and return false
        const r = JSON.parse(current.routine);
        while(r.days[r.currentDay%r.time] === REST_DAY)
            r.currentDay++;

        updateRoutine(current.id, r);

        return false;
    };

    //this should be fine, but could be called generatepost
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
        //this seems to mess with graphQl?
        //report.time = new Date().getTime();//get current time;

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
    const finalizeWorkout = async report => {

        //this function needs cleanup, but this is basically how were gonna do it
        const current = routines.find(x => x.current === 1);
        const {routine} = await analyzeWorkout(report, workout, current);

        //and finally, save the thing
        updateRoutine(workout.routineId, routine);
        //routinesDispatch({
            //path: `routines.${workout.routine}`,
            //value: routine
        //});
    };

    //only here cuz of the async storage
    const quitWorkout = () => {
        workoutDispatch(() => ({}));
        AsyncStorage.removeItem('@workout');
    };

    const saveWorkout = async workoutData => {
        //finally clear it
        await AsyncStorage.removeItem('@workout');

        //make a post to aws db, this is the first i implemented
        //lets see if it works
        console.log(workoutData);
        const currentUser = await Auth.currentAuthenticatedUser();
        //await API.graphql(graphqlOperation(createPost, {input: workoutData}));


        //ugh, I guess this should call that labmda actually
        const res = await API.graphql(graphqlOperation(createPostAndTimeline, {
            title: workoutData.title,
            description: workoutData.description,
            data: workoutData.data,
        }));
        console.log('res: ' + JSON.stringify(res));
        /*await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'workout',
                title: workoutData.title,
                description: workoutData.description,
                data: workoutData.data,
                userID: currentUser.username,
            }
        }))*/
        //once we have res, we should be able to use its id to upload images
        //to s3
        //should this be in the labmda function?
        //get the post id for later linking
        const postID = res.data.createPostAndTimeline.id;
        //upload the images to s3


        const s3Urls = [];
        //there's a way to do this with await promise.all but its so fn complicated
        for(let i = 0; i < workoutData.media.length; i++){
            //suppose this could be a function of its own
            try{

                console.log('starting image fetch');
                const response = await fetch(workoutData.media[i]);
                console.log('fetched');
                const blob = await response.blob();
                console.log('blobbed');

                const urlParts = workoutData.media[i].split('.');
                const extension = urlParts[urlParts.length-1];
                const key = `${uuidv4()}.${extension}`;
                await Storage.put(key, blob);
                console.log('putted');
                s3Urls.push(key);
            }
            catch (e) {
                console.log(e);

            }
        }

        //now s3 urls are ready
        //lets save some postmedias
        s3Urls.forEach(key => {
            API.graphql(graphqlOperation(createPostMedia, {
                input: {
                    postID: postID,
                    uri: key
                }
            }));
        });

        //need to clear workout from state as well
        //and the report, it doesn't get cleared
        //does this not work?
        workoutDispatch(() => initState);
    };



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
            finalizeWorkout: finalizeWorkout,
            saveWorkout: saveWorkout
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
