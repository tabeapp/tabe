const { listRecordsByExercise } = require('../graphql/queries');
const { createTrophy } = require('../graphql/mutations');
const gql = require('graphql-tag');

exports.checkRegionRanking = async (graphqlClient, effort, postID, operation, key, value, name, type) => {
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

    console.log('region rank', rank, value);
    console.log('region items', result.data[Object.keys(result.data)[0]].items);

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


