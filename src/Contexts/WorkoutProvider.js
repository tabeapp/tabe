import React, { useContext, useEffect, useReducer } from 'react';
import { FULL_COPY } from '../Utils/UtilFunctions';
import { RoutinesContext } from './RoutinesProvider';
import { CURRENT, REST_DAY } from '../Constants/Symbols';

import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
    createCurrentWorkout, createEffort,
    createPostAndTimeline,
    createPostMedia, createTrophy,
    updateCurrentWorkout,
    createUserRecord,
    updateUserRecord
} from '../../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import { Effort } from '../../models';
import { UserContext } from './UserProvider';
import { analyzeWorkout } from '../Utils/AnalyzeWorkout';
import { generateWorkout } from '../Utils/GenerateWorkout';
import { generateReport } from '../Utils/GenerateReport';
import {
    getCurrentWorkout,
    getUserLocation,
    listEffortsByExerciseAndUser,
    getUserRecord,
    listRecordsByExerciseAndGym,
    listRecordsByExerciseAndCity,
    listRecordsByExerciseAndState,
    listRecordsByExerciseAndCountry, listRecordsByExercise,
} from '../../graphql/queries';
import { emptyRegion, GLOBAL_REGION_ID } from '../Constants/RegionConstants';

export const WorkoutContext = React.createContext();

