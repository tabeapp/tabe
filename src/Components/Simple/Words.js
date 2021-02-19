import React from 'react';
import {Text} from 'react-native';
import { STYLES } from "../../Style/Values";
//pretty much text but not

const Words = props =>
    <Text style={[STYLES.text, props.style]}>
        {props.children}
    </Text>
;

export default Words;
