import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import Words from '../Components/Simple/Words';
import { WorkoutContext } from '../Contexts/WorkoutProvider';
import Write from '../Components/Simple/Write';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { CommonActions } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DARK_GRAY } from '../Style/Colors';
import { UserContext } from '../Contexts/UserProvider';
import { generateReport } from '../../amplify/backend/function/createPostAndTimeline/src/AnalyzeRoutine/GenerateReport';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SummaryDisplay from '../Components/Workout/SummaryDisplay';
import UserImage from '../Components/Profile/UserImage';
import PostHeader from '../Components/Social/PostHeader';

// lets go add media additions, using s3
const ReportScreen = props => {
    const {username, profileURI, location} = useContext(UserContext);
    const {saveWorkout, workout } = useContext(WorkoutContext);
    //you know what fuck this, report will always be sent as an object.

    //this is fucky
    const [report, setReport] = useState([]);
    //bruh
    useEffect(() => {
        //maybe just like a report preview?
        //this report thing is mostly handles by the lambda
        setReport(generateReport(workout));
        setTitle(workout.title);
    }, [/*workout*/]);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [media, setMedia] = useState([]);

    const selectImage = () => {
        const options = {
            maxWidth: 1080,//is this important?
            maxHeight: 1080,
            durationLimit: 60,
            mediaType: 'photo'
        };

        launchImageLibrary(options, addImageToPost);
    };

    const selectCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, addImageToPost);
    };

    const addImageToPost = res => {
        if(!res.didCancel && !res.errorMessage)
            setMedia(m => [...m, res.uri]);
    };

    const handleNext = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'home'}]
        }))

        saveWorkout({
            title: title,
            description: description,
            media: media
        });
    };

    //ok this should pretty match "post screen"
    //lets make some shared components
    return (
        <SafeBorder>
            <TopBar title='Workout Preview' rightText='Post' onPressRight={handleNext}/>
            <ScrollView style={{margin: 5}}>
                <PostHeader
                    post={{
                        userID: username,
                        createdAt: new Date().getTime(),
                        userImage: {
                            uri: profileURI
                        },
                        gym: {name: location[3]}
                    }}
                    size={40}
                />
                <Write
                    style={{borderWidth: 1, fontSize: 30, height: 40}}
                    value={title}
                    onChange={setTitle}
                />
                <Write
                    value={description}
                    style={{height: 100}}
                    onChange={setDescription}
                    placeholder={'Add Description...'}
                />

                <ScrollView horizontal>
                    {
                        //this pattern has happened many times
                        //where you have a map followed by an add button
                        //all contained in scrollview
                        //hm...
                        media.map(uri =>
                            //<Words>{uri}</Words>
                            <Image key={uri} style={{width: 100, height: 100, marginRight: 5}} source={{uri: uri}}/>
                        )
                    }
                    <TouchableOpacity
                        style={{backgroundColor: DARK_GRAY, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}
                        onPress={selectImage}
                    >
                        <Words style={{fontSize:40}}><Ionicons size={40} name={'image'}/></Words>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor: DARK_GRAY, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}
                        onPress={selectCamera}
                    >
                        <Words style={{fontSize:40}}><Ionicons size={40} name={'camera'}/></Words>
                    </TouchableOpacity>
                </ScrollView>

                <SummaryDisplay exercises={report}/>
            </ScrollView>
        </SafeBorder>
    );
};

export default ReportScreen;
