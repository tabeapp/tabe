import React, {useRef} from 'react';
import { StyleSheet, Animated, PanResponder, ScrollView, Text, View } from "react-native";

const DraggableDay = props => {
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
        <Animated.View
            style={{
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder.panHandlers}
        >
            <View style={{backgroundColor: 'red', width: 30, height: 30}}>
                <Text>{props.value}</Text>
            </View>
        </Animated.View>
    );
};

const DaysEditor = props => {
    return (<>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {
                //just to mark days of week
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dow =>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '12.5%', height: 20, margin: 3 }} >
                        <Text style={{color: 'white'}}>{dow}</Text>
                    </View>
                )
            }
            {/*so this is like a schedule planner thing*/
                //you have no idea how complex this is about to get
                Array.from(new Array(14), () => null).map(d =>
                    //good enough lol
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '12.5%', height: 30, backgroundColor: '#333', margin: 3 }} >
                        {
                            d===null &&
                            <Text style={{color: '#811212'}}>R</Text>
                        }
                        {
                            d!==null &&
                            <Text style={{color: 'white'}}>{d}</Text>
                        }
                    </View>
                )
            }
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>{
            //Object.keys(workouts).map(k =>
            ['A', 'B', 'C', 'D'].map(k =>
                <DraggableDay value={k}/>
            )

        }</View>
    </>)

};

export default DaysEditor;
