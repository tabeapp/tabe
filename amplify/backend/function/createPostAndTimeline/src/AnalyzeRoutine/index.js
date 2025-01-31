const { getRoutine } = require('/opt/queries');
const { updateRoutine } = require('/opt/mutations');
const { analyzeWorkoutRoutine } = require('./AnalyzeWorkoutRoutine');
const gql = require('graphql-tag');

exports.analyzeRoutine = async (graphqlClient, workoutData, report, efforts) => {
    const getOldRoutineResult = await graphqlClient.query({
        query: gql(getRoutine),
        fetchPolicy: 'network-only',
        variables: {
            id: workoutData.routineID
        }
    });

    const oldRoutine = getOldRoutineResult.data.getRoutine;

    const routine = analyzeWorkoutRoutine(workoutData, report, efforts, oldRoutine.routine);

    if(routine)
        await graphqlClient.mutate({
            mutation: gql(updateRoutine),
            variables: {
                input:{
                    id: oldRoutine.id,
                    routine: JSON.stringify(routine)
                }
            }
        });

};
