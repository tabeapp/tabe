import React from 'react';
import { Picker } from "@react-native-picker/picker";
import { FONT } from "../Style/Values";
import { PickerItem } from "./PickerItem";
import { StyleSheet, TouchableOpacity } from "react-native";

//my version of picker, whose style I just keep
const Chooser = ({selected, onChange, list, style}) => {
    return <Picker
        style={{...styles.pickerStyle, ...style}}
        selectedValue={selected}
        itemStyle={styles.itemStyle}
        onValueChange={value => onChange(value)}
    >
        {
            list.map(PickerItem)
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
