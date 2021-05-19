import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Words from '../Simple/Words';
import { PRIMARY } from '../../Style/Colors';
//again, this appears in nearly every screen

//this takes rightText, onPressLeft, title, onPressRight, and rightText
const TopBar = props => {
    const {leftText, onPressLeft, title, onPressRight, rightText} = props;

    return <View style={styles.top}>
        <TouchableOpacity onPress={onPressLeft} style={styles.topButton}>
            <Words style={{fontSize: 20}}>{leftText}</Words>
        </TouchableOpacity>

        <Words style={{fontSize: 30, fontWeight: 'bold'}}>{title}</Words>

        <TouchableOpacity onPress={onPressRight} style={styles.topButton}>
            <Words style={{fontSize: 20, textAlign: 'right'}}>{rightText}</Words>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    top: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        //backgroundColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    topButton: {
        alignItems: 'center',
        width: 100,
        paddingHorizontal: 15,
    },
});

export default TopBar;
