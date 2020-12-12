import React, {useState} from 'react';
import SmoothPicker from 'react-native-smooth-picker';
import { View, FlatList, ScrollView, Text } from "react-native";

//im making my own, screw the libs
//notes:
//min reps is 0, max reps is lets say 50 width __ is good
//min weight is 0, max weight is... 1000, width __ is good
const NumericSelector = () => {

    const [selected, setSelected] = useState(0);

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



    //const temp = Array.from({length: 200}, (_,i) => i*5);


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
        <SmoothPicker
            style={{height: 70, borderRadius: 5, backgroundColor: 'white', maxWidth: 100}}
            onSelected={({_, index}) => {setSelected(index)/*this is key*/}}
            data={temp}
            renderItem={({item, index}) => {
                const color = index===selected?'blue':'black';
                return (
                    <Text key={item} style={{backgroundColor: 'gray', borderColor: 'red', borderWidth: 1, color: color, textAlign: 'center', fontSize: 40}}>{
                        item
                    }</Text>
                )
            }}
        />

        //this has a weird gray box
        /*<Picker
            selectedValue={0}
            style={{width: 100}}
            itemStyle={{fontSize: 40, borderRadius: 5, height: 70, backgroundColor:'white'}}
            //onValueChange={() => {}}
        >
            {
                temp.map(item =>
                    <Picker.Item label={''+item} value={item} style={{}}/>
                )
            }
        </Picker>*/

    );
};

export default NumericSelector;
