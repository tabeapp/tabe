import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { interpolate, multiply } from 'react-native-reanimated';


const RestCircle = ({progress}) => {
    return <View></View>;
    /*const {width} = useWindowDimensions();
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const size = width-32;
    const strokeWidth = 50;
    const radius = (size-strokeWidth)/2;
    const circumference = radius * 2 * Math.PI;

    const alpha = interpolate(progress, {
        inputRange: [0,1],
        outputRange: [0, Math.PI*2]
    });

    const strokeDashoffset = multiply(alpha, radius);

    return <Svg width={size} height={size}>
        <AnimatedCircle
            stroke="blue"
            fill="none"
            cx={size/2}
            cy={size/2}
            r={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            {...{strokeWidth, strokeDashoffset}}
        />

    </Svg>;*/
};

export default RestCircle;
