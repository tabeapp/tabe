import React, { useState } from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import Video from 'react-native-video';
import Words from '../Simple/Words';

const Post = () => {
    const [paused, setPaused] = useState(false);

    const onPlayPausePress = () => setPaused(prev => !prev);

    return (
        <View
            style={{
                width: '100%',
                height: Dimensions.get('window').height*.8
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

            <View style={{
                height: '100%',
                justifyContent: 'flex-end'
            }}>
                <View style={{justifyContent: 'flex-end'}}>
                    <Words style={{fontSize: 20, right: 0}}>Side</Words>
                </View>
                <View>
                    <Words style={{fontSize: 20}}>@daviddobrik</Words>
                    <Words style={{fontSize: 20}}>testing description</Words>
                    <Words style={{fontSize: 20}}>song icon and song</Words>
                </View>
            </View>
        </View>
    )
};

export default Post;
