import React from 'react';
import { TouchableOpacity } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import { Auth } from 'aws-amplify';

const SettingsScreen = props => {

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
        </SafeBorder>
    );
};

export default SettingsScreen;
