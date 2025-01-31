import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    Extrapolate,
    interpolate, interpolateColor,
    useAnimatedProps,
} from 'react-native-reanimated';

const RestCircle = ({progress}) => {
    const width = 200;
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const size = width-32;
    const strokeWidth = 5;
    const radius = (size-strokeWidth)/2;
    const circumference = radius * 2 * Math.PI;

    const animatedProps = useAnimatedProps(() => {

        const strokeDashoffset = interpolate(progress.value, [0, 1 ], [0, Math.PI * 2], Extrapolate.CLAMP ) * radius;
        const stroke = interpolateColor(progress.value,
            [0,1],
            ['green', 'red'],
        );

        return {
            strokeDashoffset,
            stroke: stroke,
        };
    });


    return <View>
        <Svg
            width={size} height={size}
            style={{transform: [{rotate:'-90 deg'}]}} //seems easiest
        >
            <AnimatedCircle
                fill="none"
                cx={size/2}
                cy={size/2}
                r={radius}
                strokeDasharray={`${circumference} ${circumference}`}
                {...{strokeWidth, animatedProps}}
            />
        </Svg>
    </View>;
};

export default RestCircle;
