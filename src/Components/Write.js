import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { FONT } from '../Style/Values';

//my own text input, just want to keep style consistent
const Write = ({value, onChange, style}) => {
    return <TextInput
        style={{...styles.style, ...style}}
        value={value}
        onChangeText={onChange}
    />;
};

const styles = StyleSheet.create({
    style: {
        fontFamily: FONT,
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'
    },
});

export default Write;
