import React, {useState, useContext, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { UserContext } from '../Contexts/UserProvider';
import { getUserStats } from '../../graphql/queries';
import { createUserStats } from '../../graphql/mutations';

const SettingsScreen = props => {
    const {username} = useContext(UserContext);

    const [stats, setStats] = useState({});

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
                        birthday: new Date().toString(),//idk
                        height: 68,
                        weight: 150,
                        male: true
                    }
                }));

            }
            else{
                setStats(result)
            }
        });

    }, [username]);



    const signOut = () => {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    return (
        <SafeBorder>
            <TopBar title='Settings'/>
            <TouchableOpacity style={{width: '100%', alignItems: 'center'}} onPress={signOut} >
                <Words style={{color: 'red', fontSize: 25}}>Sign out</Words>
            </TouchableOpacity>
            <Words>{JSON.stringify(stats)}</Words>
        </SafeBorder>
    );
};

export default SettingsScreen;
