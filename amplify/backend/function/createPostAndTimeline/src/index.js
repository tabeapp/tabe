/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');


const { createPost } = require('./graphql/mutations');
const { getUserLocation } = require('./graphql/queries');

const { uploadImages } = require('./ImageUpload');
const { analyzeRoutine } = require('./AnalyzeRoutine');
const { generateReport } = require('./AnalyzeRoutine/GenerateReport');
const { analyzeWorkoutEfforts } = require('./AnalyzeRoutine/AnalyzeWorkoutEfforts');
const { createTimelines } = require('./CreateTimelines');
const { analyzeEffortsRecordsTrophies } = require('./Rankings');

let graphqlClient;

exports.handler = async (event, context, callback) => {

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

    const workoutData = JSON.parse(event.arguments.workoutData);


    console.log('workoutData', workoutData);
    //generate report is fine
    const report = generateReport(workoutData);

    console.log('report', report);

    //analyze workotu needs to be split into routine and effort functions
    const efforts = analyzeWorkoutEfforts(report);

    console.log('efforts', efforts);


    const getUserLocationResult = await graphqlClient.query({
        query: gql(getUserLocation),
        fetchPolicy: 'network-only',
        variables: {
            userID: userID
        }
    });

    const userLocation = getUserLocationResult.data.getUserLocation;

    const postInput = {
        mutation: gql(createPost),
        variables: {
            input: {
                type: 'post',
                title: event.arguments.title,
                description: event.arguments.description,
                data: JSON.stringify(report),
                gymID: userLocation.gymID,
                userID: userID
            }
        }
    };

    const postRes = await graphqlClient.mutate(postInput);

    //this is the most important variable
    const postID = postRes.data.createPost.id;

    //we now split into 4 independent processing paths
    console.log('analyzing routine');
    await analyzeRoutine(graphqlClient, workoutData, report, efforts);
    console.log('creating timelines');
    await createTimelines(graphqlClient, postID, userID);
    console.log('uplading images');
    await uploadImages(graphqlClient, postID, JSON.parse(event.arguments.imageUrls));
    console.log('analyzing efforts for records and trophies');
    await analyzeEffortsRecordsTrophies(graphqlClient, postID, efforts, userID, userLocation);
    console.log('done')

    return postRes.data.createPost;
};
