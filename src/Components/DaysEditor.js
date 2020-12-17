import React, {useRef} from 'react';
import { StyleSheet, Animated, PanResponder, ScrollView, Text, View } from "react-native";

const Box = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y }
            ], {useNativeDriver: false}),
            onPanResponderRelease: () => {
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false}).start();
            }
        })
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Drag & Release this box!</Text>
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <View style={{backgroundColor: 'red', width: 30, height: 30}}/>
            </Animated.View>
        </View>
    );
};

const DraggableDay = props => {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => {},
            onPanResponderMove: Animated.event([
                null,
                {dx: pan.x, dy: pan.y}
            ]),
            onPanResponderRelease: () => {
                Animated.spring(pan, {toValue: {x:0, y:0}
                }).start()
            }
        })
    ).current;

    return (
        <Animated.View
            style={{
                transform: [{translateX: pan.x}, {translateY: pan.y}]
            }}
            {...panResponder.panHandlers}
        >

        </Animated.View>
    )
}

const DaysEditor = props => {
    return (<>
        <View style={{ flexDirection: 'row' }}>
            {/*so this is like a schedule planner thing*/
                //you have no idea how complex this is about to get
                Array.from(new Array(14), () => null).map(d =>
                    <View style={{ flex: 1, height: 20, backgroundColor: '#333', margin: 3 }} />
                )
            }
        </View>
        <View style={{ flexDirection: 'row' }}>{
            //Object.keys(workouts).map(k =>
            ['A', 'B', 'C', 'D'].map(k =>
                <Box/>
            )

        }</View>
    </>)

};

const styles = StyleSheet.create({
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});
export default DaysEditor;
