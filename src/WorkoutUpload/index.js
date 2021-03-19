import {
    createEffort,
    createPost,
    createPostMedia,
    createTimeline,
    createTrophy, createUserRecord,
    updateRoutine, updateUserRecord,
} from '../../graphql/mutations';
import {
    getRoutine,
    getUserLocation, getUserRecord, listEffortsByExerciseAndUser,
    listFollowRelationships, listRecordsByExercise, listRecordsByExerciseAndCity, listRecordsByExerciseAndCountry,
    listRecordsByExerciseAndGym, listRecordsByExerciseAndState,
} from '../../graphql/queries';

import { generateReport } from '../Utils/GenerateReport';
import { REPS_TO_REPS, ROUND_5 } from '../Utils/UtilFunctions';
import { FAILURE, REST_DAY } from '../Constants/Symbols';
import { GLOBAL_REGION_ID } from '../Constants/RegionConstants';

const gql = require('graphql-tag');
const AWSAppSyncClient = require('aws-appsync').default;
global.fetch = require('node-fetch');

//what can we assume?
//the device passes in:
//list of urls
//title
//description
let graphqlClient;

export const upload = async (event, context, callback) => {

    let env;
    let graphql_auth;

    if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV.startsWith('AWS_Lambda_')) {
        //for cloud env
        env = process.env;
        graphql_auth = {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
                sessionToken: env.AWS_SESSION_TOKEN,
            }
        };
    } else {
        // for local mock
        env = {
            API_TABE_GRAPHQLAPIENDPOINTOUTPUT: 'http://192.168.1.2:20002/graphql',
            REGION: 'us-east-1',
        }
        graphql_auth = {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: 'mock',
                secretAccessKey: 'mock',
                sessionToken: 'mock',
            }
        };
    }

    if (!graphqlClient) {
        graphqlClient = new AWSAppSyncClient({
            //i think this is the problem
            url: env.API_TABE_GRAPHQLAPIENDPOINTOUTPUT,
            region: env.REGION,
            auth: graphql_auth,
            disableOffline: true,
        });
    }

    //update routine in here somewhere, don't forget
    //event.arguments.workoutData will be used

    const userID = event.identity.username;

    const workoutData = event.arguments.workoutData;

    //generate report is fine
    const report = generateReport(workoutData);

    //analyze workotu needs to be split into routine and effort functions
    const efforts = analyzeWorkoutEfforts(report);


    const getUserLocationResult = await graphqlClient.query({
        query: gql(getUserLocation),
        fetchPolicy: 'network-only',
        variables: {
            userID: userID
        }
    });

    const userLocation = getUserLocationResult.data.getUserLocation;

    const postInput = {
        mutuation: gql(createPost),
        variables: {
            input: {
                type: 'post',
                title: event.arguments.title,
                description: event.arguments.description,
                data: JSON.stringify(event.arguments.report.exercises),
                gymID: userLocation.gymID,
                userID: userID
            }
        }
    };

    const postRes = await graphqlClient.mutate(postInput);

    //this is the most important variable
    const postID = postRes.data.createPost.post.id;

    //we now split into 3 independent processing paths
    await Promise.all([
        () => analyzeRoutine(workoutData, report, efforts),
        () => createTimelines(postID, userID),
        () => uploadImages(postID, event.arguments.imageUrls),
        () => analyzeEffortsRecordsTrophies(postID, efforts, userID, userLocation),
    ]);

    return postID;
};

//--------------------------------------------
const analyzeRoutine = async (workoutData, report, efforts) => {
    const getOldRoutineResult = await graphqlClient.query({
        query: gql(getRoutine),
        fetchPolicy: 'network-only',
        variables: {
            routineID: workoutData.routineID
        }
    });

    const oldRoutine = getOldRoutineResult.data.getRoutine;

    const routine = analyzeWorkoutRoutine(workoutData, report, efforts, oldRoutine.routine);

    if(routine)
        await graphqlClient.mutate({
            mutation: gql(updateRoutine),
            fetchPolicy: 'network-only',
            variables: {
                input:{
                    id: oldRoutine.id,
                    routine: JSON.stringify(routine)
                }
            }
        });

};

