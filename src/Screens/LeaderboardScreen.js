import React, {useState, useEffect} from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import {
    getGym, getRegion,
    listRecordsByExercise,
    listRecordsByExerciseAndCity, listRecordsByExerciseAndCountry,
    listRecordsByExerciseAndGym, listRecordsByExerciseAndState,
} from '../../graphql/queries';
import BigWords from '../Components/Simple/BigWords';
import ExercisePicker from '../Components/Workout/ExercisePicker';
import { PRIMARY } from '../Style/Theme';
import Row from '../Components/Simple/Row';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBAL_REGION_ID } from '../Constants/RegionConstants';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const [exercise, setExercise] = useState(props.route.params.exercise);
    const [gymID, setGymID] = useState(props.route.params.gymID);
    const [regionID, setRegionID] = useState(props.route.params.regionID);

    const [loaded, setLoaded] = useState(false);

    const [title, setTitle] = useState('');

    const [records, setRecords] = useState([]);

    //this will be for searching through super regions and sub regions
    const [regionTree, setRegionTree] = useState([]);

    useEffect(() => {

        const listOpInput = {
            exerciseOrm: {
                beginsWith: {
                    exercise: exercise
                }
            },
            limit: 10,
            sortDirection: 'DESC'
        };
        //finally, user records comes into play
        //load gym/region and exercise

        //if(!regionID && !gymID)
        //return;

        if(regionID){
            //ill admit, this is the dumbest thing I've ever done
            let operation;
            if(regionID === GLOBAL_REGION_ID)
                operation = graphqlOperation(listRecordsByExercise, {
                    exercise: exercise
                });
            else {
                let listOp;
                let key;
                if(regionID.startsWith('country')){
                    listOp = listRecordsByExerciseAndCountry;
                    key = 'countryID';
                } else if(regionID.startsWith('region')){
                    listOp = listRecordsByExerciseAndState;
                    key = 'stateID';
                } else if(regionID.startsWith('place')){
                    listOp = listRecordsByExerciseAndCity;
                    key = 'cityID';
                }

                operation = graphqlOperation(listOp, {
                    ...listOpInput,
                    [key]: regionID
                })
            }


            //im sure this works
            API.graphql(operation)
                .then(result => setRecords(Object.values(result.data)[0].items));

            API.graphql(graphqlOperation(getRegion, {
                id: regionID
            }))
                .then(res => {
                    const supRegions = [];
                    let run = res.data.getRegion;
                    setTitle(run.name);
                    while(run.superRegion){
                        supRegions.unshift(run.superRegion)//should we only copy id and name?
                        run = run.superRegion;
                    }

                    setRegionTree(supRegions);

                });

        }
        else if(gymID){
            API.graphql(graphqlOperation(getGym, {
                id: gymID,
            }))
                .then(result => {
                    const gym = result.data.getGym;
                    setTitle(gym.name);

                    setRegionTree([
                        gym.country,
                        gym.state,
                        gym.city,
                    ]);
                })

            API.graphql(graphqlOperation(listRecordsByExerciseAndGym, {
                ...listOpInput,
                gymID: gymID,
            }))
                .then(result => {
                    //this is huge
                    setRecords(result.data.listRecordsByExerciseAndGym.items);
                });

        }

    }, [regionID, gymID, exercise]);

    const [modal, setModal] = useState(false);

    return (
        <SafeBorder>
            <TopBar title='Leaderboard'/>
            <Words>{JSON.stringify(regionTree)}</Words>
            <Row>{
                regionTree.map(reg =>
                    <TouchableOpacity onPress={() => setRegionID(reg.id)}>
                        <Words>{reg.name}</Words>
                    </TouchableOpacity>
                )
            }</Row>
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
