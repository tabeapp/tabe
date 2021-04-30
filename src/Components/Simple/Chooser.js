import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { TEXT_COLOR } from '../../Style/Colors';

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
                    color={TEXT_COLOR}
                    label={'' + item}
                    value={item}
                />
            )
        }
    </Picker>;
};

const styles = StyleSheet.create({
    pickerStyle: {
        width: 50,
    },
    itemStyle: {
        height: 100,
    },
});

export default Chooser;
