import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';

const ProfileScreen = props => {
    //fuck it, we'll just do it straight from this without using the context
    const [progress, setProgress] = useState([]);
    useEffect(() => {
        //console.log('reloading progress ' + JSON.stringify(progress));
        AsyncStorage.getItem('@progress').then(val =>{
            console.log('val ' + val);

            setProgress(JSON.parse(val));
        })
    });

    let timeStart = 0, timeEnd = 1, weightStart = 0, weightEnd = 1;
    if(progress[0]){
        timeStart = progress.reduce((min, p) => p.time < min ? p.time : min, progress[0].time);
        timeEnd = progress.reduce((max, p) => p.time > max ? p.time : max, progress[0].time);

        //this ones too copmlex to reduce
        progress.forEach(wo => {
            Object.values(wo.stats).forEach(weight => {
                if(weight > weightEnd)
                    weightEnd = weight
            })
        });


    }

    console.log(timeEnd-timeStart);
    console.log(weightEnd-weightStart);


    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
                    {
                        progress[0]&&
                        progress.map(wo => {
                            return Object.entries(wo.stats).map(([k,v]) => {
                                const x = Math.round((wo.time-timeStart)/(timeEnd-timeStart)*100)+'%';
                                const y = Math.round((v-weightStart)/(weightEnd-weightStart)*100)+'%';
                                return <View style={{position: 'absolute', left: x, bottom: y, backgroundColor: 'red', height: 5, width:5}} key={wo.time+k}/>
                            })
                        })
                    }
                </View>
                <NavBar current={/*better way to handle this?*/'profile'} navigation={props.navigation}/>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    navBar: {

    },
    container: { flex: 1, backgroundColor: PRIMARY },
    topBar: {
        height: 40,
        width: '100%',
        backgroundColor: PRIMARY,
        alignItems: 'center',
        borderStyle: 'solid',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        //alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
        //justifyContent: 'center',
    },
});

export default ProfileScreen;
