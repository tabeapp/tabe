import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
//get custom icons eventually

import { PRIMARY } from '../Constants/Theme';

const primaryColor = '#66d6f8';

const routines = [
    {
        title: 'Starting Strength',
        description: 'fd asf adsf dskajfkdsjaf djs afkdsa fads fdsajf dskajf dsafk adsjfkdsafjsdakfjdsak fdsk'
    },
    {
        title: 'Stronglifts 5x5',
        description: 'fd asf adsf dskajfkdsjaf djs afkdsa fads fdsajf dskajf dsafk adsjfkdsafjsdakfjdsak fdsk'
    },
    {
        title: '5/3/1',
        description: 'fd asf adsf dskajfkdsjaf djs afkdsa fads fdsajf dskajf dsafk adsjfkdsafjsdakfjdsak fdsk'
    },
    {
        title: 'Metallica PPL',
        description: 'fd asf adsf dskajfkdsjaf djs afkdsa fads fdsajf dskajf dsafk adsjfkdsafjsdakfjdsak fdsk'
    },
]

const RoutineSetupScreen = () => {
    //let { workout, generateReport} = useContext(ProgressContext);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <View style={styles.top}>
                    <Text style={{color: 'black', fontSize: 20}}>Routine Setup</Text>
                </View>
                <Text style={{color: 'white'}}>Recommended Routines</Text>
                <View style={styles.container}>{
                    routines.map(r =>
                        <View style={{backgroundColor: 'gray', margin: 4, borderRadius: 20, height: 100, width: '48%'}}>
                            <Text style={{color: 'white'}}>{
                                r.title
                            }</Text>
                        </View>)
                }</View>
                <View style={{backgroundColor: 'gray', margin: 4, borderRadius: 20, height: 80, width: '98%'}}>
                    <Text style={{color: 'white'}}>Custom</Text>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 5},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

export default RoutineSetupScreen;
