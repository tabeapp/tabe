import React from 'react';
import {StyleSheet, View} from 'react-native';

//literaly show up EVERYWHERE
const Row = props => {
    return <View style={{...styles.row, ...props.style}}>{
        props.children
    }</View>
};

const styles = StyleSheet.create( {
    row:{
        flexDirection: 'row',//its a row aint it
        alignItems: 'center',//also is used a LOT
        justifyContent: 'space-between'

    }}
);

export default Row;
