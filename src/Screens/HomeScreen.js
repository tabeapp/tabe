import { TextInput, TouchableOpacity, FlatList, Alert, SafeAreaView, StyleSheet, View } from "react-native";
import React, {useState, useContext, useEffect} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";
import WorkoutContext from "../Contexts/WorkoutContext";
import { withAuthenticator } from "aws-amplify-react-native";
import Write from "../Components/Write";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createPost } from "../../graphql/mutations";

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
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

    const [value, setValue] = useState('eyyyy');

    const onPost = async () => {
        const res = await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'post',
                content: value,
                timestamp: Date.now()
            }}));
        console.log(res);
        setValue('')
    };

    //not doing this here lol
    const signOut = () => {
        /*Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));*/
    };

    return (
        <SafeBorderNav {...props} screen={'home'}>
            <TopBar title='Feed'/>
            <View style={STYLES.body}>
                <Write value={value} onChange={v => {
                    //arbitrary limit lol
                    if(v.length <= 140)
                        setValue(v)
                }}/>
                <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={onPost} >
                    <Words>Post</Words>
                </TouchableOpacity>
                <Words/>
                <Words/>
                <Words/>
                <Words/>
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={signOut} >
                    <Words>Sign out</Words>
                </TouchableOpacity>
            </View>
        </SafeBorderNav>
    );
    /*
    return (
        <SafeBorderNav {...props} screen={'home'}>
            <TopBar title='Feed'/>
            <View style={STYLES.body}>
                <Words>Hello posts</Words>
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
    );*/
};

const drawerWidth = 340;
const MAX_POST_CONTENT_LENGTH = 140;
const styles = StyleSheet.create({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: 'relative',
    },
    drawerPaper: {
        width: drawerWidth,
        position: 'relative',
    },
    //toolbar: theme.mixins.toolbar,
    textField: {
        width: drawerWidth,
    },
    list: {
        // overflowWrap: 'break-word',
        width: 300,
    },
});

export default withAuthenticator(HomeScreen, {
    signUpConfig:{
        hiddenDefaults: ['phone_number']

    }

});
