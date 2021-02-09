import React, {useState} from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Words from '../Components/Words';
import SafeBorderNav from '../Components/SafeBorderNav';
import TopBar from '../Components/TopBar';
import { STYLES } from '../Style/Values';
import Video from 'react-native-video';

const Post = () => {
    const [paused, setPaused] = useState(false);

    const onPlayPausePress = () => setPaused(prev => !prev);

    return (
        <View
            style={{
                width: '100%',
                height: Dimensions.get('window').height
            }}
        >
            <TouchableWithoutFeedback onPress={onPlayPausePress}>
                <Video
                    source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'}}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}
                    onError={e => console.log(e)}
                    resizeMode={'cover'}
                    repeat={true}
                    paused={paused}
                />
            </TouchableWithoutFeedback>
        </View>
    )
};

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
