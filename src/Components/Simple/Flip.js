import React from 'react';
import { Switch } from 'react-native';
import { BACKGROUND, DARK_GRAY, PRIMARY } from '../../Style/Colors';
//pretty much text but not

const Flip = props =>
    <Switch
        trackColor={{ false: DARK_GRAY, true: PRIMARY }}
        thumbColor={BACKGROUND}
        ios_backgroundColor={DARK_GRAY}
        onValueChange={props.onChange}
        value={props.value}
    />
;

export default Flip;
