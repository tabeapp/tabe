
//I literally reuse this very code 11 times
import React from 'react';
import { Picker } from '@react-native-picker/picker';

export const PickerItem = item => {
    return <Picker.Item
        key={item}
        color={'white'}
        label={'' + item}
        value={item}
    />
};
