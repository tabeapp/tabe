import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import WorkoutScreen from "../Screens/WorkoutScreen";
import Words from "./Words";
import { PRIMARY } from "../Constants/Theme";
//again, this appears in nearly every screen

//this takes rightText, onPressLeft, title, onPressRight, and rightText
const TopBar = props => {
    const {leftText, onPressLeft, title, onPressRight, rightText} = props;

    return <View style={styles.top}>
        <TouchableOpacity onPress={onPressLeft} style={styles.topButton}>
            <Words style={{fontSize: 20}}>{leftText}</Words>
        </TouchableOpacity>

        <Words style={{fontSize: 20}}>{title}</Words>

        <TouchableOpacity onPress={onPressRight} style={styles.topButton}>
            <Words style={{fontSize: 20}}>{rightText}</Words>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    top: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topButton: {
        alignItems: 'center',
        width: 80,
        paddingHorizontal: 15
    },
});

export default TopBar;
