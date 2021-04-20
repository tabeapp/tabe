import React, { useContext, useEffect, useReducer } from 'react';
import { FULL_COPY } from '../Utils/UtilFunctions';
import { RoutinesContext } from './RoutinesProvider';
import { CURRENT, REST_DAY } from '../Constants/Symbols';

import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createPostAndTimeline, generateWorkout } from '../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserProvider';

export const WorkoutContext = React.createContext();

//this needs to really be redone because routines was redone too
//the state is just gonna be a CurrentWorkout obj
const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //current workout id, suuper useful
    //dont even need this, username shoudl be good

    const {username} = useContext(UserContext);
    //is this legal
    const {updateRoutineData, getCurrent} = useContext(RoutinesContext);

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

        next.done = !found;

        return next;
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //guess it would make sense to save workout to disk every time, maybe YES
    //step 2, make sure any change in workout reducer also syncs to server
    //ok fuck it, workout reducer will only operate on the data part
    const workoutReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            const x = invariantCheck(action(next));
            console.log(x);

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

        console.log(x);
        return x;
    };


    //async storage instead
    useEffect(() => { }, []);

    //heavy logic here, not much you can do with usereducer here
    //wonder if this could be a lambda function...
    //step 4, generating a workout
    //make this a lamba just because we'll be calling it from apple watch one day
    const createWorkout = async () => {
        //this is fine to keep, solid check
        if(data && JSON.stringify(data) !== '{}')
            return;


        //just await lamda and  go
        //add a subscription to current workout
        const wo = await API.graphql(graphqlOperation(generateWorkout));
        console.log(wo);
        workoutDispatch(() => JSON.parse(wo.data.generateWorkout));
    };

    const generateCustom = () => {
        workoutDispatch(() => ({
            title: '',
            exercises: [],
            edit: true,
            routineID: '',
            timer: 0,
            restStart: 0

        }));
    };

    //can't avoid doing this
    //jeez, it's almost as if this is more relevant to the routine and yhou should put it there TODO
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

        updateRoutineData(current.id, r);

        return false;
    };

    //only here cuz of the async storage
    const quitWorkout = () => {
        workoutDispatch(() => ({}));
    };

    const saveWorkout = async (workoutData) => {

        //get the urls ready in this way, then send them to teh
        // lambda then upload them whenever
        const s3Urls = [];
        for(let i = 0; i < workoutData.media.length; i++){
            const urlParts = workoutData.media[i].split('.');
            const extension = urlParts[urlParts.length-1];
            const key = `${uuidv4()}.${extension}`;
            s3Urls.push(key);
        }

        //there's the slightest slightest chance this works
        //todo start here next time
        const res = await API.graphql(graphqlOperation(createPostAndTimeline, {

            title: workoutData.title,
            description: workoutData.description,
            workoutData: JSON.stringify(data),
            imageUrls: JSON.stringify(s3Urls)

            //gymID: gymID
        }));

        console.log('lambda done, ', res);

        workoutDispatch(() => initState);


        //upoad
        for(let i = 0; i < workoutData.media.length; i++){
            try{
                const response = await fetch(workoutData.media[i]);
                const blob = await response.blob();
                await Storage.put(s3Urls[i], blob);
            }
            catch(e){}

        }

    };

    const pressNext = () => {



        for(let e = 0; e < data.exercises.length; e++) {
            const ex = data.exercises[e];
            for (let s = 0; s < ex.sets.length; s++) {
                const set = ex.sets[s];
                if (set.progress === CURRENT) {

                    workoutDispatch(prev => {
                        prev.exercises[e].sets[s].progress = prev.exercises[e].sets[s].reps;
                        prev.timer = new Date().getTime() + prev.exercises[e].rest*1000;
                        prev.restStart = new Date().getTime();
                        return prev;
                    });
                    return;
                }
            }
        }
    };


    const [data, workoutDispatch] = useReducer(workoutReducer, initState);
    return (
        <WorkoutContext.Provider value={{
            //during
            workout: data,//dont like this but workout seems to break it
            workoutDispatch: workoutDispatch,
            pressNext: pressNext,
            quitWorkout:quitWorkout,

            //pre
            checkRest: checkRest,
            createWorkout: createWorkout,
            generateCustom: generateCustom,

            //after
            saveWorkout: saveWorkout
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutProvider;
