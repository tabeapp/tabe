import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
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
import { S3Image } from 'aws-amplify-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuidv4 } from 'uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../Components/Navigation/NavBar';
import SafeBorder from '../Components/Navigation/SafeBorder';
import FollowButton from '../Components/Profile/FollowButton';
import CachedImage from '../Components/Social/CachedImage';
import UserImage from '../Components/Profile/UserImage';

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


    const [profileURI, setProfileURI] = useState('');
    const [gym, setGym] = useState({name: '', id: ''});

    //this does so much lol
    useEffect(() => {
        if(!signedInUser || !profileUser)
            return;

        //this just gets the profile image, super simple
        API.graphql(graphqlOperation(getUserImage, {
            userID: profileUser
        })).then(result => {
            if(result.data.getUserImage)
                setProfileURI(result.data.getUserImage.uri);
        });

        //jsut get gym name
        API.graphql(graphqlOperation(getUserLocation, {
            userID: profileUser
        })).then(result => {
            if(result.data.getUserLocation)
                setGym(result.data.getUserLocation.gym);
        })

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
        <SafeBorder {...props} screen={'profile'}>
            {
                viewingSelf ?
                    <TopBar
                        title={profileUser}
                        rightText='Settings'
                        onPressRight={() => props.navigation.navigate('settings')}
                    />:
                    <TopBar title={profileUser}/>
            }
            <View style={STYLES.body}>
                <Row style={{padding: 10, justifyContent: 'space-around'}}>
                    <View style={{padding: 10}}>
                        <UserImage onPress={handleProfilePress} imageKey={profileURI} userID={profileUser} size={100}/>
                    </View>

                    <View style={{flex:1}}>
                        <Words style={{fontWeight: 'bold'}}>{profileUser}</Words>
                        <TouchableOpacity onPress={handleGymPress}>{
                            //no, you can't use location, you need to load the users location
                            (viewingSelf && !location[3]) ?
                                <Words>Set Gym</Words>
                                :
                                <Words>{gym.name}</Words>
                        }</TouchableOpacity>
                    </View>
                </Row>
                <FollowButton profileUser={profileUser}/>

                <ScrollView>

                    <Words style={{fontWeight: 'bold', fontSize: 40, width: '100%', textAlign: 'left'}}>Maxes</Words>
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

                </ScrollView>
            </View>
            {
                viewingSelf &&
                <NavBar current={'profile'}/>
            }
        </SafeBorder>
    );
};

export default ProfileScreen;
