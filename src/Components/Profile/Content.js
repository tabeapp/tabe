import * as React from 'react';
import {
    StyleSheet, View, Text, ScrollView,
} from 'react-native';
//import { LinearGradient } from "expo-linear-gradient";

import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA } from './Model';
import Track from './Track';
import Svg, { LinearGradient, Stop } from 'react-native-svg';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
} from 'react-native-reanimated';

interface ContentProps {
  album: Album;
}

export default ({ album: { artist, tracks }, y }: ContentProps) => {
    const height = MAX_HEADER_HEIGHT;

    const scrollHandler = useAnimatedScrollHandler(e =>
        y.value = e.contentOffset.y
    );

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: interpolate(y.value,
                [-MAX_HEADER_HEIGHT, 0],
                [0, MAX_HEADER_HEIGHT],
                Extrapolate.CLAMP
            )
        }
    });

    const textStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value,
                [-MAX_HEADER_HEIGHT/2, 0, MAX_HEADER_HEIGHT/2],
                [0,1,0],
            Extrapolate.CLAMP
            )
        }
    }, [y.value]);


    return (
        <Animated.ScrollView
            onScroll={scrollHandler}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
        >
            <View style={styles.header}>
                <View
                    style={[styles.gradient, { height }]}
                >
                    <View style={{...StyleSheet.absoluteFill, top: 300, height: 150, backgroundColor: 'black'}}/>
                </View>
                <View style={styles.artistContainer}>
                    <Animated.Text style={[styles.artist, textStyles]}>{artist}</Animated.Text>
                </View>
            </View>
            <View style={styles.tracks}>
                {
                    tracks.map((track, key) => (
                        <Track
                            index={key + 1}
                            {...{ track, key, artist }}
                        />
                    ))
                }
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: MAX_HEADER_HEIGHT,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
    },
    artistContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    artist: {
        textAlign: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
    },
    tracks: {
        paddingTop: 32,
        backgroundColor: 'black',
    },
});
