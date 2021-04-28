import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Image, TouchableOpacity, View } from 'react-native';
import Words from '../Components/Simple/Words';
import { WorkoutContext } from '../Contexts/WorkoutProvider';
import Write from '../Components/Simple/Write';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { CommonActions } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { DARK_GRAY } from '../Style/Colors';
import { UserContext } from '../Contexts/UserProvider';
import { S3Image } from 'aws-amplify-react-native';
import { generateReport } from '../../amplify/backend/function/createPostAndTimeline/src/AnalyzeRoutine/GenerateReport';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SummaryDisplay from '../Components/Workout/SummaryDisplay';

// lets go add media additions, using s3
const ReportScreen = props => {
    const {username, profileURI} = useContext(UserContext);
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
                setMedia(m => [...m, res.uri]);
                //res.uri is what you want
            }
        });
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
            <TopBar title='Workout Preview' rightText='Save' onPressRight={handleNext}/>
            <ScrollView style={{margin: 5}}>
                <Row style={{justifyContent: 'flex-start'}}>
                    {
                        profileURI !== '' &&
                        <S3Image key={profileURI} style={{width: 50, height: 50, borderRadius: 25}} imgKey={profileURI}/>
                    }
                    <Words>{username}</Words>
                </Row>
                <Write
                    placeholder={'Add notes'}
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
                            <Image style={{width: 100, height: 100, marginRight: 5}} source={{uri: uri}}/>
                        )
                    }
                    <TouchableOpacity
                        style={{backgroundColor: DARK_GRAY, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}
                        onPress={selectImage}
                    >
                        <Words style={{fontSize:40}}>+<Ionicons size={40} name={'image'}/></Words>
                    </TouchableOpacity>
                </ScrollView>

                <SummaryDisplay exercises={report}/>
            </ScrollView>
        </SafeBorder>
    );
};

export default ReportScreen;
