import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../Components/NavBar";

const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';


const HomeScreen = props => {
    const data = ['pee pee', 'poo poo', 'oooooh'];

    const routes = ['home', 'explore', 'workout']
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}></View>
            <View style={styles.box}>
                <FlatList data={data} keyExtractor={item => item} renderItem={({item}) => <Text style={{color:'white'}}>{item}</Text>}>
                </FlatList>
            </View>
            <NavBar current={/*better way to handle this?*/'home'} navigation={props.navigation}/>
        </SafeAreaView>
    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    navBar: {

    },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor },
    topBar: {
        height: 40,
        width: '100%',
        backgroundColor: primaryColor,
        alignItems: 'center',
        borderStyle: 'solid',
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center'
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center'
    },
});
