import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MIN_HEADER_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT } from './Model';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface HeaderProps {
  artist: string;
}

export default ({ artist, y }) => {
    const boxStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value,
                [HEADER_DELTA-16, HEADER_DELTA],
                [0,1],
                Extrapolate.CLAMP
            )
        };
    }, [y.value]);

    const textStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value,
                [HEADER_DELTA, HEADER_DELTA+4],
                [0,1],
                Extrapolate.CLAMP
            )
        };
    }, [y.value]);

    return (<Animated.View style={[styles.container, boxStyles]}>
        <Animated.Text style={[styles.title, textStyles]}>{artist}</Animated.Text>
    </Animated.View>);
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        left: 0,
        right: 0,
        height: MIN_HEADER_HEIGHT,
        backgroundColor: 'black',
        paddingTop: 20
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
    },
});
