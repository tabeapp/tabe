const { createEffort } = require('../graphql/mutations');
const { checkEffortRankings } = require('./CheckEffortRankings');
const gql = require('graphql-tag');

exports.analyzeEffortsRecordsTrophies = async (graphqlClient, postID, efforts, userID, userLocation) => {
    //efforts isn't identical to what it is in saveEfforts
    console.log('analyzing efforts', efforts);
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

    //this isn't causing an error
    console.log(uploadedEfforts);
    await Promise.all(uploadedEfforts.map(async effort => {
        await checkEffortRankings(graphqlClient, effort, userLocation, userID, postID);
    }));

};
