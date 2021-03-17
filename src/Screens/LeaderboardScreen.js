import React, {useState, useEffect} from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import { listRecordsByExerciseAndGym } from '../../graphql/queries';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const { gymID, regionID, exercise } = props.route.params;

    const [loaded, setLoaded] = useState(false);

    const [records, setRecords] = useState([]);

    useEffect(() => {
        //finally, user records comes into play
        //load gym/region and exercise

        if(!regionID && !gymID)
            return;

        if(regionID){

        }
        else if(gymID){
            API.graphql(graphqlOperation(listRecordsByExerciseAndGym, {
                gymID: gymID,
                exerciseOrm: {
                    beginsWith: {
                        exercise: exercise
                    }
                },
                limit: 10,
                sortDirection: 'DESC'
            })).then(result => {
                //this is huge
                setRecords(result.data.listRecordsByExerciseAndGym.items);
                setLoaded(true);
            })

        }

    }, [regionID, gymID, exercise]);

    return (
        <SafeBorder>
            <TopBar title='Leaderboard'/>
            {
                records &&
                records.map(record =>
                    <Words>{JSON.stringify(record)}</Words>
                )
            }
        </SafeBorder>
    );
};
export default LeaderboardScreen;
