const { listRecordsByExercise } = require('../graphql/queries');
const { createTrophy } = require('../graphql/mutations');
const gql = require('graphql-tag');

exports.checkRegionRanking = async (graphqlClient, effort, postID, operation, key, value, type) => {
    const listInput = {
        limit: 10,
        sortDirection: 'DESC'
    };

    //global
    if(operation === listRecordsByExercise){
        listInput.exercise = effort.exercise;
    }
    else{
        listInput[key] = value;
        listInput.exerciseOrm = {
            beginsWith: {
                exercise: effort.exercise
            }
        };
    }

    const result = await graphqlClient.query({
        query: gql(operation),
        variables: listInput
    });

    const rank = result.data[Object.keys(result.data)[0]]
        .items.findIndex(re => re.postID === postID);

    if(rank === -1)
        return false;

    await graphqlClient.mutation({
        mutation: createTrophy,
        variables: {
            input: {
                effortID: effort.id,
                type: type,
                targetID: value,
                rank: rank

            }
        }
    });

    return true;
};


