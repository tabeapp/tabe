import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import ProgressContext from "../Contexts/ProgressContext";

const HomeScreen = props => {
    //what's the best way to load
    let {getPosts} = useContext(ProgressContext);
    const [posts, setPosts] = useState([]);
    //const data = await getPosts();

    //only will run once, right? right?
    useEffect( () => {
        getPosts().then(v => setPosts(v))
    })

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
                    <FlatList data={posts} keyExtractor={item => item} renderItem={({item}) => <Text style={{color:'white'}}>{JSON.stringify(item)}</Text>} />
                </View>
                <NavBar current={/*better way to handle this?*/'home'} navigation={props.navigation}/>
            </SafeAreaView>
        </>
    );
};

export default HomeScreen;
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