//this needs to really be redone because routines was redone too
//the state is just gonna be a CurrentWorkout obj
const WorkoutProvider = props => {
    //this is just gonna be the workout, no editRoutine bs this tim
    const initState = {};

    //current workout id, suuper useful
    //dont even need this, username shoudl be good
    //const [workoutId, setWorkoutId] = useState('');

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

        next.done = !found;

        return next;
    };

    const syncCurrentWorkout = async data => {
        API.graphql(graphqlOperation(updateCurrentWorkout, {
            input: {
                userID: username,
                data: JSON.stringify(data),
                routineID: data.routinesId || ''
            }
        }));
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
            syncCurrentWorkout(x);
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

        syncCurrentWorkout(x);

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
                }));

            }
            else{
                console.log('current workout load', result);
                //setWorkoutId(result.data.getCurrentWorkout.id)
                workoutDispatch(() => JSON.parse(result.data.getCurrentWorkout.data));
            }
        });
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

    const createReport = () => {
        const { report } = generateReport(data);
        return report;
    };

    //this is the real meat and potatoes that handles this entire app
    //i guess put it here tomorrow, but you need to clear workout out of state & storage
    const finalizeWorkout = async (report, postID) => {

        //this function needs cleanup, but this is basically how were gonna do it
        const oldRoutine = routines.find(r => r.id === data.routineId).routine;
        const { routine, efforts } = analyzeWorkout(report, data, oldRoutine);


        //we're just gonna copy the countryid, cityid, stateid to the effort, tey're just strings

        //take the efforts and turn them into actual efforts, upload them
        //console.log('sample effort', efforts[Object.keys(efforts)]);
        const detailedEfforts = Object.entries(efforts).map(([name, info]) =>
            new Effort({
                ...info,
                exercise: name,
                userID: username,
                postID: postID,
            })
        );
        //ensure this works

        //and finally, save the routine
        if (routine)
            updateRoutineData(data.routineId, routine);

        workoutDispatch(() => initState);
        saveEfforts(detailedEfforts);
    }

    const saveEfforts = async efforts => {
        if(efforts.length === 0)
            return;

        //this is a whole other function smh


        const uploadedEfforts = [];
        //we need to wait for all the efforts to upload
        //this or something similar to a map and a promise.all might also work
        for(let i = 0; i < efforts.length; i++){
            const effort = efforts[i];
            console.log('effort', effort);
            const result = await API.graphql(graphqlOperation(createEffort, {
                input:{
                    ...effort//will this work? no
                }
            }));
            console.log('create effort result', result);
            uploadedEfforts.push(result.data.createEffort);
        }

        const ulRes = await API.graphql(graphqlOperation(getUserLocation, {
            userID: username
        }));
        const ul = ulRes.data.getUserLocation;

        //now how tf do you get rankings...
        //at this point we can search for prs
        //kinda obvious, but there are 6 levels of PRing
        //personal, gym, city, state, country, and world
        //if you don't pr in any of these, you don't pr in the following either
        //these are 6 calls max
        //honestly should be a fn lambda

        //this is so fucking ugly, is there a better way?
        //maybe a single graphql query to check all of these?
        //would only be 60 items back tops
        const operations = [
            listRecordsByExerciseAndGym,
            listRecordsByExerciseAndCity,
            listRecordsByExerciseAndState,
            listRecordsByExerciseAndCountry,
        ];
        const keys = ['gymID', 'cityID', 'stateID', 'countryID'];
        const values = [ul.gymID, ul.gym.cityID, ul.gym.stateID, ul.gym.country];


        //fuck me, is this really ideal?
        for(let i = 0; i < uploadedEfforts.length; i++) {
            const effort = uploadedEfforts[i];

            const personal = await API.graphql(graphqlOperation(listEffortsByExerciseAndUser, {
                userID: username,
                exerciseWeight: {
                    beginsWith: {
                        exercise: effort.exercise
                    }
                },
                limit: 10,
                sortDirection: 'DESC'
            }));
            const personalRank = personal.data.listEffortsByExerciseAndUser
                .items.findIndex(ef => ef.id === effort.id);

            //todo rewrite this wholw fucking thing
            if(personalRank === -1)
                continue;

            console.log(`effort of ${effort.exercise} at ${effort.orm} orm ranked ${personalRank+1} for user ${username}`);
            await API.graphql(graphqlOperation(createTrophy, {
                input: {
                    effortID: effort.id,
                    type: 'personal',
                    targetID: username,
                    rank: personalRank
                }
            }));

            if(personalRank !== 0)
                continue;

            //new pr, save that shit
            const input = {
                userID: username,
                exercise: effort.exercise,
                effortID: effort.id,
                orm: effort.orm,
                //copy location info from user
                gymID: efforts[0].gymID,
                cityID: efforts[0].cityID,
                stateID: efforts[0].stateID,
                countryID: efforts[0].countryID
            };

            //its bs that I have to check if it exists before hand
            const prExists = await API.graphql(graphqlOperation(getUserRecord, {
                userID: username,
                exercise: effort.exercise,
            }));
            if(!prExists.data.getUserRecord)
                API.graphql(graphqlOperation(createUserRecord, {
                    input: input
                }));
            else
                API.graphql(graphqlOperation(updateUserRecord, {
                    input: input
                }));


            //should trophies link to efforts or post?

            for(let n = 0; n < operations.length; n++){
                console.log('checking for exercise from', effort);

                const result = await API.graphql(graphqlOperation(operations[n], {
                    [keys[n]]: values[n],
                    exerciseWeight: {
                        beginsWith: {
                            exercise: effort.exercise
                        }
                    },
                    limit: 10,
                    sortDirection: 'DESC'
                }));
                console.log('check rank result', result);

                //this is so fucking complex
                //effort doesn't have an id, the effort object is from before uploading to aws
                //you have to get the effort ids
                //there should only be one thing under data, just get that instead of what evah
                const rank = result.data[Object.keys(result.data)[0]]
                    .items.findIndex(re => re.effortID === effort.id);

                //not a pr on this level, fuck it
                //check personal and gym followed by the rest
                if(rank === -1)
                    break;
                else{
                    //just gonna log it for now, idc
                    //eventually add an award like how strava does
                    console.log(`effort of ${effort.exercise} at ${effort.orm} orm ranked ${rank+1} in ${values[n]}`)
                    await API.graphql(graphqlOperation(createTrophy, {
                        input: {
                            effortID: effort.id,
                            type: n === 0 ? 'gym' : 'region',
                            targetID: values[n],
                            rank: rank
                        }
                    }))
                }
            }

            //can't avoid doing a global search I suppose
            const global = await API.graphql(graphqlOperation(listRecordsByExercise, {
                exercise: effort.exercise,
                limit: 10,
                sortDirection: 'DESC'
            }));
            const globalRank = global.data.listRecordsByExercise.items
                .findIndex(re => re.effortID === effort.id);

            if(globalRank === -1)
                continue;


            console.log(`effort of ${effort.exercise} at ${effort.orm} orm ranked ${globalRank+1} in the world`);
            await API.graphql(graphqlOperation(createTrophy, {
                input: {
                    effortID: effort.id,
                    type: 'region',
                    targetID: GLOBAL_REGION_ID,
                    rank: globalRank
                }
            }))
        }
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
        //await API.graphql(graphqlOperation(createPost, {input: workoutData}));

        const ulRes = await API.graphql(graphqlOperation(getUserLocation, {
            userID: username
        }));

        //ugh, I guess this should call that labmda actually
        //this isn't working start from here next time...
        const res = await API.graphql(graphqlOperation(createPostAndTimeline, {
            title: workoutData.title,
            description: workoutData.description,
            data: workoutData.data,
            gymID: ulRes.data.getUserLocation.gymID || 'emptyGym'//this feels really dumb, like the gym shoudl be set in the lambda
        }));
        console.log('res: ' + JSON.stringify(res));
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
};

export default WorkoutProvider;
