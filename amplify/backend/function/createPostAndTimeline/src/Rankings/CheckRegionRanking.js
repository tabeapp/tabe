const { listRecordsByExercise } = require('../graphql/queries');
const { createTrophy } = require('../graphql/mutations');
const gql = require('graphql-tag');

exports.checkRegionRanking = async (graphqlClient, effort, postID, key, value, name, type) => {
    //new wild idea: just use filters instead of 5 different fucking queries
    //will this work? who knows
    const listInput = {
        limit: 10,
        sortDirection: 'DESC',
        exercise: effort.exercise
    };


    //not global
    if(key !== null){
        listInput.filter = {
            [key]: {
                eq: value
            }
        };
    }

    const result = await graphqlClient.query({
        query: gql(listRecordsByExercise),
        variables: listInput
    });

    const rank = result.data.listRecordsByExercise
        .items.findIndex(re => re.postID === postID);

    console.log('region rank', rank, value);
    console.log('region items', result.data.listRecordsByExercise.items);

    if(rank === -1)
        return false;

    await graphqlClient.mutate({
        mutation: gql(createTrophy),
        variables: {
            input: {
                effortID: effort.id,
                type: type,
                name: name,
                targetID: value,
                rank: rank

            }
        }
    });

    return true;
};


