import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { PRIMARY } from '../Style/Theme';
import WeightVisual from '../Utils/WeightVisual';
import Words from '../Components/Simple/Words';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import {
    getFollowRelationship,
    getUserImage, getUserLocation,
    getUserRecord,
    listPostsSortedByUserAndTimestamp,
} from '../../graphql/queries';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../Components/Navigation/NavBar';
import SafeBorder from '../Components/Navigation/SafeBorder';

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

    //this is useful, but only when viewing yourself
    const {location} = useContext(UserContext);

    let profileUser = signedInUser;
    if(props.route.params)
        profileUser = props.route.params.userID;

    const [isFollowing, setIsFollowing] = useState(false);

    const getIsFollowing = async ({followeeID, followerID}) => {

        const res = await API.graphql(graphqlOperation(getFollowRelationship, {
            followeeID: followeeID,
            followerID: followerID
        }))
        console.log(res);
        return res.data.getFollowRelationship !== null;

    };

    const [profileURI, setProfileURI] = useState('');
    const [gym, setGym] = useState({name: '', id: ''});

    //this does so much lol
    useEffect(() => {
        if(!signedInUser || !profileUser)
            return;
        const init = async () => {

            setIsFollowing(await getIsFollowing({
                followeeID: profileUser, followerID: signedInUser
            }));
        };
        init();

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
                    console.log('prs', result);
                    const record = result.data.getUserRecord;
                    if(record){
                        setRecords(prev => ({
                            ...prev,
                            [record.exercise]: record.orm
                        }));
                    }
                });
        });

    }, [signedInUser, profileUser])

    const follow = async () => {
        const input = {
            followeeID: profileUser,
            followerID: signedInUser,
        };
        const res = await API.graphql(graphqlOperation(createFollowRelationship, {
            input: input
        }));
        if(!res.data.createFollowRelationship.errors)//is it errors or error?
            setIsFollowing(true);
    };

    const unfollow = async () => {
        const input = {
            followeeID: profileUser,
            followerID: signedInUser
        };
        const res = await API.graphql(graphqlOperation(deleteFollowRelationship, {
            input: input
        }));
        if(!res.data.deleteFollowRelationship.errors)//is it errors or error?
            setIsFollowing(false);
    };

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
                        <TouchableOpacity
                            style={{borderRadius: 50, overflow: 'hidden'}}
                            onPress={handleProfilePress}
                        >
                            {
                                profileURI !== '' ?
                                    <S3Image key={profileURI} style={{width: 100, height: 100}} imgKey={profileURI}/> :
                                    <View style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                                        <Words><Ionicons color={'white'} name='person-outline' size={40}/></Words>
                                        <Words>Add image</Words>
                                    </View>
                            }
                        </TouchableOpacity>
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
                {
                    !viewingSelf &&
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
