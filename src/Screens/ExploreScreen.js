import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";

const ExploreScreen = props => {
    const data = ['pee pee', 'poo poo', 'oooooh'];

    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Explore'/>
            <View style={styles.box}>
                <FlatList data={data} keyExtractor={item => item} renderItem={
                    ({item}) => <Words>{item}</Words>
                } />
            </View>
        </SafeBorderNav>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: PRIMARY },
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
