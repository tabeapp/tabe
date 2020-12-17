import React, {useState, useRef} from 'react';
import { StyleSheet, Animated, PanResponder, ScrollView, Text, View } from "react-native";

const DraggableDay = props => {
    const [visible, setVisible] = useState(true);
    const pan = useRef(new Animated.ValueXY()).current;

    const isDropZone = gesture => {
        let index = -1;
        console.log(props.dropzones);
        Object.entries(props.dropzones).forEach(([k,dz]) => {
            if(gesture.moveY > dz.y && gesture.moveY < dz.y+dz.height){
                if(gesture.moveX > dz.x && gesture.moveX < dz.x+dz.width)
                    index = k;
            }
        });
        return index;
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y }
            ], {useNativeDriver: false}),
            onPanResponderRelease: (e, gesture) => {
                //which one did we hit?
                const index = isDropZone(gesture);
                if(index === -1)
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false}).start();
                else
                    setVisible(false);
            }
        })
    ).current;

    return (
        visible &&
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
    const [dropzones, setDropzones] = useState([]);

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
                Array.from(new Array(14), () => null).map((d,index) =>
                    //good enough lol
                    <View
                        key={index}
                        onLayout={e => {
                            //console.log(e.nativeEvent.layout);
                            setDropzones({...dropzones, [index]: e.nativeEvent.layout});
                            //setDropzones(dropzones.map((_, i) => {
                                //if(i === index)
                                    //return e.nativeEvent.layout;
                                //else
                                    //return _;
                            //}));
                            //console.log(dropzones);
                        }}
                        style={{ justifyContent: 'center', alignItems: 'center', width: '12.5%', height: 40, backgroundColor: '#333', margin: 3 }} >
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
                <DraggableDay dropzones={dropzones} key={k} value={k}/>
            )

        }</View>
    </>)

};

export default DaysEditor;
