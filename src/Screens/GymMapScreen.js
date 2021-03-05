import React, { useContext, useEffect, useReducer, useState } from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation } from 'aws-amplify';
import { getRegion, getUserLocation, listRegions, listUserLocations, nearbyGyms } from '../../graphql/queries';
import Geolocation from '@react-native-community/geolocation';
import MapBoxGL from '@react-native-mapbox-gl/maps';
import SafeBorder from '../Components/Navigation/SafeBorder';
import Words from '../Components/Simple/Words';
import Write from '../Components/Simple/Write';
import { Gym, UserLocation } from '../../models';
import { UserContext } from '../Contexts/UserProvider';
import {
    createGym,
    createRegion,
    createUserLocation,
    deleteUserLocation,
    updateUserLocation,
} from '../../graphql/mutations';

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

        //lon, lat
        //tapping on map will now load info for it
        const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=poi&limit=3&access_token=${MAPBOX_ACCESS_TOKEN}`;
        let response = await fetch(geocodeURL);
        let obj = await response.json();

        //these are the regions we may need to add
        //this is actually super imporant, these are the default values if nothign is found
        const regionInfo = {
            country: {id: 'emptyCountry', name: 'Empty'},
            state: {id: 'emptyState', name: 'Empty'},
            city: {id: 'emptyCity', name: 'Empty'},
        };
        // sometimes poi wont return any features, just use the same query but types=address, limit=1
        //reload but using place(city) instead of poi
        if (obj.features.length === 0) {
            const geocodeCityURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=place&access_token=${MAPBOX_ACCESS_TOKEN}`;
            response = await fetch(geocodeCityURL);
            obj = await response.json();

            //the only thing is that we need to get the city info not from context
            if (obj.features.length !== 0)
                regionInfo.city = { id: obj.features[0].id, name: obj.features[0].text };
        }

        let gymName = 'New Gym Name';
        let gymCenter = coordinates;

        //this will allow for workouts even without country
        if (obj.features.length !== 0) {
            //this even works for planet fitness
            let gymSuggestion = obj.features.find(feat =>
                feat.properties.category &&
                feat.properties.category.includes('gym')
            );

            //if no gym is found, the user may be adding a home gym
            //dont use the center coordinates or text, let the user add something new
            if (gymSuggestion) {
                gymName = gymSuggestion.text;
                gymCenter = gymSuggestion.center;
            }

            //but for city and state and country, uuse gymSugestion or the first feature
            (gymSuggestion || obj.features[0]).context.forEach(area => {
                const { id, text } = area;
                if (id.startsWith('place.'))
                    regionInfo.city = { id, name: text };
                else if (id.startsWith('region.'))
                    regionInfo.state = { id, name: text };
                else if (id.startsWith('country.'))
                    regionInfo.country = { id, name: text };
            });
        }

        console.log(regionInfo);

        setNewGym({
            name: gymName,
            location: {
                lon: gymCenter[0],
                lat: gymCenter[1]
            },
            regionInfo: regionInfo
        })
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
        const regions = newGym.regionInfo;
        console.log(regions);
        //newGym has everything we need
        //name, location, regionInfo
        //lets go through regionInfo and ensure regions exist
        //for(const level in ['country', 'state', 'city']
        const levels = ['country', 'state', 'city'];

        //start with earth, reassign id as you go
        //we dont even need to make an earth region, it's just a superregion
        let superRegionID = 'earth';

        //for(const level in regions){
        for(let i = 0; i < levels.length; i++){
            const level = levels[i];
            const {id, name} = regions[level];
            console.log(id, name);
            //could we combine these into one graphql request?
            const result = await API.graphql(graphqlOperation(getRegion, {
                id: id
            }));
            console.log(result);

            //if the country exists, assign its to the superregionid
            //otherwise make the country, then assign the id to the superregion id
            //but then again, we're using ids from mapbox so it doesn't matter if it exists or not

            //otherwise the region already exists, we're good to use the region id
            if(result.data.getRegion === null){
                const regionCreate = await API.graphql(graphqlOperation(createRegion, {
                    input: {
                        id: id,
                        superRegionID: superRegionID,
                        name: name
                    }
                }));
                console.log(regionCreate);
            }
            //this might work
            superRegionID = id;
        }

        //at this point we're good to use the region ids
        const gymResult = await API.graphql(graphqlOperation(createGym, {
            input: {
                name: newGym.name,
                location: newGym.location,
                countryID: regions.country.id,
                stateID: regions.state.id,
                cityID: regions.city.id,
            }
        }));
        console.log(gymResult);

        dispatch({type: ADD_GYMS, gyms: [gymResult.data.createGym]});
        setNewGym(null);

    };

    const joinGym = async () => {
        //cant do create, it'll just make a new one
        //maybe have a way to check if the user has a gym in memory?
        //list, followed by create or update, could be an abstract method

        //that's fucking it
        //while userlocation is a separate store, we're just gonna delete and make a new one
        //thats because gymid is sorted on
        //this is still cancer though
        //could be a lambda potentially, dont want the user direclty modifyng userlocations

        //get
        const userGym = await API.graphql(graphqlOperation(getUserLocation, {
            userID: username
        }));
        console.log(userGym);
        //delete
        if(userGym.data.getUserLocation){
            await API.graphql(graphqlOperation(deleteUserLocation, {
                input: {
                    userID: username,
                }
            }));
        }
        //create
        await API.graphql(graphqlOperation(createUserLocation, {
            input: {
                userID: username,
                gymID: selectedGym.id
            }
        }));

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
