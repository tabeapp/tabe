import React, { useContext, useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { UserContext } from '../Contexts/UserProvider';
import { getUserStats } from '../../graphql/queries';
import { createUserStats, updateUserStats } from '../../graphql/mutations';
import Row from '../Components/Simple/Row';
import { DARK_GRAY, TEXT_COLOR } from '../Style/Colors';
import NumericSelector from '../Components/Routine/NumericSelector';
import { INCH_TO_HEIGHT } from '../Utils/UtilFunctions';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import GenderSelector from '../Components/Profile/GenderSelector';
import Ionicons from 'react-native-vector-icons/Ionicons';

//looks messy but it's got the necessary stuff
const SettingsScreen = props => {
    const {username} = useContext(UserContext);

    const [male, setMale] = useState(true);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [birthday, setBirthday] = useState(new Date());

    const {location} = useContext(UserContext);

    useEffect(() => {
        if(!username)
            return;

        API.graphql(graphqlOperation(getUserStats, {
            userID: username
        })).then(result => {
            //somehow missing, make a new one
            if(!result.data.getUserStats){
                API.graphql(graphqlOperation(createUserStats, {
                    input: {
                        userID: username,
                        birthday: new Date().setHours(0,0,0,0).toString(),//idk
                        height: 68,
                        weight: 150,
                        male: true
                    }
                }));

            }
            else{
                const stats = result.data.getUserStats;

                setMale(stats.male);
                setHeight(stats.height);
                setWeight(stats.weight);
                setBirthday(new Date(stats.birthday));
            }
        });

    }, [username]);

    const signOut = () => {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const formatHeight = INCH_TO_HEIGHT(height);

    return (
        <SafeBorder>
            <TopBar
                title='Settings' rightText={<Ionicons size={30} color={TEXT_COLOR} name={'checkmark'}/>}
                onPressRight={() => {
                    API.graphql(graphqlOperation(updateUserStats, {
                        input: {
                            userID: username,
                            male: male,
                            height: height,
                            weight: weight,
                            birthday: birthday,
                        }
                    }));
                    props.navigation.goBack();
                    //save to server
                }}
            />


            <View style={{flex: 1}}>
                <RNDateTimePicker
                    value={birthday}
                    onChange={(e, date) => setBirthday(date)}
                    maximumDate={new Date()}
                    style={{height: 50}}
                />
                <Row>
                    <Row>
                        <NumericSelector
                            style={{height: 70}}
                            itemStyle={{height: 70}}
                            numInfo={{def: formatHeight.feet, min: 4, max: 7, increment: 1}}
                            onChange={v => setHeight(v*12 + formatHeight.inches) }
                        />
                        <Words style={{fontSize: 25}}>'</Words>
                        <NumericSelector
                            style={{height: 70}}
                            itemStyle={{height: 70}}
                            numInfo={{def: formatHeight.inches, min: 0, max: 11, increment: 1}}
                            onChange={v => setHeight(formatHeight.feet*12 + v) }
                        />
                        <Words style={{fontSize: 25}}>"</Words>
                    </Row>

                    <Row>
                        <NumericSelector
                            style={{height: 70}}
                            itemStyle={{height: 70}}
                            numInfo={{def: weight, min: 50, max: 500, increment: 1}}
                            onChange={setWeight}
                        />
                        <Words>lb</Words>
                    </Row>


                </Row>

                <GenderSelector male={male} setMale={setMale}/>

                <TouchableOpacity style={{justifyContent: 'center', position: 'absolute', height: 50, bottom: 0, backgroundColor: DARK_GRAY, width: '100%', alignItems: 'center'}} onPress={signOut} >
                    <Words style={{color: 'red', fontSize: 25}}>Sign out</Words>
                </TouchableOpacity>
                <Pressable
                    style={{height: 50, backgroundColor: DARK_GRAY, justifyContent: 'center'}}
                    onPress={() => props.navigation.navigate('gymmap') }
                >
                    <Words>{location[3]}</Words>
                </Pressable>
            </View>
        </SafeBorder>
    );
};

export default SettingsScreen;
