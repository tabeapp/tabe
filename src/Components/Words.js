import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { FONT } from "../Style/Values";
//pretty much text but not

const Words = props =>
    <Text style={[styles.defaultStyle, props.style]}>
        {props.children}
    </Text>
;

const styles = StyleSheet.create({
    defaultStyle: {
        color:'white',
        fontFamily: FONT,
        fontWeight: 'bold'
    }
});
export default Words;
