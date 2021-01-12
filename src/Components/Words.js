import React from 'react';
import {StyleSheet, Text} from 'react-native';
//pretty much text but not

const Words = props =>
    <Text style={[styles.defaultStyle, props.style]}>
        {props.children}
    </Text>
;

const styles = StyleSheet.create({
    defaultStyle: {
        color:'white',
        fontFamily: 'Courier New',
        fontWeight: 'bold'
    }
});
export default Words;
