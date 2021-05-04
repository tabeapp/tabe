import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    Easing,
    interpolate, interpolateColor,
    useAnimatedProps, useSharedValue, withTiming,
} from 'react-native-reanimated';


const RestCircle = (props) => {
    const width = 200;
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const size = width-32;
    const strokeWidth = 5;
    const radius = (size-strokeWidth)/2;
    const circumference = radius * 2 * Math.PI;

    const progress = useSharedValue(0.0);

    const animatedProps = useAnimatedProps(() => {

        const strokeDashoffset = interpolate(progress.value, [0, 1 ], [0, Math.PI * 2], 'CLAMP' ) * radius;
        const stroke = interpolateColor(progress.value,
            [0,1],
            ['green', 'red'],
        );
        return {
            strokeDashoffset,
            stroke,
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
        <TouchableOpacity
            style={{width: 100, height: 100, backgroundColor: 'red'}}
            onPress={() =>{
                progress.value = withTiming(1.0, {duration: 3000, easing: Easing.linear})
            }}
        />
    </View>;
};

export default RestCircle;
