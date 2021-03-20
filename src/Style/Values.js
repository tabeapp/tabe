//i really don't know if this is the best way to do this, should i use some fancy CSS thing?
import React from 'react';
import { StyleSheet } from 'react-native';
import { DARK_GRAY } from './Colors';

export const FONT = 'Arial';

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
    button: {
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: DARK_GRAY,
        width: 50,
        height: 50,
    },
    textButton: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(143,143,143,0.5)'
    },
    text: {
        fontFamily: FONT,
        //fontWeight: 'bold',
        color: 'white'
    },
    body: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    //like a container, just a bit of padding
    card:{
        margin: 5,
        justifyContent: 'center',
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(143,143,143,0.2)',

    },
    scroller: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        borderStyle: 'solid',
    },

});
