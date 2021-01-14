import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";

const ExploreScreen = props => {
    const data = ['pee pee', 'poo poo', 'oooooh'];

    return (
        <SafeBorder>
            <View style={styles.topBar} />
            <View style={styles.box}>
                <FlatList data={data} keyExtractor={item => item} renderItem={
                    ({item}) => <Words>{item}</Words>
                } />
            </View>
            <NavBar current={/*better way to handle this?*/'explore'} navigation={props.navigation}/>
        </SafeBorder>
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
        justifyContent: 'center',
    },
});

export default ExploreScreen;
