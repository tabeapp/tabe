import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    Easing,
    interpolate,
    multiply, useSharedValue, withTiming,
} from 'react-native-reanimated';


const RestCircle = (props) => {
    const {width} = useWindowDimensions();
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const size = width-32;
    const strokeWidth = 50;
    const radius = (size-strokeWidth)/2;
    const circumference = radius * 2 * Math.PI;

    const progress = useSharedValue(0.0);

    const alpha = interpolate(progress.value,
        [0,1],
        [0, Math.PI*2]
    );

    const strokeDashoffset = multiply(alpha, radius);

    return <View>
        <Svg width={size} height={size}>
            <AnimatedCircle
                stroke="blue"
                fill="none"
                cx={size/2}
                cy={size/2}
                r={radius}
                strokeDasharray={`${circumference} ${circumference}`}
                {...{strokeWidth, strokeDashoffset}}
            />
        </Svg>
        <TouchableOpacity
            style={{width: 100, height: 100, backgroundColor: 'red'}}
            onPress={() =>{
                progress.value = withTiming(1.0, {duration: 1, easing: Easing.linear})
            }}
        />
    </View>
    ;
};

export default RestCircle;
