import React from 'react';
import { TextInput } from 'react-native';
import { STYLES } from '../../Style/Values';

//my own text input, just want to keep style consistent
const Write = ({value, onChange, style, autoFocus=false, placeholder=''}) => {
    return <TextInput
        style={{...STYLES.text, ...style}}
        value={value}
        multiline={true}
        blurOnSubmit={true}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        //onSubmitEditing could be very useful method to use
        onChangeText={onChange}
        keyboardType="default"
        returnKeyType="done"
        autoFocus={autoFocus}
    />;
};

export default Write;
