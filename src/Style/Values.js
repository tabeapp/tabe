//i really don't know if this is the best way to do this, should i use some fancy CSS thing?
import React from 'react';
import {StyleSheet} from 'react-native';

export const FONT = 'Courier New';

//finally, some consistency for our styles
export const STYLES = StyleSheet.create({
    circle:{
        flex: 1,
        minWidth: 20,
        maxWidth: 50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid',
    },
});
