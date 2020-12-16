import { TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
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
    //how the fuck am i supposed to do this
    //ok this is fucked, truning it off for no
    //useEffect( () => {
        //getPosts().then(v => setPosts(v))
    //})

    return (
        <>
            <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
            <SafeAreaView style={{backgroundColor: '#222', flex: 1}}>
                <View style={styles.topBar} />
                <View style={styles.box}>
                    <FlatList data={posts} keyExtractor={item => ''+item.time} renderItem={({item}) =>
                        item.exercises &&
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('post', {workout: item})}
                            style={{backgroundColor: '#333', margin: 3}}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                                <Text style={{color:'white'}}>Zyzz</Text>
                            </View>

                            <Text style={{fontSize: 40, color: 'white'}}>
                                {item.title}
                            </Text>
                            <Text style={{color:'white'}}>
                                {item.description}
                            </Text>
                            <Text style={{color:'white'}}>{item.exercises[0]&&item.exercises[0].name}</Text>
                            <Text style={{color:'white'}}>{JSON.stringify(item.exercises[0]&&item.exercises[0].work[0])}</Text>
                        </TouchableOpacity>
                    }
                    />
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
