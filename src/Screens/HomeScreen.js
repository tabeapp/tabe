import { TouchableOpacity, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, {useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";

const HomeScreen = props => {
    //what's the best way to load
    //yeah we're gonna need a Social context
    const [posts, setPosts] = useState([]);
    //const data = await getPosts();

    //only will run once, right? right?
    //how the fuck am i supposed to do this
    //ok this is fucked, truning it off for no
    //useEffect( () => {
        //getPosts().then(v => setPosts(v))
    //})

    return (
        <SafeBorderNav {...props} screen={'home'}>
            <TopBar title='Feed'/>
            <View style={STYLES.body}>
                <FlatList data={posts} keyExtractor={item => ''+item.time} renderItem={({item}) =>
                    item.exercises &&
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('post', {workout: item})}
                        style={{backgroundColor: '#333', margin: 3}}>
                        <Row>
                            <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                            <Words>Zyzz</Words>
                        </Row>

                        <Words style={{fontSize: 40}}>
                            {item.title}
                        </Words>
                        <Words>
                            {item.description}
                        </Words>
                        <Words>{item.exercises[0]&&item.exercises[0].name}</Words>
                        <Words>{JSON.stringify(item.exercises[0]&&item.exercises[0].work[0])}</Words>
                    </TouchableOpacity>
                }
                />
            </View>
        </SafeBorderNav>
    );
};

export default HomeScreen;
