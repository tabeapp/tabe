import { SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useReducer, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import WeightVisual from "../Utils/WeightVisual";
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";
import { withAuthenticator } from "aws-amplify-react-native";
import { API, graphqlOperation } from "aws-amplify";
import { listPostsBySpecificOwner } from "../../graphql/queries";
import PostList from "../Components/PostList";
import { onCreatePost } from "../../graphql/subscriptions";

const liftMapping = {
    squat: 'orange',
    deadlift: 'red',
    bench: 'green',
    press: 'blue'
}

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
    switch (action.type) {
        case INITIAL_QUERY:
            return action.posts;
        case ADDITIONAL_QUERY:
            return [...state, ...action.posts]
        case SUBSCRIPTION:
            return [action.post, ...state]
        default:
            return state;
    }
};

const ProfileScreen = props => {
    //fuck it, we'll just do it straight from this without using the context
    const [progress, setProgress] = useState([]);
    const [userStats, setUserStats] = useState({});

    //post loading bs part
    const {userId} = props.route.params;

    const [posts, dispatch] = useReducer(reducer, []);
    const [nextToken, setNextToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = async (type, nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsBySpecificOwner, {
            owner: userId,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken
        }))
        console.log(res);
        dispatch({
            type: type,
            posts: res.data.listPostsBySpecificOwner.items
        })
        setNextToken(res.data.listPostsBySpecificOwner.nextToken)
        setIsLoading(false);
    };
    const getAdditionalPosts = () => {
        if (nextToken === null) return; //Reached the last page
        getPosts(ADDITIONAL_QUERY, nextToken);
    };

    useEffect(() => {
        //first off
        //if a userid is in the params, load that user
        //otherwise load self
        //if(!userId)
            //Auth.currentAuthenticatedUser()
        //
        getPosts(INITIAL_QUERY);

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: msg => {
                const post = msg.value.data.onCreatePost;
                if(post.owner !== userId)
                    return;
                dispatch({type: SUBSCRIPTION, post: post});
            }
        });
        return () => subscription.unsubscribe();
    }, [])

    useEffect(() => {
        //console.log('reloading progress ' + JSON.stringify(progress));
        AsyncStorage.getItem('@progress').then(val =>{

            setProgress(JSON.parse(val));
        });

        //better hope this is present, lol
        AsyncStorage.getItem('@userStats').then(val => {
            setUserStats(JSON.parse(val));
        });
    }, []);

    let timeStart = 0, timeEnd = 1, weightStart = 0, weightEnd = 1;
    if(progress[0]){
        timeStart = progress.reduce((min, p) => p.time < min ? p.time : min, progress[0].time);
        timeEnd = progress.reduce((max, p) => p.time > max ? p.time : max, progress[0].time);

        //this ones too copmlex to reduce
        progress.forEach(wo => {
            Object.values(wo.stats).forEach(weight => {
                if(weight > weightEnd)
                    weightEnd = weight
            })
        });


    }

    console.log(timeEnd-timeStart);
    console.log(weightEnd-weightStart);


    return (
        <SafeBorderNav {...props} screen={'profile'}>
            <TopBar title='Zyzz'/>
            <View style={STYLES.body}>
                <View>
                    {/*posts by user bs here*/}
                    <PostList
                        isLoading={isLoading}
                        posts={posts}
                        getAdditionalPosts={getAdditionalPosts}
                        listHeaderTitle={userId + ' Timeline'}
                    />

                </View>
                <View style={styles.cardContainer}>{
                    Object.entries(userStats).map(([k,v]) =>
                        <View style={{...STYLES.card, width: '100%', height: 120}} key={k}>

                            <View style={{ height: 50, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <WeightVisual weight={v} reverse={true} />
                                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Words>{k}</Words>
                                    <Words>{v}</Words>
                                </Row>
                                <WeightVisual weight={v}/>
                            </View>
                        </View>

                    )
                }</View>
                <View style={{height: 100, width: '50%', padding: 5, borderColor: PRIMARY, borderWidth: 1}}>{
                    progress[0]&&
                    progress.map(wo => {
                        return Object.entries(wo.stats).map(([k,v]) => {
                            //lol should I make this a <canvas>
                            const x = Math.round((wo.time-timeStart)/(timeEnd-timeStart)*100)+'%';
                            const y = Math.round((v-weightStart)/(weightEnd-weightStart)*100)+'%';
                            const color = liftMapping[k];
                            return <View style={{position: 'absolute', left: x, bottom: y, backgroundColor: color, height: 5, width:5}} key={wo.time+k}/>
                        })
                    })
                }</View>
            </View>
        </SafeBorderNav>
    );
};

const styles = StyleSheet.create({
    cardContainer: {height: 500, width: '100%', alignItems: 'center', justifyContent: 'center', margin: 5},
});

export default ProfileScreen;
