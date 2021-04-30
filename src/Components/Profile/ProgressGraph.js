import { useState } from 'react';
//this is an expensive operation, so I'm tucking it away here so it doesn't get called on accident
//...yet
import { View } from 'react-native';
import { PRIMARY } from '../../Style/Colors';
import { API, graphqlOperation } from 'aws-amplify';
import { listEffortsByExerciseAndUser } from '../../../graphql/queries';


const liftMapping = {
    Squat: 'orange',
    Deadlift: 'red',
    Bench: 'green',
    Press: 'blue'
};

const ProgressGraph = props => {
    const [progress, setProgress] = useState({});
    const mainLifts = ['Squat', 'Bench', 'Press', 'Deadlift'];

    //at last, we get to use user prs
    mainLifts.forEach(exercise => {
        API.graphql(graphqlOperation(listEffortsByExerciseAndUser, {
            userID: props.profileUser,//maybe not from props, but well see
            exerciseWeight: {
                beginsWith: {
                    exercise: exercise
                }
            },
            sortDirection: "DESC",
            //unlimited to get the graph... maybe this should be its own screen?
            //limit: 1//just the PR
        }))
            .then(result => {
                const items = result.data.listEffortsByExerciseAndUser.items;
                if(items.length !== 0) {
                    const prog = items.map(effort => ({
                        time: new Date(effort.createdAt).getTime(),
                        weight: effort.orm
                    }))

                    //just looking for 1rm over time
                    setProgress(prev => ({
                        ...prev,
                        [items[0].exercise]: prog
                    }));
                }
            });
    });

    let timeStart = 0, timeEnd = 1, weightStart = 0, weightEnd = 1;

    //SURELY THERE'S SOME GRAPH LIBRARY FOR THIS SHIT
    if(Object.keys(progress).length !== 0){
        //initialze with first effort that appears
        const effort = Object.values(progress)[0][0];
        timeStart = effort.time;
        timeEnd = effort.time;
        weightEnd = effort.weight;

        Object.values(progress).forEach(exerciseArray => {
            exerciseArray.forEach(effort => {
                if(effort.time < timeStart)
                    timeStart = effort.time;
                if(effort.time > timeEnd)
                    timeEnd = effort.time;
                if(effort.weight > weightEnd)
                    weightEnd = effort.weight;
            })
        })
    }

    return(
        <View style={{height: 100, width: '50%', padding: 5, borderColor: PRIMARY, borderWidth: 1}}>{
            Object.entries(progress).map(([exercise, progress]) => {
                return progress.map(effort => {
                    const x = Math.round((effort.time-timeStart)/(timeEnd-timeStart)*100)+'%';
                    const y = Math.round((effort.weight-weightStart)/(weightEnd-weightStart)*100)+'%';
                    const color = liftMapping[exercise];
                    return <View style={{position: 'absolute', left: x, bottom: y, backgroundColor: color, height: 5, width:5}} key={effort.time+exercise}/>
                })
            })
        }</View>
    )
};
