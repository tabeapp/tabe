import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Modal, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation } from 'aws-amplify';
import { nearbyGyms } from '../../graphql/queries';
import Geolocation from '@react-native-community/geolocation';
//import MapBoxGL from '@react-native-mapbox-gl/maps';
import SafeBorder from '../Components/Navigation/SafeBorder';
import Words from '../Components/Simple/Words';
import Write from '../Components/Simple/Write';
import { UserContext } from '../Contexts/UserProvider';
import { addNewGym, changeUserGym, createGym } from '../../graphql/mutations';
import { BACKGROUND } from '../Style/Colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGFiZWFwcCIsImEiOiJja2xuMjUwYjUwZXlyMnNxcGt2MG5scnBuIn0.azxOspBiyh1cbe3xtIGuLQ';
//MapBoxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

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
const GymMapScreen = props => {

    const {width, height} = useWindowDimensions();
    const {username} = useContext(UserContext);
    //not doing this here lol
    const [gyms, dispatch] = useReducer(reducer, {});

    //const [posts, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(true);

    //this doesn't change unless user actually moves
    const [userCoordinates, setUserCoordinates] = useState([45, 70]);
    //this changes with view
    const [center, setCenter] = useState([ 45, 70]);

    const [selectedGym, setSelectedGym] = useState(null);

    const [newGym, setNewGym] = useState(null);

    //no subscription, just search whenever coords change

    const loadGyms = () => {
        setIsLoading(true);
        API.graphql(graphqlOperation(nearbyGyms, {
            location: {
                lon: center[0],
                lat: center[1],
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
            setUserCoordinates([
                info.coords.longitude,
                info.coords.latitude
            ]);
            setCenter([
                info.coords.longitude,
                info.coords.latitude
            ]);
        });
    }, []);

    const pressOnGym = id => {
        setSelectedGym(gyms[id]);
        //yeah there probably should be a modal or something to see

    };

    const pressNewGym = async feature => {
        const { coordinates } = feature.geometry;

        //this is ok, this isn't a network request
        //if you press on the map super close to an existing gym, just go to that gym
        let closeGym = null;

        Object.values(gyms).forEach(gym => {
            //i know this .001 values aren't miles or kilometers, but hey they work
            if ((gym.location.lon - coordinates[0]) ** 2 + (gym.location.lat - coordinates[1]) ** 2 < .001 ** 2)
                closeGym = gym;
        });

        if (closeGym) {
            setSelectedGym(closeGym);
            return;
        }


        let gymDraft = await API.graphql(graphqlOperation(addNewGym, {
            coordinates: { lat: coordinates[1], lon: coordinates[0]}
        }));

        //just make sure this work
        gymDraft = gymDraft.data.addNewGym;

        setNewGym(gymDraft);
    };

    const updateCenter = feature => {

        const bounds = feature.properties.visibleBounds;
        //there's gotta be somethign I can do with this
        const diagonal = (bounds[0][0] - bounds[1][0])**2 + (bounds[0][1] - bounds[1][1])**2;
        //only update if it's much different than the previous
        const nextCoords = feature.geometry.coordinates;
        //not perfect at all lol but one coordinates ~60 miles
        if((center[0]-nextCoords[0])**2 + (center[1] - nextCoords[1])**2 > .5**2)
            setCenter(feature.geometry.coordinates);
    };

    //take the new gym and save it to db
    //thid dhould be lambda
    const onPressScreen = async () => {
        const gymResult = await API.graphql(graphqlOperation(createGym, {
            input: {
                name: newGym.name,
                location: newGym.center,
                countryID: newGym.countryID,
                stateID: newGym.stateID,
                cityID: newGym.cityID,
            }
        }));

        dispatch({type: ADD_GYMS, gyms: [gymResult.data.createGym]});
        setNewGym(null);
    };

    const joinGym = async () => {
        //just call the lamba

        await API.graphql(graphqlOperation(changeUserGym, {
            id: selectedGym.id,
            cityID: selectedGym.cityID,
            stateID: selectedGym.stateID,
            countryID: selectedGym.countryID,
        }));
        props.navigation.goBack();

        setSelectedGym(null);
    };

    return (
        <SafeBorder {...props} >
            <TopBar title='Gym Map'/>
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
                newGym &&
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
            {
                /*isLoading &&
                <Modal transparent>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Words>Loading...</Words>
                    </View>
                </Modal>*/
            }
            <View style={STYLES.body}>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    //this top -90 is very wrong but it does give the look im going for
                    style={{position: 'absolute', top: -90, flex: 1, width: width, height: height, zIndex: 0}}
                    showsUserLocation={true}
                    region={{
                        latitude: center[1],
                        longitude: center[0],
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                />
                {/*<MapBoxGL.MapView
                    style={{flex:1, width: '100%'}}
                    styleURL={MapBoxGL.StyleURL.Dark}
                    showUserLocation={true}
                    onPress={pressNewGym}
                    onRegionDidChange={updateCenter}
                >
                    <MapBoxGL.Camera
                        centerCoordinate={userCoordinates}
                        zoomLevel={14}
                        animationDuration={0}
                    />
                    <MapBoxGL.PointAnnotation id={'me'} coordinate={userCoordinates}>
                        <View style={{height: 30, width: 30, backgroundColor: 'blue'}}/>
                    </MapBoxGL.PointAnnotation>
                    {
                        gyms&&
                        Object.values(gyms).map(gym =>
                            <MapBoxGL.PointAnnotation id={gym.id} key={gym.id} coordinate={[gym.location.lon, gym.location.lat]}>
                                <TouchableOpacity onPress={() => pressOnGym(gym.id)}>
                                    <Words style={{backgroundColor: 'green'}}>{gym.name}</Words>
                                </TouchableOpacity>
                            </MapBoxGL.PointAnnotation>

                        )
                    }

                </MapBoxGL.MapView>*/}

            </View>
        </SafeBorder>
    );
};


export default GymMapScreen;
