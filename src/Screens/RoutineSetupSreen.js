import React, {useEffect, useContext} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";

const primaryColor = '#66d6f8';


//this screen is used to input prs and bulid a custom routine based on another
const RoutineSetupScreen = props => {
    //let { workout, generateReport} = useContext(ProgressContext);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>Routine Setup</Text>
                </View>
                <Text style={{color: 'white', fontSize: 20}}>{props.route.params.routine}</Text>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default RoutineSetupScreen;
