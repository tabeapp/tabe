import React from 'react';
import CachedImage from '../Social/CachedImage';
import Animated, { interpolate, useAnimatedStyle, Extrapolate } from 'react-native-reanimated';
import { Dimensions, StyleSheet } from 'react-native';
import { STYLES } from '../../Style/Values';

const Background = props => {
    const {profileURI, y} = props;

    const {height, width} = Dimensions.get('window')


    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(y.value,
            [-height, 0],
            [6, 1],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(y.value,
            [-64, 0, 24],
            [0, 0.2, 1],
            Extrapolate.CLAMP
        )

        return {
            transform: [{scale}],
            opacity
        };
    }, [y.value]);

    return <Animated.View style={[styles.background, animatedStyle]}>
        <CachedImage imageKey={profileURI} style={{width:width, height:200}}/>
    </Animated.View>
};

const styles = StyleSheet.create({
    background: {
        //...StyleSheet.absoluteFillObject,
        //backgroundColor: 'blue',
        //width: 200,
        //height: 200
    }
})

export default Background;
