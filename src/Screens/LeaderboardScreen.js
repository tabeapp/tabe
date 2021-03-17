import React, {useState, useEffect} from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import { getGym, listRecordsByExerciseAndGym } from '../../graphql/queries';
import BigWords from '../Components/Simple/BigWords';
import ExercisePicker from '../Components/Workout/ExercisePicker';
import { PRIMARY } from '../Style/Theme';
import Row from '../Components/Simple/Row';
import { TouchableOpacity } from 'react-native-gesture-handler';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const { gymID, regionID } = props.route.params;
    const [exercise, setExercise] = useState(props.route.params.exercise);

    const [loaded, setLoaded] = useState(false);

    const [title, setTitle] = useState('');

    const [records, setRecords] = useState([]);

    useEffect(() => {
        //finally, user records comes into play
        //load gym/region and exercise

        //if(!regionID && !gymID)
            //return;

        if(regionID){

        }
        else if(gymID){
            API.graphql(graphqlOperation(getGym, {
                id: gymID,
            }))
                .then(result => {
                    setTitle(result.data.getGym.name);
                })
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

    const [modal, setModal] = useState(false);

    return (
        <SafeBorder>
            <TopBar title='Leaderboard'/>
            <BigWords>{title}</BigWords>

            <TouchableOpacity
                onPress={() => setModal(true)}
                style={{height: 40, borderColor: PRIMARY, borderTopWidth:1, borderBottomWidth: 1}}
            >
                <Words>{exercise} Leaderboard</Words>
            </TouchableOpacity>

            {
                records &&
                records.map(record =>
                    <Words>{JSON.stringify(record)}</Words>
                )
            }
            <ExercisePicker visible={modal} handleSelection={setExercise} close={() => setModal(false)}/>
        </SafeBorder>
    );
};
export default LeaderboardScreen;
