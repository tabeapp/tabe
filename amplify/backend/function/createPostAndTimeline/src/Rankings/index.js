const { createEffort } = require('/opt/mutations');
const { checkEffortRankings } = require('./CheckEffortRankings');
const gql = require('graphql-tag');

exports.analyzeEffortsRecordsTrophies = async (graphqlClient, postID, efforts, userID, userLocation) => {
    //efforts isn't identical to what it is in saveEfforts
    console.log('analyzing efforts', efforts);
    if(Object.keys(efforts).length === 0)
        return;

    const uploadedEfforts = [];

    //hope this works lol
    await Promise.all(Object.entries(efforts).map(async ([exercise, effort]) => {
        const effortResult = await graphqlClient.mutate({
            mutation: gql(createEffort),
            variables: {
                input: {
                    exercise: exercise,
                    userID: userID,
                    postID: postID,
                    weight: effort.weight,
                    reps: effort.reps,
                    orm: effort.orm,
                }
            }
        });
        uploadedEfforts.push(effortResult.data.createEffort);
    }));

    //this isn't causing an error
    console.log(uploadedEfforts);
    await Promise.all(uploadedEfforts.map(async effort => {
        await checkEffortRankings(graphqlClient, effort, userLocation, userID, postID);
    }));

};
