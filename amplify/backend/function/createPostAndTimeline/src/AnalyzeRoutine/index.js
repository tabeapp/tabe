import { getRoutine } from '../graphql/queries';
import { updateRoutine } from '../graphql/mutations';
import { analyzeWorkoutRoutine } from './AnalyzeWorkoutRoutine';
const gql = require('graphql-tag');

export const analyzeRoutine = async (graphqlClient, workoutData, report, efforts) => {
    const getOldRoutineResult = await graphqlClient.query({
        query: gql(getRoutine),
        fetchPolicy: 'network-only',
        variables: {
            routineID: workoutData.routineID
        }
    });

    const oldRoutine = getOldRoutineResult.data.getRoutine;

    const routine = analyzeWorkoutRoutine(workoutData, report, efforts, oldRoutine.routine);

    if(routine)
        await graphqlClient.mutate({
            mutation: gql(updateRoutine),
            fetchPolicy: 'network-only',
            variables: {
                input:{
                    id: oldRoutine.id,
                    routine: JSON.stringify(routine)
                }
            }
        });

};
