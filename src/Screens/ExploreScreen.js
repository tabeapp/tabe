import React from 'react';
import { View } from 'react-native';
import HeaderFooter from '../Components/Navigation/HeaderFooter';

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
//gonna be fucking around with animated here a bit
const ExploreScreen = props => {

    //const scrollHandler = useAnimatedScrollHandler(
         //e => y.value = e.contentOffset.y,
    //);

    return (
        <HeaderFooter {...props} screen={'explore'}>
            <View style={{flex: 1}}/>
        </HeaderFooter>
    );
};


export default ExploreScreen;
