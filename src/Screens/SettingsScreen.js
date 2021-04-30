import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { UserContext } from '../Contexts/UserProvider';
import { getUserStats } from '../../graphql/queries';
import { createUserStats, updateUserStats } from '../../graphql/mutations';
import Row from '../Components/Simple/Row';
import { BACKGROUND, DARK_GRAY, PRIMARY } from '../Style/Colors';
import NumericSelector from '../Components/Routine/NumericSelector';
import { INCH_TO_HEIGHT } from '../Utils/UtilFunctions';

const SettingsScreen = props => {
    const {username} = useContext(UserContext);

    const [male, setMale] = useState(true);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [birthday, setBirthday] = useState('');


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
                console.log(stats);

                setMale(stats.male);
                setHeight(stats.height);
                setWeight(stats.weight);
                setBirthday(stats.birthday);
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
                title='Settings' rightText='Save'
                onPressRight={() => {
                    API.graphql(graphqlOperation(updateUserStats, {
                        input: {
                            userID: username,
                            male: male,
                            height: height,
                            weight: weight,
                            birthday: birthday,
                        }
                    }))
                    //save to server
                }}
            />


            <View style={{flex: 1}}>
                <Words>{birthday}</Words>
                <Row>
                    <Row>

                        <NumericSelector
                            numInfo={{def: formatHeight.feet, min: 4, max: 7, increment: 1}}
                            onChange={v => setHeight(v*12 + formatHeight.inches) }
                        />
                        <Words style={{fontSize: 25}}>'</Words>
                        <NumericSelector
                            numInfo={{def: formatHeight.inches, min: 0, max: 11, increment: 1}}
                            onChange={v => setHeight(formatHeight.feet*12 + v) }
                        />
                        <Words style={{fontSize: 25}}>"</Words>
                    </Row>

                    <Row>
                        <NumericSelector
                            numInfo={{def: weight, min: 50, max: 500, increment: 1}}
                            onChange={setWeight}
                        />
                        <Words>lb</Words>
                    </Row>


                </Row>

                <Row>
                    <TouchableOpacity
                        style={{backgroundColor: male? PRIMARY: BACKGROUND, borderColor: PRIMARY, borderWidth: 1, flex: 1, alignItems: 'center'}}
                        onPress={() => setMale(true)}>
                        <Words style={{fontSize: 20}}>Male</Words>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor: male? BACKGROUND: PRIMARY, borderColor: PRIMARY, borderWidth: 1, flex: 1, alignItems: 'center'}}
                        onPress={() => setMale(false)}>
                        <Words style={{fontSize: 20}}>Female</Words>
                    </TouchableOpacity>
                </Row>

                <TouchableOpacity style={{justifyContent: 'center', position: 'absolute', height: 50, bottom: 0, backgroundColor: DARK_GRAY, width: '100%', alignItems: 'center'}} onPress={signOut} >
                    <Words style={{color: 'red', fontSize: 25}}>Sign out</Words>
                </TouchableOpacity>
            </View>
        </SafeBorder>
    );
};

export default SettingsScreen;