const analyzeWorkoutEfforts = (report) => {
    const workoutMaxes = {};

    console.log(report);

    if(report.exercises){
        report.exercises.forEach(ex => {
            const name = ex.name.split('-')[0];

            let orm = -1;

            ex.work.forEach(info => {
                const calculatedOrm = REPS_TO_REPS(info.weight, info.reps, 1);

                if(calculatedOrm > orm)
                    workoutMaxes[name] = {
                        weight: info.weight,
                        reps: info.reps,
                        orm: calculatedOrm,
                    };
            });
        });
    }

    return workoutMaxes;
};

const analyzeWorkoutRoutine = (workout, report, efforts, routine) => {
    if(!routine)
        return null;

    const newRoutine = JSON.parse(routine);

    console.log(newRoutine);
    console.log(workout);

    workout.exercises.forEach(ex => {
        if(ex.name.includes('-Warmup'))
            return;

        const exInfo = newRoutine.info[ex.name];

        if (!exInfo.progress || exInfo.progress.amount === 0)
            return;

        const passed = ex.sets.every(set =>
            set.reps === FAILURE || set.progress >= set.reps
        );

        if (passed) {
            exInfo.progress.countdown--;
            if (exInfo.progress.countdown === 0) {
                exInfo.progress.countdown = exInfo.progress.rate;
                exInfo.current += exInfo.progress.amount;
            }
        }
    });

    report.exercises.forEach(ex => {
        const setInfo = newRoutine.info[ex.name].setInfo;
        if(setInfo.type !== 'Custom')
            return;

        setInfo.selector = (setInfo.selector+1)%newRoutine.customSets[setInfo.scheme].length;
    });

    Object.entries(efforts).forEach(([k,v]) => {
        if(k.includes('-Warmup'))
            return;

        const exInfo = newRoutine.info[k];
        if(exInfo.setInfo.type !== 'Custom')
            return;

        if(v > exInfo.current)
            exInfo.current = ROUND_5(v);//lol
    });

    workout.exercises.forEach(ex => {
        if(ex.name.includes('-Warmup'))
            return;

        const failure = ex.sets.some(set => {
            if(set.reps === FAILURE)
                return false;

            if (set.minReps)
                return set.progress < set.minReps;
            else
                return set.progress < set.reps;
        });

        if (failure) {

            const exInfo = newRoutine.info[ex.name];
            if (!exInfo.strikes)
                exInfo.strikes = 0;
            exInfo.strikes++;

            if (newRoutine.failure && exInfo.strikes >= newRoutine.failure.strikesToDeload) {
                exInfo.strikes = 0;
                exInfo.current *= newRoutine.failure.deload;
            }
        }

    });

    let nextWorkoutTime = new Date();
    let daysToNext = 1;
    while(newRoutine.days[(newRoutine.currentDay+daysToNext)%newRoutine.time] === REST_DAY && daysToNext < 14)
        daysToNext++;

    nextWorkoutTime.setDate(nextWorkoutTime.getDate() + daysToNext);
    nextWorkoutTime.setHours(0);
    nextWorkoutTime.setMinutes(0);
    nextWorkoutTime.setSeconds(0);
    console.log('next workout: ' + nextWorkoutTime);
    newRoutine.nextWorkoutTime = nextWorkoutTime.getTime();

    newRoutine.currentDay++;

    return newRoutine;
};


//--------------------------------------------

//this was in the old lambda as well
const createTimelines = async (postID, userID) => {
    const queryInput = {
        followeeID: userID,
        limit: 100000,
    };

    const listFollowRelationshipsResult = await graphqlClient.query({
        query: gql(listFollowRelationships),
        fetchPolicy: 'network-only',
        variables: queryInput,
    });

    const followers = listFollowRelationshipsResult.data.listFollowRelationships.items;

    if(!followers.some(follower => follower.followerID === userID )){
        followers.push({ followerID: userID });
    }

    //do we really need to await?
    await Promise.all(followers.map(follower =>
        createTimelineForAUser({
            follower: follower,
            postID: postID
        })
    ));

};

const createTimelineForAUser = async ({follower, postID}) => {
    const timelineInput = {
        mutation: gql(createTimeline),
        variables: {
            input: {
                userID: follower.followerID,
                postID: postID
            },
        },
    };
    await graphqlClient.mutate(timelineInput);
};

