import React from 'react';
import { TextInput } from 'react-native';
import { STYLES } from "../Style/Values";

//my own text input, just want to keep style consistent
const Write = ({value, onChange, style}) => {
    return <TextInput
        style={{...STYLES.text, ...style}}
        value={value}
        multiline={true}
        blurOnSubmit={true}
        onChangeText={onChange}
        keyboardType="default"
        returnKeyType="done"
    />;
};

export default Write;
