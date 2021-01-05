import { TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, {useEffect, useContext, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Words from "../Components/Words";

//this is for choosing a routine to edit, instead of jumping right in
const RoutineScreen = props => {
    const [routines, setRoutines] = useState([]);

    //the routines will be saved under @routines
    //there may be multiple
    //the current routine will be @currentroutine
    useEffect(() => {
        AsyncStorage.getItem('@routines').then(obj => {
            if(obj === null)
                setRoutines(['deez', 'nuts']);
            else
                setRoutines(JSON.parse(obj));
        });

    }, []);

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
                    <Words>Current</Words>

                    <Words>Routines</Words>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        {
                            routines.map(item =>
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => {/*send it off to routine editor*/}}
                                    style={{width: '95%', backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100}}
                                >
                                    <Text style={{fontSize: 20, color: 'white'}}>{
                                        item
                                    }</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TouchableOpacity  onPress={() => {}}>
                        <Words style={{fontSize: 40}}>+</Words>
                    </TouchableOpacity>

                </View>
                <NavBar current={/*better way to handle this?*/'routine'} navigation={props.navigation}/>
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
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
    },
});
export default RoutineScreen;
