import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listPostsSortedByTimestamp } from '../../graphql/queries';
import { onCreatePost } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import Geolocation from '@react-native-community/geolocation';
import MapBoxGL from '@react-native-mapbox-gl/maps';
import SafeBorder from '../Components/Navigation/SafeBorder';

MapBoxGL.setAccessToken('pk.eyJ1IjoidGFiZWFwcCIsImEiOiJja2xuMjUwYjUwZXlyMnNxcGt2MG5scnBuIn0.azxOspBiyh1cbe3xtIGuLQ');

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';


const reducer = (state, action) => {
    switch(action.type){
        case INITIAL_QUERY:
            return action.posts;
        case ADDITIONAL_QUERY:
            return [...state, ...action.posts];
        case SUBSCRIPTION:
            return [action.post, ...state];
        default:
            return state;
    }
};

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const GymMapScreen = props => {
    //not doing this here lol
    const signOut = () => {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const [posts, dispatch] = useReducer(reducer, []);
    const [nextToken, setNextToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = async (type, nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20, //default = 10
            nextToken: nextToken,
        }));
        console.log(res);
        dispatch({ type: type, posts: res.data.listPostsSortedByTimestamp.items })
        setNextToken(res.data.listPostsSortedByTimestamp.nextToken);
        setIsLoading(false);
    }

    const getAdditionalPosts = () => {
        if (nextToken === null) return; //Reached the last page
        getPosts(ADDITIONAL_QUERY, nextToken);
    }

    useEffect(() => {
        getPosts(INITIAL_QUERY);

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (msg) => {
                console.log('allposts subscription fired')
                const post = msg.value.data.onCreatePost;
                dispatch({ type: SUBSCRIPTION, post: post });
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const [coordinates, setCoordinates] = useState({latitude: 45, longitude: 70});

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setCoordinates({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        });
    }, []);
    return (
        <SafeBorder {...props} >
            <TopBar title='Gym Map'/>
            <View style={STYLES.body}>
                <MapBoxGL.MapView style={{flex:1, width: '100%'}}/>
            </View>
        </SafeBorder>
    );
};


const styles = StyleSheet.create({
    list: {
        // overflowWrap: 'break-word',
        width: 300,
    },
});

export default GymMapScreen;
