import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
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
import { PRIMARY } from '../Style/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBAL_REGION_ID } from '../Constants/RegionConstants';
import SubRegionPicker from '../Components/Social/SubRegionPicker';
import LeaderboardPosition from '../Components/Social/LeaderboardPosition';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const [exercise, setExercise] = useState(props.route.params.exercise);

    //i have a feeling these should just be "targetID"
    const [gymID, setGymID] = useState(props.route.params.gymID);
    const [regionID, setRegionID] = useState(props.route.params.regionID);

    const [title, setTitle] = useState('');

    const globalRegion = {id: GLOBAL_REGION_ID, name: 'Earth'};
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
                    if(!run){
                        setRegionTree([globalRegion]);
                        return;
                    }


                    setTitle(run.name);
                    supRegions.unshift(run);
                    while(run.superRegion){
                        supRegions.unshift(run.superRegion)//should we only copy id and name?
                        run = run.superRegion;
                    }

                    setRegionTree([globalRegion, ...supRegions]);

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
                        globalRegion,
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

    //this is for choosing a city when you have a state selected or so
    const [subModal, setSubModal] = useState(false);

    const handleSubRegionSelection = id => {
        //either set region or set gym
        if (id === GLOBAL_REGION_ID || id.includes('.')){
            setGymID(null);
            setRegionID(id);
        }
        else{
            setRegionID(null);
            setGymID(id);
        }
    };

    return (
        <SafeBorder>
            <TopBar title='Leaderboard'/>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderColor: PRIMARY, borderBottomWidth: 1}}>
                {
                    regionTree.map(reg =>
                        <TouchableOpacity
                            key={reg.id}
                            style={{borderColor: PRIMARY, borderRightWidth: 1}}
                            onPress={() => {
                                setGymID(null);
                                setRegionID(reg.id)
                            }}
                        >
                            <Words style={{fontSize: 20}}>{reg.name}</Words>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity style={{width: 50}} onPress={() => setSubModal(true)}>
                    <Words>...</Words>
                </TouchableOpacity>
            </View>
            <BigWords>{title}</BigWords>

            <TouchableOpacity
                onPress={() => setModal(true)}
                style={{height: 40, borderColor: PRIMARY, borderTopWidth:1, borderBottomWidth: 1}}
            >
                <Words>{exercise} Leaderboard</Words>
            </TouchableOpacity>

            {
                //you know, these would ideally link to posts
                records &&
                records.map((record, index) =>
                    <LeaderboardPosition key={record.id} record={record} rank={index}/>
                )
            }

            <ExercisePicker visible={modal} handleSelection={setExercise} close={() => setModal(false)}/>
            <SubRegionPicker
                regionID={regionID}
                visible={subModal}
                handleSelection={handleSubRegionSelection}
                close={() => setSubModal(false)}
            />
        </SafeBorder>
    );
};
export default LeaderboardScreen;