//--------------------------------------------
const uploadImages = async (postID, imageUrls) => {
    await Promise.all(imageUrls.map(async key => {
        const postMediaInput = {
            mutation: gql(createPostMedia),
            variables: {
                input: {
                    postID: postID,
                    uri: key
                }
            }
        };
        await graphqlClient.mutate(postMediaInput);
    }));
};

//--------------------------------------------
const analyzeEffortsRecordsTrophies = async (postID, efforts, userID, userLocation) => {
    //efforts isn't identical to what it is in saveEfforts
    if(Object.keys(efforts).length === 0)
        return;

    const uploadedEfforts = [];

    for(let i = 0; i < Object.keys(efforts).length; i++){
        const effort = efforts[i];
        const effortResult = await graphqlClient.mutate({
            mutation: gql(createEffort),
            variables: {
                input: {
                    exercise: Object.keys(efforts)[i],
                    userID: userID,
                    postID: postID,
                    weight: effort.weight,
                    reps: effort.reps,
                    orm: effort.orm,
                }
            }
        });
        uploadedEfforts.push(effortResult.data.createEffort);
    }

    await Promise.all(uploadedEfforts.map(async effort => {
        await checkEffortRankings(effort, userLocation, userID, postID);
    }));

};

const checkEffortRankings = async (effort, userLocation, userID, postID) => {

    const personal = await graphqlClient.query({
        query: gql(listEffortsByExerciseAndUser),
        fetchPolicy: 'network-only',
        variables: {
            userID: userID,
            exerciseOrm: {
                beginsWith: {
                    exercise: effort.exercise
                }
            },
            limit: 10,
            sortDirection: 'DESC'
        }
    });

    const personalRank = personal.data.listEffortsByExerciseAndUser
        .items.findIndex(ef => ef.id === effort.id);

    if (personalRank === -1)
        return;

    await graphqlClient.mutation({
        mutuation: gql(createTrophy),
        variables: {
            input: {
                effortID: effort.id,
                type: 'personal',
                targetID: userID,
                rank: personalRank
            }
        }
    });

    if (personalRank !== 0)
        return;

    const userRecordInput = {
        input: {
            userID: userID,
            exercise: effort.exercise,
            orm: effort.orm,
            postID: postID,
            gymID: userLocation.gymID,
            cityID: userLocation.gym.cityID,
            stateID: userLocation.gym.stateID,
            countryID: userLocation.gym.countryID
        }
    };

    const prExists = await graphqlClient.query({
        query: gql(getUserRecord),
        variables: {
            userID: userID,
            exercise: effort.exercise
        }
    });

    if (prExists.data.getUserRecord) {
        await graphqlClient.mutate({
            mutation: gql(updateUserRecord),
            variables: userRecordInput
        });

    } else {
        await graphqlClient.mutate({
            mutation: gql(createUserRecord),
            variables: userRecordInput
        });

    }

    const operations = [
        listRecordsByExerciseAndGym,
        listRecordsByExerciseAndCity,
        listRecordsByExerciseAndState,
        listRecordsByExerciseAndCountry,
        listRecordsByExercise
    ];
    const keys = ['gymID', 'cityID', 'stateID', 'countryID', null];
    const values = [userLocation.gymID, userLocation.gym.cityID, userLocation.gym.stateID, userLocation.gym.countryID, GLOBAL_REGION_ID];

    for (let n = 0; n < operations.length; n++) {
        const cont = checkRegionRanking(effort, postID, operations[n], keys[n], values[n], n === 0 ? 'gym': 'region')
        if(!cont)
            break;
    }
}

//we'll handle global in this too, dont worry
const checkRegionRanking = async (effort, postID, operation, key, value, type) => {
    const listInput = {
        limit: 10,
        sortDirection: 'DESC'
    };

    //global
    if(operation === listRecordsByExercise){
        listInput.exercise = effort.exercise;
    }
    else{
        listInput[key] = value;
        listInput.exerciseOrm = {
            beginsWith: {
                exercise: effort.exercise
            }
        };
    }

    const result = await graphqlClient.query({
        query: gql(operation),
        variables: listInput
    });

    const rank = result.data[Object.keys(result.data)[0]]
        .items.findIndex(re => re.postID === postID);

    if(rank === -1)
        return false;

    await graphqlClient.mutuation({
        mutation: createTrophy,
        variables: {
            input: {
                effortID: effort.id,
                type: type,
                targetID: value,
                rank: rank

            }
        }
    });

    return true;
};


