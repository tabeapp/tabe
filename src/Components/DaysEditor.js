import React from 'react';
import { Animated, PanResponder, ScrollView, Text, View } from "react-native";

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
                <Text key={k} style={{ textAlign: 'center', flex: 1, color: 'white' }}>{k}</Text>
            )

        }</View>
    </>)

};

export default DaysEditor;
