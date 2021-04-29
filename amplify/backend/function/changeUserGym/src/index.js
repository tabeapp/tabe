/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { getUserLocation, listRecordsByUser, getUserStats } = require('/opt/queries');
const {
    createUserLocation,
    createUserRecord,
    deleteUserLocation,
    deleteUserRecord,
} = require('/opt/mutations');
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');

let graphqlClient;

exports.handler = async (event) => {
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

    const userID = event.identity.username;

    const selectedGym = event.identity.newGym;

    //this is // a lambda

    //get
    const userGym = await graphqlClient.query({
        query: gql(getUserLocation),
        variables: {
            userID: userID
        }
    });

    //delete
    if(userGym.data.getUserLocation){
        await graphqlClient.mutation({
            mutation: gql(deleteUserLocation),
            variables: {
                input: {
                    userID: userID,
                }
            }
        });
    }
    //create
    await graphqlClient.mutate({
        mutation: gql(createUserLocation),
        variables: {
            input: {
                userID: userID,
                gymID: selectedGym.id
            }
        }
    });

    //also need to set all user records to this location
    //i think you need to load, then delete and create because location is used as key

    const records = await graphqlClient.query({
        query: gql(listRecordsByUser),
        variables: {
            userID: userID
        }
    });

    const stats = await graphqlClient.query({
        query: gql(getUserStats),
        variables: {
            userID: userID
        }
    });

    //undefined is male, male is male, female is female
    const male = stats.getUserStats.male === undefined ? true: stats.getUserStats.male;

    for(let i = 0; i < records.data.listRecordsByUser.items.length; i++){
        const record = records.data.listRecordsByUser.items[i]

        await graphqlClient.mutate({
            mutation: gql(deleteUserRecord),
            variables: {
                input: {
                    userID: record.userID,
                    exercise: record.exercise
                }
            }
        });

        await graphqlClient.mutate({
            mutation: gql(createUserRecord),
            variables: {
                input: {
                    userID: record.userID,
                    exercise: record.exercise,
                    male: male,
                    orm: record.orm,
                    effortID: record.effortID,
                    gymID: selectedGym.id,
                    cityID: selectedGym.cityID,
                    stateID: selectedGym.stateID,
                    countryID: selectedGym.countryID,
                }
            }
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};
