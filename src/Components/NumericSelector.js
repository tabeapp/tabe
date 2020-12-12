import React from 'react';
import { View, FlatList, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

//im making my own, screw the libs
//notes:
//min reps is 0, max reps is lets say 50 width __ is good
//min weight is 0, max weight is... 1000, width __ is good
const NumericSelector = () => {
    const onViewableItemsChanged = ({viewableItems, changed}) => {
        console.log('Visible items are', viewableItems);
        console.log('Change in this iteration', changed)
    };
    //props will include a onchnage, which will updated teh reps or wahtever
    //props should also include min, max, increment

    const temp = [];
    for(let i = 0; i < 1000; i += 5)
        temp.push(i);

    const renderNumber = ({item}) =>
        <Text style={{textAlign: 'center', fontSize: 40}}>{
            item
        }</Text>;


    //how the fuck do you keep this from growin
    /*return (
        <FlatList
            style={{maxWidth: 80, borderRadius: 5, height: 50, backgroundColor: 'white'}}
            data={temp}
            keyExtractor={item => item}
            renderItem={renderNumber}
            onViewableItemsChanged={
                ({viewableItems, changed}) => {
                    console.log('Visible items are', viewableItems);
                    console.log('Change in this iteration', changed)
                }
            }
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        />
    );*/

    return (
        <View style={{height: 60}}>

            <Picker
                selectedValue={0}
                style={{top: -90, height: 0, width: 80, borderRadius: 5, backgroundColor: 'white'}}
                //onValueChange={() => {}}
            >{
                temp.map(item =>
                    <Picker.Item style={{color: 'white'}} label={''+item} value={item}/>
                )
            }</Picker>
        </View>

    );
};

export default NumericSelector;
