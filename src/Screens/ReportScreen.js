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
        setReport(generateReport());
        setTitle(workout.title);
    }, [/*workout*/]);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('add description');

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
    }

    //console.log('summary ' + JSON.stringify(workout));

    const handleNext = () => {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'home'}]
        }))

        //combine workout and title and description
        //necessary transformation
        saveWorkout({
            title: title,
            description: description,
            //data: JSON.stringify(report.e.xercises),
            media: media

        });

    };

    //ok this should pretty match "post screen"
    //lets make some shared components
    return (
        <SafeBorder>
            <TopBar title='Workout Summary' rightText='Save' onPressRight={handleNext}/>
            <ScrollView>
                <Row style={{justifyContent: 'flex-start'}}>
                    {
                        profileURI !== '' &&
                        <S3Image key={profileURI} style={{width: 50, height: 50, borderRadius: 25}} imgKey={profileURI}/>
                    }
                    <Words>{username}</Words>
                </Row>
                <Write
                    placeholder={'Add notes'}
                    style={{fontSize: 20, height: 100}}
                    value={title}
                    onChange={setTitle}
                />
                <Write
                    value={description}
                    onChange={setDescription}
                    placeholder={'Add Description'}
                />
                {
                    media.map(uri =>
                        //<Words>{uri}</Words>
                        <Image style={{width: 50, height: 50}} source={{uri: uri}}/>
                    )
                }
                <TouchableOpacity
                    style={{backgroundColor: 'gray', width: 100, height: 100}}
                    onPress={selectImage}
                >
                    <Words>Add image</Words>
                </TouchableOpacity>
                {
                    report.map(ex =>
                        <View style={{margin: 5, padding: 4, backgroundColor: DARK_GRAY}} key={ex.name}>
                            <Words style={{fontSize: 20}}>{ex.name}</Words>
                            {
                                ex.work.map((set,i) =>

                                    <Words key={i} style={{fontSize: 20}}>
                                        {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                    </Words>)
                            }
                        </View>
                    )
                }
            </ScrollView>
        </SafeBorder>
    );
};

export default ReportScreen;
