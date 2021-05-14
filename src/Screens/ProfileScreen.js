import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, useWindowDimensions, SafeAreaView } from 'react-native';
import WeightVisual from '../Utils/WeightVisual';
import Words from '../Components/Simple/Words';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
    getUserImage,
    getUserLocation,
    getUserRecord,
    listPostsSortedByUserAndTimestamp,
} from '../../graphql/queries';
import PostList from '../Components/Social/PostList';
import { onCreatePost } from '../../graphql/subscriptions';
import { createUserImage } from '../../graphql/mutations';
import { UserContext } from '../Contexts/UserProvider';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import NavBar from '../Components/Navigation/NavBar';
import SafeBorder from '../Components/Navigation/SafeBorder';
import FollowButton from '../Components/Profile/FollowButton';
import UserImage from '../Components/Profile/UserImage';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { BACKGROUND, DARK_GRAY, PRIMARY, PRIMARY_DARKER } from '../Style/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CachedImage from '../Components/Social/CachedImage';

const ProfileScreen = props => {
    //fuck it, we'll just do it straight from this without using the context
    const [records, setRecords] = useState({
        Bench: {weight: 0},
        Squat: {weight: 0},
        Press: {weight: 0},
        Deadlift: {weight: 0},
    });

    //post loading bs part
    const signedInUser = useContext(UserContext).username;

    //this is useful, but only when viewing yourself
    const {location} = useContext(UserContext);

    let profileUser = signedInUser;
    if(props.route.params)
        profileUser = props.route.params.userID;

    const [gym, setGym] = useState({name: '', id: ''});
    const [imageKey, setImageKey] = useState('');

    //this does so much lol
    useEffect(() => {
        if(!signedInUser || !profileUser)
            return;

        //jsut get gym name
        API.graphql(graphqlOperation(getUserLocation, {
            userID: profileUser
        })).then(result => {
            if(result.data.getUserLocation)
                setGym(result.data.getUserLocation.gym);
        });

        API.graphql(graphqlOperation(getUserImage, {
            userID: profileUser
        })).then(result => {
            if(result.data.getUserImage)
                setImageKey(result.data.getUserImage.uri);
        });

        //todo just get the userRecord objects
        const mainLifts = ['Squat', 'Bench', 'Press', 'Deadlift'];
        //at last, we get to use user prs
        mainLifts.forEach(exercise => {
            //shoudl work lol
            API.graphql(graphqlOperation(getUserRecord, {
                userID: profileUser,
                exercise: exercise
            }))
                .then(result => {
                    const record = result.data.getUserRecord;
                    if(record){
                        setRecords(prev => ({
                            ...prev,
                            [record.exercise]: {
                                weight: record.orm,
                                postID: record.postID
                            }
                        }));
                    }
                });
        });

    }, [signedInUser, profileUser])

    const viewingSelf = signedInUser === profileUser;

    const handleGymPress = () => {
        //i guess this should show the gym stats of the user if it's not the same
        //or edit if it is
        if(viewingSelf)
            props.navigation.navigate('gymmap');
        else{
            //navigate to the gyms home page
            //tbd...
            props.navigation.navigate('leaderboard', {gymID: gym.id, exercise: 'Squat'});
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

            if(!res.didCancel && !res.errorMessage){
                //save uri and show image
                //setMedia(res.uri);
                //res.uri is what you want

                uploadImage(res.uri)
                    .then(key => {
                        API.graphql(graphqlOperation(createUserImage, {
                            input: {
                                userID: signedInUser,
                                uri: key
                            }
                        }))
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

    const y = useSharedValue(0);

    const HEADER_MAX_HEIGHT = 120;

    const {width} = useWindowDimensions();
    const imageHeight = width;

    const simpleHeaderStyle = useAnimatedStyle(() => ({
        opacity: interpolate(y.value,
            [imageHeight-25, imageHeight],
            [0, 1],
            Extrapolate.CLAMP,
        ),
    }));

    const scrollHandler = useAnimatedScrollHandler(e =>
        y.value = e.contentOffset.y
    );

    const imageStyle = useAnimatedStyle(() => {
        const scale = interpolate(y.value,
            [-width, 0, width/2],
            [4, 1.2, 1],
            Extrapolate.CLAMP
        );
        const opacity = interpolate(y.value,
            [-width, 0, width],
            [0, 1, 0],
            Extrapolate.CLAMP
        );
        return {
            transform: [{scale}],
            opacity
        };

    });

    const fadeInProfile = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value,
                [imageHeight-25, imageHeight],
                [0, 1],
                Extrapolate.CLAMP
            )
        }

    });

    return (
        <View style={{flex: 1, backgroundColor: BACKGROUND}}>
            <Animated.View style={[{position: 'absolute'}, imageStyle]}>
                <CachedImage imageKey={imageKey} style={{height: width, width: width}}/>
            </Animated.View>


            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>


                    <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, top: 0, right: 0}}>
                        {
                            viewingSelf?
                                <TouchableOpacity onPress={() => props.navigation.navigate('settings')}>
                                    <Words><Ionicons size={30} name='settings-outline'/></Words>
                                </TouchableOpacity>
                                :
                                <FollowButton profileUser={profileUser}/>
                        }
                    </View>

                    <Animated.View style={[{zIndex: 5, position: 'absolute', top: 10, left: 10}, fadeInProfile]}>
                        <UserImage onPress={handleProfilePress} imageKey={imageKey} userID={profileUser} size={100}/>
                    </Animated.View>


                    <Animated.View style={[{ alignItems: 'center', right:0,left: 0, top: 0, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: PRIMARY_DARKER, height: 60, justifyContent: 'center'}, simpleHeaderStyle]}>
                        <Words style={{fontSize: 30, fontWeight: 'bold'}}>{profileUser}</Words>
                    </Animated.View>


                    <Animated.ScrollView
                        onScroll={scrollHandler}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}
                    >
                        <View
                            style={{backgroundColor: BACKGROUND, top: imageHeight-HEADER_MAX_HEIGHT}}
                        >

                            {/*make this just chill at top*/}

                            <Words style={{fontWeight: 'bold'}}>{profileUser}</Words>
                            <TouchableOpacity onPress={handleGymPress}>{
                                //no, you can't use location, you need to load the users location
                                //should add more stuff here that isn't visible on close
                                (viewingSelf && !location[3]) ?
                                    <Words>Set Gym</Words>
                                    :
                                    <Words>{gym.name}</Words>
                            }</TouchableOpacity>

                            <Words style={{fontWeight: 'bold', fontSize: 40, textAlign: 'left'}}>Maxes</Words>
                            <View style={{height: 500, alignItems: 'center', justifyContent: 'space-around'}}>{
                                Object.entries(records).map(([k,v]) =>
                                    <TouchableOpacity key={k} onPress={() =>
                                        props.navigation.navigate('post', {postID: v.postID})
                                    }>
                                        <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <WeightVisual weight={v.weight} reverse={true} />
                                            <Words style={{fontSize: 20, textAlign: 'center'}}>{k + '\n' + v.weight}</Words>
                                            <WeightVisual weight={v.weight}/>
                                        </Row>
                                    </TouchableOpacity>
                                )
                            }</View>

                            <PostList
                                listOperation={listPostsSortedByUserAndTimestamp}
                                sortKey={'userID'}
                                sortValue={profileUser}
                                filledSubscriptionOperation={graphqlOperation(onCreatePost)}
                                subscriptionCriteria={post =>
                                    post.userID === profileUser
                                }
                            />
                        </View>

                    </Animated.ScrollView>

                    <NavBar current={'profile'}/>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ProfileScreen;
