import * as React from "react";
import { View, StyleSheet } from "react-native";

import {
    Album, MIN_HEADER_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT,
} from './Model';
import Header from "./Header";
import Content from "./Content";
import Cover from "./Cover";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface AlbumProps {
    album: Album;
}

export default ({ album } ) => {
    const { artist } = album;

    const y = useSharedValue(0);

    const style = useAnimatedStyle(() => {
        return {
            transform: [{translateY: -1*Math.min(HEADER_DELTA, y.value)}]
        }

    });

    return (
        <View style={styles.container}>
            <Cover {...{ y, album }} />
            <Content {...{ y, album }} />
            <Header {...{ y, artist }} />
            <Animated.View
                style={{
                    position: "absolute",
                    top: MAX_HEADER_HEIGHT - BUTTON_HEIGHT/2 ,
                    left: 0,
                    right: 0,
                    ...style,
                }}
            >
                <ShufflePlay />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
});
