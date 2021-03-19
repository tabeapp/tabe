import { createEffort } from '../graphql/mutations';
import { checkEffortRankings } from './CheckEffortRankings';
const gql = require('graphql-tag');

export const analyzeEffortsRecordsTrophies = async (graphqlClient, postID, efforts, userID, userLocation) => {
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
        await checkEffortRankings(graphqlClient, effort, userLocation, userID, postID);
    }));

};
