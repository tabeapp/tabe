import React from 'react';
import { Picker } from "@react-native-picker/picker";
import { FONT } from "../Style/Values";
import { StyleSheet } from "react-native";

//my version of picker, whose style I just keep
const Chooser = ({selected, onChange, list, style, itemStyle}) => {
    return <Picker
        style={{...styles.pickerStyle, ...style}}
        selectedValue={selected}
        itemStyle={{...styles.itemStyle, ...itemStyle}}
        onValueChange={value => onChange(value)}
    >
        {
            list.map(item =>
                <Picker.Item
                    key={item}
                    color={'white'}
                    label={'' + item}
                    value={item}
                />
            )
        }
    </Picker>
};

const styles = StyleSheet.create({
    pickerStyle: {
        width: 50,
        height: 50,
    },
    itemStyle: {
        fontSize: 20,
        borderRadius: 0,
        fontFamily: FONT,
        height: 50
    }
});

export default Chooser;
