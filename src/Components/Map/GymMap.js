import React, { useEffect, useReducer, useState } from 'react';
import { Modal, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { nearbyGyms } from '../../../graphql/queries';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { addNewGym, changeUserGym } from '../../../graphql/mutations';
import Words from '../Simple/Words';
import { MAP_STYLE } from './MapStyle';
import Write from '../Simple/Write';
import { BACKGROUND } from '../../Style/Colors';

const ADD_GYMS = 'ADD_GYMS';

const reducer = (state, action) => {

    switch(action.type){
        case ADD_GYMS:
            action.gyms.forEach(gym => {
                state[gym.id] = gym;
            });
            return state;

        default:
            return state;
    }
};

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const GymMap = props => {
    const {width, height} = useWindowDimensions();
    //not doing this here lol
    const [gyms, dispatch] = useReducer(reducer, {});

    //const [posts, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(true);

    //this doesn't change unless user actually moves
    //this changes with view
    const [center, setCenter] = useState({latitude: 45, longitude: 70});

    const [selectedGym, setSelectedGym] = useState(null);

    const [newGym, setNewGym] = useState(null);

    //no subscription, just search whenever coords change

    const loadGyms = () => {
        setIsLoading(true);
        API.graphql(graphqlOperation(nearbyGyms, {
            location: {
                lon: center.longitude,
                lat: center.latitude,
            },
            //grr idk what to do with this
            km: 20
        }))
            .then(results => {
                dispatch({type: ADD_GYMS, gyms: results.data.nearbyGyms.items});
                setIsLoading(false);
            });
    };

    useEffect(loadGyms, [center]);

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setCenter({...info.coords});
        });
    }, []);

    const pressOnGym = id => {
        setSelectedGym(gyms[id]);
        setCenter({longitude: gyms[id].location.lon, latitude: gyms[id].location.lat});
    };

    //just need to change feature
    //this will now handle cases where you don't specifically press on a gym
    //so no suggestions for ya
    //and no add new gym
    //ya good
    const pressNewGym = async e => {
        const {coordinate} = e.nativeEvent;
        //const { coordinates } = feature.geometry;

        //this is ok, this isn't a network request
        //if you press on the map super close to an existing gym, just go to that gym
        let closeGym = null;

        Object.values(gyms).forEach(gym => {
            //i know this .001 values aren't miles or kilometers, but hey they work
            if ((gym.location.lon - coordinate.longitude) ** 2 + (gym.location.lat - coordinate.latitude) ** 2 < 0.001 ** 2)
                closeGym = gym;
        });

        if (closeGym) {
            setSelectedGym(closeGym);
            return;
        }


        const gymDraft =  {
            name: '',
            center: { ...coordinate },
        };
        //hmm
        setNewGym(gymDraft);
    };

    const updateCenter = region => {
        //not perfect at all lol but one coordinates ~60 miles
        if((center.longitude - region.longitude)**2 + (center.latitude - region.latitude)**2 > 0.5**2)
            setCenter({longitude: region.longitude, latitude: region.latitude});
    };

    //take the new gym and save it to db
    //thid dhould be lambda
    //google maps update: this should work fine
    const onPressScreen = async () => {

        //new idea
        //call the labmda when you actually make a gym

        let gymResult = await API.graphql(graphqlOperation(addNewGym, {
            coordinates: { lat: newGym.center.latitude, lon: newGym.center.longitude},
            name: newGym.name
        }));

        dispatch({type: ADD_GYMS, gyms: [gymResult.data.addNewGym]});
        setNewGym(null);
    };

    //google maps update: this should work fine
    const joinGym = async () => {
        //just call the lamba


        console.log(selectedGym.id, selectedGym.cityID, selectedGym.stateID, selectedGym.countryID);

        //this should just send the gym id but whatever I guess
        await API.graphql(graphqlOperation(changeUserGym, {
            gymChangeInput:{
                id: selectedGym.id,
                countryID: selectedGym.countryID,
                stateID: selectedGym.stateID,
                cityID: selectedGym.cityID,
            }
        }));

        props.navigation.goBack();

        setSelectedGym(null);
    };

    const handlePoiClick = e => {
        const coordinates = e.nativeEvent.coordinate;
        console.log(coordinates);
        let closeGym = null;

        Object.values(gyms).forEach(gym => {
            //i know this .001 values aren't miles or kilometers, but hey they work
            if ((gym.location.lon - coordinates.longitude) ** 2 + (gym.location.lat - coordinates.latitude) ** 2 < 0.001 ** 2)
                closeGym = gym;
        });

        if (closeGym) {
            console.log(closeGym);
            setSelectedGym(closeGym);
            setCenter({longitude: closeGym.location.lon, latitude: closeGym.location.lat});
            return;
        }

        //e.nativeEvent has coordinate, name, and placeId

        const newCoords = e.nativeEvent.coordinate;

        //perfect
        //otherwise we set a new gym
        setNewGym({
            name: e.nativeEvent.name,
            location: e.nativeEvent.coordinate
        })
        setCenter({...newCoords});
    }


    return (
        <View style={{position: 'absolute'}}>
            {
                selectedGym &&
                <Modal transparent>
                    <TouchableOpacity
                        onPress={() => setSelectedGym(null)}
                        style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <View style={{ backgroundColor: 'gray', width: '50%', alignItems: 'center'}}>
                            <Words>{selectedGym.name}</Words>

                            <Words>{/*some gym infoJSON.stringify(selectedGym)*/}</Words>

                            <TouchableOpacity
                                onPress={joinGym}
                                style={{backgroundColor: 'green', height: 50, width: '100%'}}
                            >
                                <Words>Join This Gym</Words>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            }
            {
                newGym &&//maybe this should be a marker popup?
                <Modal transparent>
                    <TouchableOpacity
                        onPress={() => setNewGym(null)}
                        style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <View style={{ backgroundColor: 'gray', width: '50%', alignItems: 'center'}}>
                            <Write
                                style={{backgroundColor: BACKGROUND, height: 50, width: '100%'}}
                                onChange={val => setNewGym({...newGym, name: val})}
                                value={newGym.name}
                            />
                            <TouchableOpacity
                                onPress={onPressScreen}
                                style={{backgroundColor: 'green', height: 50, width: '100%'}}
                            >
                                <Words>Add New Gym</Words>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            }


            <MapView
                provider={PROVIDER_GOOGLE}
                style={{width, height}}
                showsUserLocation
                rotateEnabled={false}
                region={{
                    latitude: center.latitude,
                    longitude: center.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
                onPoiClick={handlePoiClick}
                onLongPress={pressNewGym}
                customMapStyle={MAP_STYLE}
                onRegionChangeComplete={updateCenter}
            >
                {
                    Object.values(gyms).map(gym =>
                        <MapView.Marker
                            key={gym.id}
                            coordinate={{longitude: gym.location.lon, latitude: gym.location.lat}}
                            title={gym.name}
                            description={gym.id}
                            onPress={() => pressOnGym(gym.id)}
                        >
                            <MapView.Callout tooltip onPress={() => {}}>
                                <TouchableOpacity>
                                    <Words>{gym.name}</Words>
                                </TouchableOpacity>
                            </MapView.Callout>
                        </MapView.Marker>
                    )
                }
            </MapView>



        </View>
    );
};


export default GymMap;
