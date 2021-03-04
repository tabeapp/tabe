import React, { useState, useContext, useEffect, useReducer } from 'react';
import { FULL_COPY, ROUND_5 } from '../Utils/UtilFunctions';
import { RoutinesContext } from './RoutinesProvider';
import { CURRENT, FAILURE, NEW_PR, REST_DAY } from '../Constants/Symbols';
import { WARMUP_WEIGHTS } from '../Utils/WarmupCalc';

import { API, Auth, DataStore, graphqlOperation, Storage } from 'aws-amplify';
import {
    createCurrentWorkout,
    createPostAndTimeline,
    createPostMedia,
    updateCurrentWorkout,
} from '../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { CurrentWorkout, Effort, Routine } from '../../models';
import { UserContext } from './UserProvider';
import { analyzeWorkout } from '../Utils/AnalyzeWorkout';
import { generateWorkout } from '../Utils/GenerateWorkout';
import { generateReport } from '../Utils/GenerateReport';
import { getCurrentWorkout, getUserLocation, listUserLocations } from '../../graphql/queries';

export const WorkoutContext = React.createContext();

//this needs to really be redone because routines was redone too
//the state is just gonna be a CurrentWorkout obj
const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //current workout id, suuper useful
    const [workoutId, setWorkoutId] = useState('');

    const {username} = useContext(UserContext);
    //is this legal
    const {routines, updateRoutineData, getCurrent} = useContext(RoutinesContext);

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
        API.graphql(graphqlOperation(updateCurrentWorkout, {
            input: {
                id:workoutId,
                data: JSON.stringify(data),
                routineID: data.routinesId || ''
            }
        }))
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

        updateDataStore(x);

        console.log(x);
        return x;
    };


    //step 1 this use effect should be all set
    useEffect(() => {
        //kinda annoying but it wont work without the username
        if(!username)
            return;
        API.graphql(graphqlOperation(getCurrentWorkout, {
            userID: username
        })).then(result => {
            if(!result.data.getCurrentWorkout){
                API.graphql(graphqlOperation(createCurrentWorkout, {
                    input: {
                        userID: username,
                        data: '{}',
                        routineID: ''
                    }
                })).then(newResult => {
                    //this is a fn guess
                    setWorkoutId(newResult.data.createCurrentWorkout.id);
                    //console.log('new current workout', newResult);
                })

            }
            else{
                //console.log('current workout load', result);
                setWorkoutId(result.data.getCurrentWorkout.id)
                workoutDispatch(() => JSON.parse(result.data.getCurrentWorkout.data));
            }
        })
    }, [username]);

    //heavy logic here, not much you can do with usereducer here
    //wonder if this could be a lambda function...
    //step 4, generating a workout
    const createWorkout = async () => {
        //comment this out to clear workout
        console.log('generating workout', JSON.stringify(data));
        //for some reason workout can now be undefined
        if(data && JSON.stringify(data) !== '{}')
            return;

        const current = getCurrent();

        //i'd think you return and not let this happen
        if(!current){
            console.log('generating workout, current routine not found');
            generateCustom();
            return;
        }

        const routineId = current.id;
        const r = JSON.parse(current.routine);

        const {routine, workout} = await generateWorkout(r);

        //this looks fine
        updateRoutineData(routineId, routine);

        console.log('generated workout', workout);
        //hmmmm maybe there should be a mutuable routineid in workout...
        workoutDispatch(() => ({...workout, routineId: routineId}));
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

    const createReport = () => {
        const { report } = generateReport(data);
        return report;
    };

    //this is the real meat and potatoes that handles this entire app
    //i guess put it here tomorrow, but you need to clear workout out of state & storage
    const finalizeWorkout = async (report, postID) => {

        //this function needs cleanup, but this is basically how were gonna do it
        const oldRoutine = routines.find(x => x.routineID === data.routineId).routine;
        const {routine, efforts} = await analyzeWorkout(report, data, oldRoutine);

        const res = await API.graphql(graphqlOperation(getUserLocation, {
            userID: username
        }));
        //res.data.getUserLocation.gymID, ....gym.countryId, cityID, stateID
        //is what you're lookign for
        const ul = res.data.getUserLocation;

        if(!ul){
            //allow the user to pick a location?
            //basically just load gym map screen
            //more on this later
        }

        //we're just gonna copy the countryid, cityid, stateid to the effort, tey're just strings

        //take the efforts and turn them into actual efforts, upload them
        const detailedEfforts = Object.keys(efforts).map(([name, info]) =>
            new Effort({
                ...info,
                exercise: name,
                userID: username,
                postID: postID,
                //countryID: ???,//need to get these from user, damn it
                countryID: ul.gym.countryID,
                stateID: ul.gym.stateID,
                cityID: ul.gym.cityID,
                gymID: ul.gymID
            })

        );
        //ensure this works

        //now how tf do you get rankings...
        detailedEfforts.forEach(effort => {

            //no
            DataStore.save(Effort, effort).then(res => console.log('effort saved', res));
        });

        //and finally, save the routine
        if(routine)
            updateRoutineData(data.routineId, routine);
    };

    //only here cuz of the async storage
    const quitWorkout = () => {
        workoutDispatch(() => ({}));
    };

    const saveWorkout = async (workoutData, report) => {
        //finally clear it

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

        //as it turns out, we really need this postID to build efforts
        //so here we are
        finalizeWorkout(report, postID);


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



    const [data, workoutDispatch] = useReducer(workoutReducer, initState);
    return (
        <WorkoutContext.Provider value={{
            //during
            workout: data,//dont like this but workout seems to break it
            workoutDispatch: workoutDispatch,
            quitWorkout:quitWorkout,

            //pre
            checkRest: checkRest,
            createWorkout: createWorkout,
            generateCustom: generateCustom,

            //after
            createReport: createReport,
            finalizeWorkout: finalizeWorkout,
            saveWorkout: saveWorkout
        }}>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutProvider;
