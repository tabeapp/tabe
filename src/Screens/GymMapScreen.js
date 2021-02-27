import React, { useContext, useEffect, useReducer, useState } from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation, DataStore } from 'aws-amplify';
import { nearbyGyms,} from '../../graphql/queries';
import Geolocation from '@react-native-community/geolocation';
import MapBoxGL from '@react-native-mapbox-gl/maps';
import SafeBorder from '../Components/Navigation/SafeBorder';
import Words from '../Components/Simple/Words';
import Write from '../Components/Simple/Write';
import { Gym, UserLocation } from '../../models';
import { UserContext } from '../Contexts/UserProvider';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGFiZWFwcCIsImEiOiJja2xuMjUwYjUwZXlyMnNxcGt2MG5scnBuIn0.azxOspBiyh1cbe3xtIGuLQ';
MapBoxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

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
                console.log(results);
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
        console.log(id)
        setSelectedGym(gyms[id]);
        //yeah there probably should be a modal or something to see

    };

    const pressNewGym = async feature => {
        const {coordinates} = feature.geometry;

        //this is ok, this isn't a network request
        //if you press on the map super close to an existing gym, just go to that gym
        let closeGym = null;

        Object.values(gyms).forEach(gym => {
            //i know this .001 values aren't miles or kilometers, but hey they work
            if((gym.location.lon - coordinates[0])**2 + (gym.location.lat - coordinates[1])**2 < .001**2)
                closeGym = gym;
        });

        if(closeGym){
            setSelectedGym(closeGym);
            return;
        }

        //lon, lat
        console.log(coordinates);
        //tapping on map will now load info for it
        const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=poi&limit=3&access_token=${MAPBOX_ACCESS_TOKEN}`;
        const response = await fetch(geocodeURL);
        let obj = await response.json();
        console.log(obj.features);

        // sometimes poi wont return any features, just use the same query but types=address, limit=1
        //reload but using address instead of poi
        if(obj.features.length === 0){
            const geocodeAddressURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=address&access_token=${MAPBOX_ACCESS_TOKEN}`;
            obj = await fetch(geocodeAddressURL).json();
        }

        //this even works for planet fitness
        let gymSuggestion = obj.features.find(feat =>
            feat.properties.category &&
            feat.properties.category.includes('gym')
        );
        //if nothing is found, the user may be adding a home gym just use the first feature
        if(!gymSuggestion)
            gymSuggestion = obj.features[0];

        //at this point we should be all set to make a sugggestion to the user
        console.log(gymSuggestion.text);
        console.log(gymSuggestion.center);
        console.log(JSON.stringify(gymSuggestion.context));

        /*
            most importantly, feature.context will give super regions
            feature.context[2] has objects id and text, text being the city
            feature.context[4] has object id and text, text being the state
            feature.context[5] has objects id and text, text bieng teh country
            save these ids when saving the gym, we can filter on efforts later

            that's for the us at least
            for more general use, scan the context for ids starting with place, that'll be city
            scan the context for ids starting with region, that'll be "state"
            scan the context for ids starting with country, thatt'll be country

         */

        setNewGym({
            name: gymSuggestion.text,
            location: {
                lon: gymSuggestion.center[0],
                lat: gymSuggestion.center[1]
            }
        })
        //create gym draft
        //we just need to get a  name, we have location{lon: lat}

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
    const addNewGym = async () => {
        //FUCK DATASTORE, AT LEAST GRAPQHL GIVES REAL ERROR MESSAGES RATHER THAN SOME SYNC BS
        //const res = await DataStore.save(new Gym({
        ////dooes this no work?
        //...newGym
        //}));
        //console.log(res);
        //dispatch({type: ADD_GYMS, gyms: [res]});
        setNewGym(null);

    };

    const joinGym = async () => {

        //so i take it the @key in userlocation doesnt mean anything?
        const res = await DataStore.query(UserLocation, ul => ul.userID('eq', username));
        console.log(res);
        //need to make a new UL for the user, assign it to the
        if(!res[0]){
            DataStore.save(new UserLocation({
                userID: username,
                gymID: selectedGym.id
            })).then(() => setSelectedGym(null))
        }
        else{
            DataStore.save(UserLocation.copyOf(res[0], updated => {
                updated.gymID = selectedGym.id;
            })).then(() => setSelectedGym(null))
        }

    }

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
                        <View style={{ backgroundColor: 'gray', width: '50%', height: '30%', alignItems: 'center'}}>
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
                                style={{backgroundColor: 'black', height: 50, width: '100%'}}
                                onChange={val => setNewGym({...newGym, name: val})}
                                value={newGym.name}
                            />
                            <TouchableOpacity
                                onPress={addNewGym}
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
                <MapBoxGL.MapView
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

                </MapBoxGL.MapView>

            </View>
        </SafeBorder>
    );
};


export default GymMapScreen;
