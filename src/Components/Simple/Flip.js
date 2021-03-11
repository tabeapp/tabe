import React from 'react';
import { Switch } from 'react-native';
import { PRIMARY } from '../../Style/Theme';
//pretty much text but not

const Flip = props =>
    <Switch
        trackColor={{ false: "#222", true: PRIMARY }}
        thumbColor={'black'}
        ios_backgroundColor="#222"
        onValueChange={props.onChange}
        value={props.value}
    />
;

export default Flip;
