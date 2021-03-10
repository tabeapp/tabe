import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { PRIMARY } from '../Style/Theme';
import WeightVisual from '../Utils/WeightVisual';
import Words from '../Components/Simple/Words';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { getFollowRelationship, getUserImage, listEffortsByExerciseAndUser, listPostsSortedByUserAndTimestamp } from '../../graphql/queries';
import PostList from '../Components/Social/PostList';
import { onCreatePost } from '../../graphql/subscriptions';
import {
    createFollowRelationship,
    createUserImage,
    deleteFollowRelationship,
} from '../../graphql/mutations';
import { UserContext } from '../Contexts/UserProvider';
import { S3Image } from 'aws-amplify-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';

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
    const [records, setRecords] = useState({
        Bench: 0,
        Squat: 0,
        Press: 0,
        Deadlift: 0
    });

    //post loading bs part
    const signedInUser = useContext(UserContext).username;
    const {location} = useContext(UserContext);

    let profileUser = signedInUser;
    if(props.route.params)
        profileUser = props.route.params.userId;

    const [posts, dispatch] = useReducer(reducer, []);
    const [nextToken, setNextToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = async (type, nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByUserAndTimestamp, {
            userID: profileUser,
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken
        }))
        console.log(res);
        dispatch({
            type: type,
            posts: res.data.listPostsSortedByUserAndTimestamp.items
        })
        setNextToken(res.data.listPostsSortedByUserAndTimestamp.nextToken)
        setIsLoading(false);
    };
    const getAdditionalPosts = () => {
        if (nextToken === null) return; //Reached the last page
        getPosts(ADDITIONAL_QUERY, nextToken);
    };

    const [isFollowing, setIsFollowing] = useState(false);

    const getIsFollowing = async ({followeeId, followerId}) => {

        const res = await API.graphql(graphqlOperation(getFollowRelationship, {
            followeeId: followeeId,
            followerId: followerId
        }))
        console.log(res);
        return res.data.getFollowRelationship !== null;

    };

    const [profileURI, setProfileURI] = useState('');

    //this does so much lol
    useEffect(() => {
        if(!signedInUser || !profileUser)
            return;
        const init = async () => {

            setIsFollowing(await getIsFollowing({
                followeeId: profileUser, followerId: signedInUser
            }));

            getPosts(INITIAL_QUERY);
        };
        init();

        //this just gets the profile image, super simple
        API.graphql(graphqlOperation(getUserImage, {
            userID: profileUser
        })).then(result => {
            if(result.data.getUserImage)
                setProfileURI(result.data.getUserImage.uri);
        });

        const mainLifts = ['Squat', 'Bench', 'Press', 'Deadlift'];
        //at last, we get to use user prs
        mainLifts.forEach(exercise => {
            API.graphql(graphqlOperation(listEffortsByExerciseAndUser, {
                userID: profileUser,
                exerciseWeight: {
                    beginsWith: {
                        exercise: exercise
                    }
                },
                sortDirection: "DESC",
                limit: 1//just the PR
            }))
                .then(result => {
                    console.log('prs', result);
                    const items = result.data.listEffortsByExerciseAndUser.items;
                    if(items.length !== 0) {
                        setRecords(prev => ({
                            ...prev,
                            [items[0].exercise]: items[0].orm
                        }));
                    }
                });
        });

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: msg => {
                const post = msg.value.data.onCreatePost;
                if(post.owner !== profileUser)
                    return;
                dispatch({type: SUBSCRIPTION, post: post});
            }
        });
        return () => subscription.unsubscribe();
    }, [signedInUser, profileUser])

    const follow = async () => {
        const input = {
            followeeId: profileUser,
            followerId: signedInUser,
            timestamp: Date.now()
        };
        const res = await API.graphql(graphqlOperation(createFollowRelationship, {
            input: input
        }));
        if(!res.data.createFollowRelationship.errors)//is it errors or error?
            setIsFollowing(true);
    };

    const unfollow = async () => {
        const input = {
            followeeId: profileUser,
            followerId: signedInUser
        };
        const res = await API.graphql(graphqlOperation(deleteFollowRelationship, {
            input: input
        }));
        if(!res.data.deleteFollowRelationship.errors)//is it errors or error?
            setIsFollowing(false);
    };

    const handleGymPress = () => {
        //i guess this should show the gym stats of the user if it's not the same
        //or edit if it is
        if(signedInUser === profileUser)
            props.navigation.navigate('gymmap');
        else{
            //navigate to the gyms home page
            //tbd...
        }

        //https://github.com/afshintalebi/react-native-map-picker/blob/master/src/LocationPicker.js
    };

    const handleProfilePress = () => {
        const options = {
            maxWidth: 1080,//is this important?
            maxHeight: 1080,
            durationLimit: 60,
            mediaType: 'photo'
        }

        launchImageLibrary(options, res => {
            console.log({ res });

            if(res.didCancel)
                console.log('user cancelled');
            else if(res.errorMessage)
                console.log('error', res.errorMessage)
            else{
                //save uri and show image
                console.log(res.uri);
                //setMedia(res.uri);
                //res.uri is what you want

                uploadImage(res.uri)
                    .then(key => {
                        console.log('async worked correct key is', key);
                        API.graphql(graphqlOperation(createUserImage, {
                            input: {
                                userID: signedInUser,
                                uri: key
                            }
                        }))
                            .then(result => {
                                setProfileURI(result.data.createUserImage.uri);
                            });
                    });
            }
        });
    };

    //almost as if you should resuse this code elsewhere...
    const uploadImage = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const urlParts = uri.split('.');
        const extension = urlParts[urlParts.length - 1];
        const key = `${uuidv4()}.${extension}`;
        await Storage.put(key, blob);
        return key;
    };


    //next up, lets clean up the user profile
    //we may eblae to get graphs and shit too

    return (
        <SafeBorderNav {...props} screen={'profile'}>
            <TopBar title={profileUser}/>
            <View style={STYLES.body}>
                <Row style={{padding: 10, justifyContent: 'space-around'}}>
                    <View style={{padding: 10}}>
                        <TouchableOpacity
                            style={{borderRadius: 50, overflow: 'hidden'}}
                            onPress={handleProfilePress}
                        >
                            {
                                profileURI !== '' ?
                                    <S3Image key={profileURI} style={{width: 100, height: 100}} imgKey={profileURI}/> :
                                    <View style={{width: 100, height: 100}}/>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}>
                        <Words style={{fontWeight: 'bold'}}>{profileUser}</Words>
                        <TouchableOpacity onPress={handleGymPress}>
                            <Words>{location[3]}</Words>
                        </TouchableOpacity>
                    </View>
                </Row>
                {
                    (profileUser !== signedInUser) &&
                    (
                        isFollowing ?
                            <TouchableOpacity
                                style={{justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: 100, height: 40, borderColor: PRIMARY, borderWidth: 1}}
                                onPress={unfollow}
                            >
                                <Words style={{fontWeight: 'bold'}}>Unfollow</Words>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: 100, height: 40, backgroundColor: PRIMARY}}
                                onPress={follow}
                            >
                                <Words style={{fontWeight: 'bold'}}>Follow</Words>
                            </TouchableOpacity>
                    )
                }

                <ScrollView>

                    <Words style={{fontWeight: 'bold', fontSize: 40, width: '100%', textAlign: 'left'}}>Stats</Words>
                    <View style={{height: 500, alignItems: 'center', justifyContent: 'space-around'}}>{
                        Object.entries(records).map(([k,v]) =>
                            <Row key={k} style={{display: 'flex', justifyContent: 'space-between'}}>
                                <WeightVisual weight={v} reverse={true} />
                                <Words style={{fontSize: 20, textAlign: 'center'}}>{k + '\n' + v}</Words>
                                <WeightVisual weight={v}/>
                            </Row>
                        )
                    }</View>

                    <PostList
                        isLoading={isLoading}
                        posts={posts}
                        getAdditionalPosts={getAdditionalPosts}
                    />

                </ScrollView>
            </View>
        </SafeBorderNav>
    );
};

const styles = StyleSheet.create({
    cardContainer: {alignItems: 'center', justifyContent: 'center', margin: 5},
});

export default ProfileScreen;
