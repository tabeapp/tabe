import * as React from 'react';
import { Dimensions, Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Album, HEADER_DELTA, MAX_HEADER_HEIGHT } from './Model';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export default ({ album: { cover }, y }) => {
    const scale: any = 1;
    const opacity = 0.2;

    const {height} = useWindowDimensions();

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: interpolate(y.value,
                [-MAX_HEADER_HEIGHT, 0],
                [4, 1],
                Extrapolate.CLAMP )
            }],
            opacity: interpolate(y.value,
               [-64, 0, HEADER_DELTA],
                [1, 0.2, 0],
                Extrapolate.CLAMP)
        }
    }, [y.value]);

    return (

        <Animated.View style={[styles.container, animatedStyles]}>
            <Image style={styles.image} source={cover} />
            <View
                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: MAX_HEADER_HEIGHT,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
    },
});
