import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";

const ExploreScreen = props => {
    const data = ['pee pee', 'poo poo', 'oooooh'];

    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Explore'/>
            <View style={STYLES.body}>
                <FlatList data={data} keyExtractor={item => item} renderItem={
                    ({item}) => <Words>{item}</Words>
                } />
            </View>
        </SafeBorderNav>
    );
};

export default ExploreScreen;
