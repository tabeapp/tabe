/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { GLOBAL_REGION_ID } from '../../../../../src/Constants/RegionConstants';
import { API, graphqlOperation } from 'aws-amplify';
import { getRegion } from '../../../../../graphql/queries';
import { createGym, createRegion } from '../../../../../graphql/mutations';

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');


const { createPost } = require('./graphql/mutations');
const { getUserLocation } = require('./graphql/queries');

let graphqlClient;

//redoing this to simplify methods in gymmapscreen
//get coordinates, call mapbox, create regions if necessary, return gym name suggestion + region ids
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

    //call mapbox api with coords
    //derive name suggestion
    //async create regions
    //retrun name + regionids

    return {
        name: 'potato gym',
        center: {
            lat: 42.0,
            lon: 69.0
        },
        countryID: 'no',
        stateID: 'no',
        cityID: 'no'
    };
};
/*
const addNewGym = async () => {
    const regions = newGym.regionInfo;
    console.log(regions);
    //newGym has everything we need
    //name, location, regionInfo
    //lets go through regionInfo and ensure regions exist
    //for(const level in ['country', 'state', 'city']
    const levels = ['country', 'state', 'city'];

    //start with earth, reassign id as you go
    //we dont even need to make an earth region, it's just a superregion
    let superRegionID = GLOBAL_REGION_ID;

    //for(const level in regions){
    for(let i = 0; i < levels.length; i++){
        const level = levels[i];
        const {id, name} = regions[level];
        console.log(id, name);
        //could we combine these into one graphql request?
        const result = await API.graphql(graphqlOperation(getRegion, {
            id: id
        }));
        console.log(result);

        //if the country exists, assign its to the superregionid
        //otherwise make the country, then assign the id to the superregion id
        //but then again, we're using ids from mapbox so it doesn't matter if it exists or not

        //otherwise the region already exists, we're good to use the region id
        if(result.data.getRegion === null){
            const regionCreate = await API.graphql(graphqlOperation(createRegion, {
                input: {
                    id: id,
                    superRegionID: superRegionID,
                    name: name
                }
            }));
            console.log(regionCreate);
        }
        //this might work
        superRegionID = id;
    }

    //at this point we're good to use the region ids
    const gymResult = await API.graphql(graphqlOperation(createGym, {
        input: {
            name: newGym.name,
            location: newGym.location,
            countryID: regions.country.id,
            stateID: regions.state.id,
            cityID: regions.city.id,
        }
    }));
    console.log(gymResult);

    dispatch({type: ADD_GYMS, gyms: [gymResult.data.createGym]});
    setNewGym(null);

};

*/
