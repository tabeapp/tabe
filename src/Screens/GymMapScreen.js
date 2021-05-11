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
import { BACKGROUND, PRIMARY } from '../Style/Colors';
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
    const [userCoordinates, setUserCoordinates] = useState({latitude: 45, longitude: 70});
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
            setUserCoordinates({...info.coords});
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


        //let gymDraft = await API.graphql(graphqlOperation(addNewGym, {
            //coordinates: { lat: coordinates[1], lon: coordinates[0]}
        //}));

        //just make sure this work
        //gymDraft = gymDraft.data.addNewGym;

        const gymDraft =  {
            name: '',
            center: {
                ...coordinate
                //lat: gymCenter[0],
                //lon: gymCenter[1]
            },
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

        //I got a new idea
        //const gymResult = await API.graphql(graphqlOperation(createGym, {
            //input: {
                //name: newGym.name,
                //location: newGym.center,
                ////countryID: newGym.countryID, //we're not gonna have this anymore
                ////stateID: newGym.stateID,
                ////cityID: newGym.cityID,
            //}
        //}));

        dispatch({type: ADD_GYMS, gyms: [gymResult.data.addNewGym]});
        setNewGym(null);
    };

    //google maps update: this should work fine
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
            //countryID: newGym.countryID,
            //stateID: newGym.stateID,
            //cityID: newGym.cityID,
        })
        setCenter({...newCoords});
    }

    const mapStyle = [
        {
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#1d2c4d'
                }
            ]
        },
        {
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#8ec3b9'
                }
            ]
        },
        {
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#1a3646'
                }
            ]
        },
        {
            'featureType': 'administrative.country',
            'elementType': 'geometry.stroke',
            'stylers': [
                {
                    'color': '#4b6878'
                }
            ]
        },
        {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#64779e'
                }
            ]
        },
        {
            'featureType': 'administrative.province',
            'elementType': 'geometry.stroke',
            'stylers': [
                {
                    'color': '#4b6878'
                }
            ]
        },
        {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.stroke',
            'stylers': [
                {
                    'color': '#334e87'
                }
            ]
        },
        {
            'featureType': 'landscape.natural',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#023e58'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#283d6a'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#6f9ba5'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#1d2c4d'
                }
            ]
        },
        {
            'featureType': 'poi.sports_complex',
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#1d2c4d'
                }
            ]
        },
        {
            'featureType': 'poi.sports_complex',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#6f9ba5'
                }
            ]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [
                {
                    'color': '#023e58'
                }
            ]
        },
        {
            'featureType': 'poi.medical',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.attraction',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.business',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.government',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.place_of_worship',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#3C7680'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#304a7d'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#98a5be'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#1d2c4d'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#2c6675'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
                {
                    'color': '#255763'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#b0d5ce'
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'labels.text.stroke',
            'stylers': [
                {
                    'color': '#023e58'
                }
            ]
        },
        {
            'featureType': 'transit',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
                {
                    'color': '#0e1626'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#4e6d70'
                }
            ]
        }
    ];

    return (
        <SafeBorder {...props} >
            <TopBar title="Gym Map"/>
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
                    customMapStyle={mapStyle}
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
