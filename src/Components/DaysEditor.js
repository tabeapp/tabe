import React, {useState} from 'react';
import { StyleSheet, Animated, PanResponder, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DaysEditor = props => {
    const {editDays} = props;

    const temp = [...props.workouts, 'R'];

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
                //Array.from(new Array(props.time), () => null).map((d,index) =>
                props.days.map((d, index) => {
                    return <View key={index} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '12.5%',
                        height: 40,
                        backgroundColor: '#333',
                        margin: 3
                    }}>
                        <Picker
                            style={{ width: 50, height: 50 }}
                            selectedValue={d}
                            itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                            onValueChange={(value) => {
                                editDays(index, value);
                            }}
                        >
                            {
                                temp.map(item =>
                                    <Picker.Item key={item} color={'white'} label={'' + item} value={item} />
                                )
                            }
                        </Picker>
                    </View>
                    //good enough lol
                })
            }
        </View>
    </>)

};

export default DaysEditor;
