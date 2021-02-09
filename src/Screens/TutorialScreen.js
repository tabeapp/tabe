import React, {useState, useReducer, useEffect} from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import Words from "../Components/Words";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";

//https://www.youtube.com/watch?v=TGg9WNLUZPc
const TutorialScreen = props => {
    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Explore'/>
            <View style={STYLES.body}>
                <Words>Shit</Words>
            </View>
        </SafeBorderNav>
    );
};

export default TutorialScreen;
