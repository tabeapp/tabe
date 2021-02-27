import React, { useEffect, useReducer, useState } from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listPostsSortedByTimestamp, nearbyGyms, searchGyms } from '../../graphql/queries';
import { onCreatePost } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import Geolocation from '@react-native-community/geolocation';
import MapBoxGL from '@react-native-mapbox-gl/maps';
import SafeBorder from '../Components/Navigation/SafeBorder';
import Words from '../Components/Simple/Words';
import { SafeAreaView } from 'react-navigation';

MapBoxGL.setAccessToken('pk.eyJ1IjoidGFiZWFwcCIsImEiOiJja2xuMjUwYjUwZXlyMnNxcGt2MG5scnBuIn0.azxOspBiyh1cbe3xtIGuLQ');

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
    //not doing this here lol
    const [gyms, dispatch] = useReducer(reducer, {});

    //const [posts, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(true);

    //this doesn't change unless user actually moves
    const [userCoordinates, setUserCoordinates] = useState({latitude: 45, longitude: 70});
    //this changes with view
    const [coordinates, setCoordinates] = useState({latitude: 45, longitude: 70});

    //no subscription, just search whenever coords change
    useEffect(() => {
        setIsLoading(true);
        API.graphql(graphqlOperation(nearbyGyms, {
            location: {
                lat: coordinates.latitude,
                lon: coordinates.longitude
            },
            km: 20

        }))
            .then(results => {
                console.log(results);
                dispatch({type: ADD_GYMS, gyms: results.data.nearbyGyms.items});
                setIsLoading(false);
            });

    }, [coordinates]);

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setUserCoordinates({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            });
            setCoordinates({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            });
        });
    }, []);

    const pressOnGym = id => {
        console.log(id)

    };

    const pressNewGym = feature => {
        const {coordinates} = feature.geometry;
        //lon, lat
        console.log(coordinates);

    };

    return (
        <SafeBorder {...props} >
            <TopBar title='Gym Map'/>
            <Modal visible={isLoading}>
                {/*kinda lazy loading indicator*/}
                <View style={{ backgroundColor: 'rgba(129,129,129,.4)', width: '100%', height: '100%' }}/>
            </Modal>
            <View style={STYLES.body}>
                <MapBoxGL.MapView
                    style={{flex:1, width: '100%'}}
                    styleURL={MapBoxGL.StyleURL.Dark}
                    showUserLocation={true}
                    centerCoordinate={[coordinates.longitude, coordinates.latitude]}
                    zoomLevel={14}
                    onPress={pressNewGym}
                >
                    <MapBoxGL.Camera
                        centerCoordinate={[coordinates.longitude, coordinates.latitude]}
                        zoomLevel={14}
                        animationDuration={0}
                    />
                    <MapBoxGL.PointAnnotation id={'me'} coordinate={[userCoordinates.longitude, userCoordinates.latitude]}>
                        <View style={{height: 30, width: 30, backgroundColor: 'blue'}}/>
                    </MapBoxGL.PointAnnotation>
                    {
                        gyms&&
                        Object.values(gyms).map(gym =>
                            <MapBoxGL.PointAnnotation id={gym.id} coordinate={[gym.location.lon, gym.location.lat]}>
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
