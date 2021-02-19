import React from 'react';
import { View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import Post from '../Components/Social/Post';

//https://www.youtube.com/watch?v=TGg9WNLUZPc
//also not bad https://www.youtube.com/watch?v=nvB3ZhHGsOE
const TutorialScreen = props => {
    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Explore'/>
            <View style={STYLES.body}>
                <Words>Home Screen</Words>
                <Post/>
            </View>
        </SafeBorderNav>
    );
};

export default TutorialScreen;
