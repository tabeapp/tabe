import React from 'react';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { useAnimatedScrollHandler } from 'react-native-reanimated';
import { View } from 'react-native';

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
//gonna be fucking around with animated here a bit
const ExploreScreen = props => {

    //const scrollHandler = useAnimatedScrollHandler(
         //e => y.value = e.contentOffset.y,
    //);

    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <View style={{flex: 1}}/>
        </SafeBorderNav>
    );
};


export default ExploreScreen;
