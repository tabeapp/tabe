const {
    getUserRecord,
    listEffortsByExerciseAndUser, listRecordsByExercise,
    listRecordsByExerciseAndCity, listRecordsByExerciseAndCountry,
    listRecordsByExerciseAndGym, listRecordsByExerciseAndState,
} = require('../graphql/queries');
const { createTrophy, createUserRecord, updateUserRecord } = require('../graphql/mutations');
const { GLOBAL_REGION_ID } = require('../Constants/RegionConstants');
const { checkRegionRanking } = require('./CheckRegionRanking');
const gql = require('graphql-tag');

exports.checkEffortRankings = async (graphqlClient, effort, userLocation, userID, postID) => {

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

    console.log(personalRank);

    if (personalRank === -1)
        return;

    await graphqlClient.mutate({
        mutation: gql(createTrophy),
        variables: {
            input: {
                effortID: effort.id,
                type: 'personal',
                name: userID,
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
    const names = [userLocation.gym.name, userLocation.gym.city.name, userLocation.gym.state.name, userLocation.gym.country.name, GLOBAL_REGION_ID];
    console.log(keys);
    console.log(values);

    for (let n = 0; n < operations.length; n++) {
        const cont = await checkRegionRanking(graphqlClient, effort, postID, operations[n], keys[n], values[n], names[n], n === 0 ? 'gym': 'region')
        if(!cont)
            break;
    }
};

