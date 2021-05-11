/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
const { emptyRegion, GLOBAL_REGION_ID } = require('./Constants/RegionConstants');

const { createRegion } = require('./graphql/mutations');
const { getRegion } = require('./graphql/queries');
const { createGym } = require('/opt/mutations');

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGFiZWNvIiwiYSI6ImNrb2o5b2Z2bTAzYnIydm5xaDBhN21xNHgifQ.vm0HWVRhrI5bClTNqvwLoA'

let graphqlClient;

//redoing this to simplify methods in gymmapscreen
//get coordinates, call mapbox, create regions if necessary, return gym name suggestion + region ids
//this will now handle actually adding gyms and regions instead of just a draft
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
    console.log(event.arguments);
    const {lat, lon} = event.arguments.coordinates;
    const {name} = event.arguments;

    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=poi&limit=3&access_token=${MAPBOX_ACCESS_TOKEN}`;
    let response = await fetch(geocodeURL);
    let obj = await response.json();

    const regionInfo = emptyRegion();
    if (obj.features.length === 0) {
        const geocodeCityURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=place&access_token=${MAPBOX_ACCESS_TOKEN}`;
        response = await fetch(geocodeCityURL);
        obj = await response.json();

        //the only thing is that we need to get the city info not from context
        if (obj.features.length !== 0)
            regionInfo.city = { id: obj.features[0].id, name: obj.features[0].text };
    }

    //derive name suggestion
    //nope not anymore

    //this is fine to keep
    let gymCenter = [lat, lon];

    if(obj.features.length !== 0){
        //this even works for planet fitness
        let gymSuggestion = obj.features.find(feat =>
            feat.properties.category &&
            feat.properties.category.includes('gym')
        );

        //if no gym is found, the user may be adding a home gym
        //dont use the center coordinates or text, let the user add something new
        if (gymSuggestion) {
            gymCenter = gymSuggestion.center;
        }

        //but for city and state and country, uuse gymSugestion or the first feature
        (gymSuggestion || obj.features[0]).context.forEach(area => {
            const { id, text } = area;
            if (id.startsWith('place.'))
                regionInfo.city = { id, name: text };
            else if (id.startsWith('region.'))
                regionInfo.state = { id, name: text };
            else if (id.startsWith('country.'))
                regionInfo.country = { id, name: text };
        });
    }

    //async create regions
    //it's a decent idea to create regions anywhere the user presses
    //but we'll do it async so no one notices the delay
    await addRegions(regionInfo);

    const createGymResult = await graphqlClient.mutate({
        mutation: gql(createGym),
        variables: {
            input: {
                name: name,
                location: { lat: gymCenter[0], lon: gymCenter[1] },
                countryID: regionInfo.country.id,
                stateID: regionInfo.state.id,
                cityID: regionInfo.city.id,
            }
        }
    });

    return createGymResult.data.createGym;
};

//to do it might save time to start from city and go up
//then quit once state or country exists
//cuz its more likely a country is added than a city
const addRegions = async (regionInfo) => {
    const regions = regionInfo;
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
        const result = await graphqlClient.query({
            query: gql(getRegion),
            fetchPolicy: 'network-only',
            variables: {
                id: id
            }
        })
        console.log(result);

        //if the country exists, assign its to the superregionid
        //otherwise make the country, then assign the id to the superregion id
        //but then again, we're using ids from mapbox so it doesn't matter if it exists or not

        //otherwise the region already exists, we're good to use the region id
        if(result.data.getRegion === null){
            const regionCreate = await graphqlClient.mutate({
                mutation: gql(createRegion),
                variables: {
                    input: {
                        id: id,
                        superRegionID: superRegionID,
                        name: name

                    }
                }
            })
            console.log(regionCreate);
        }
        //this might work
        superRegionID = id;
    }

    //keep this part in gymmapscreen until we're ready to make a gym
    /*//at this point we're good to use the region ids
    console.log(gymResult);
    */


};

