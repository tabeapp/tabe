/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
// /OPT/ DOESN'T DO SHIT, FUCK THEM
const { listCurrentRoutinesByUser } = require('./graphql/queries');
const { updateRoutine } = require('./graphql/mutations');
const { generateWorkout } = require('./Utils/GenerateWorkout');

let graphqlClient;

exports.handler = async (event) => {
    let env;
    let graphql_auth;

    console.log('gen workout lamba invoked');

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

    console.log('graphql client created');

    const userID = event.identity.username;

    console.log('identity retrieved');

    let current = await graphqlClient.query({
        query: gql(listCurrentRoutinesByUser),
        variables: {
            userID: userID,
            limit: 1,
            sortDirection: 'DESC'
        }
    });

    console.log('graphql query done');

    console.log(current);

    if(current.data.listCurrentRoutinesByUser.items.length === 0){

        //save this to current workout
        const custom = {
            title: '',
            exercises: [],
            edit: true,
            routineID: '',
            timer: 0,
            restStart: 0
        };
        return custom;
    }

    current = current.data.listCurrentRoutinesByUser.items[0]

    //i'd think you return and not let this happen

    const routineID = current.id;
    const r = JSON.parse(current.routine);

    const {routine, workout} = await generateWorkout(r);

    //this looks fine
    await graphqlClient.mutate({
        mutation: gql(updateRoutine),
        variables: {
            input: {
                id: routineID,
                routine: JSON.stringify(routine)
            }
        }
    });

    //save this to workotu
    return { ...workout, routineID: routineID };
};
