import React, { useEffect, useState } from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import { getGym, getRegion, listRecordsByExercise } from '../../graphql/queries';
import ExercisePicker from '../Components/Workout/ExercisePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBAL_REGION_ID } from '../Constants/RegionConstants';
import SubRegionPicker from '../Components/Social/SubRegionPicker';
import LeaderboardPosition from '../Components/Social/LeaderboardPosition';
import GenderSelector from '../Components/Profile/GenderSelector';
import Row from '../Components/Simple/Row';
import Ionicons from 'react-native-vector-icons/Ionicons';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const [exercise, setExercise] = useState(props.route.params.exercise);

    const [male, setMale] = useState(true);

    //i have a feeling these should just be "targetID"
    const [gymID, setGymID] = useState(props.route.params.gymID);
    const [regionID, setRegionID] = useState(props.route.params.regionID);

    const [title, setTitle] = useState('');

    const globalRegion = {id: GLOBAL_REGION_ID, name: 'Earth'};
    const [records, setRecords] = useState([]);

    //this will be for searching through super regions and sub regions
    const [regionTree, setRegionTree] = useState([]);

    //it's either this or return a ridiculous amount of nested regions in graphql
    //idk which is better honestly
    const buildRegionTree = (runningId, regions) => {
        //this is in fact a possiblity
        if(runningId === GLOBAL_REGION_ID){
            setTitle(globalRegion.name);
            setRegionTree([globalRegion]);
            return;
        }

        API.graphql(graphqlOperation(getRegion, {
            id: runningId
        })).then(result => {
            let run = result.data.getRegion;

            //just the first time
            if(regions.length === 0){
                if(!run){
                    setRegionTree([globalRegion]);
                    return;
                }

                setTitle(run.name);
            }

            regions.unshift(run);

            //recurse
            if(run.superRegionID !== GLOBAL_REGION_ID)
                buildRegionTree(run.superRegionID, regions);
            else
                setRegionTree([globalRegion, ...regions]);

        });
    };

    useEffect(() => {

        const listOpInput = {
            limit: 10,
            sortDirection: 'DESC',
            exercise: exercise
        };

        if(regionID){
            if(regionID !== GLOBAL_REGION_ID){
                let key;
                if(regionID.startsWith('country'))
                    key = 'countryID';
                else if(regionID.startsWith('region'))
                    key = 'stateID';
                else if(regionID.startsWith('place'))
                    key = 'cityID';

                //hpe this works, not giving any error so far
                listOpInput.filter = {
                    and: [
                        { [key]: { eq: regionID } },
                        { male: { eq: male } }
                    ]
                };
            }

            let operation = graphqlOperation(listRecordsByExercise, listOpInput);

            //im sure this works
            API.graphql(operation)
                .then(result => setRecords(result.data.listRecordsByExercise.items));

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

            API.graphql(graphqlOperation(listRecordsByExercise, {
                ...listOpInput,
                filter: {
                    and: [
                        { gymID: { eq: gymID } },
                        { male: { eq: male } }
                    ]
                },
            }))
                .then(result => {
                    //this is huge
                    setRecords(result.data.listRecordsByExercise.items);
                });

        }

    }, [regionID, gymID, exercise, male]);

    useEffect(() => {
        if(!regionID)
            return;
        buildRegionTree(regionID, []);
    }, [regionID]);

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
            <Words style={{color: 'gray'}}>
                {regionTree.reduce((a,b) => a + b.name + ' > ', '')}
            </Words>
            <Row style={{width: '100%'}}>
                <TouchableOpacity
                    onPress={() => {
                        if(gymID){
                            setGymID(null);
                            setRegionID(regionTree[regionTree.length-1].id);
                        }
                        else
                            setRegionID(regionTree[regionTree.length-2].id);
                    }}
                >
                    <Words><Ionicons name={'chevron-up'} size={40}/></Words>
                </TouchableOpacity>

                <Words style={{textAlign: 'center', fontWeight: 'bold', fontSize: 35}}>{title}</Words>

                <TouchableOpacity onPress={() => {
                    if(regionID)
                        setSubModal(true);
                }}>
                    <Words><Ionicons name={'chevron-down'} size={40}/></Words>
                </TouchableOpacity>
            </Row>


            <TouchableOpacity
                onPress={() => setModal(true)}
                style={{height: 40, justifyContent: 'center'}}
            >
                <Words style={{fontSize: 25}}>{exercise} Leaderboard</Words>
            </TouchableOpacity>

            <GenderSelector male={male} setMale={setMale}/>


            {
                //you know, these would ideally link to posts
                records.map((record, index) =>
                    <LeaderboardPosition key={index} record={record} rank={index}/>
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
