import React, {useState, useReducer, useEffect} from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";
import { withAuthenticator } from "aws-amplify-react-native";
import Write from "../Components/Write";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createPost } from "../../graphql/mutations";
import { listPostsSortedByTimestamp } from "../../graphql/queries";
import { onCreatePost } from "../../graphql/subscriptions";
import PostList from "../Components/PostList";

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';


const reducer = (state, action) => {
    switch(action.type){
        case INITIAL_QUERY:
            return action.posts;
        case ADDITIONAL_QUERY:
            return [...state, ...action.posts];
        case SUBSCRIPTION:
            return [action.post, ...state];
        default:
            return state;
    }
};

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const ExploreScreen = props => {
    //what's the best way to load
    //yeah we're gonna need a Social context
    //const [posts, setPosts] = useState([]);
    //const data = await getPosts();

    //only will run once, right? right?
    //how the fuck am i supposed to do this
    //ok this is fucked, truning it off for no
    //useEffect( () => {
    //getPosts().then(v => setPosts(v))
    //})

    //const [value, setValue] = useState('eyyyy');

    /*const onPost = async () => {
        const res = await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'post',
                content: value,
                timestamp: Date.now()
            }}));
        console.log(res);
        setValue('')
    };*/

    //not doing this here lol
    const signOut = () => {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    const [posts, dispatch] = useReducer(reducer, []);
    const [nextToken, setNextToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    //fetch the shits
    const getPosts = async (type, nextToken=null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20,
            nextToken: nextToken
        }))
        console.log(res);
        dispatch({
            type: type,
            posts: res.data.listPostsSortedByTimestamp.items
        });
        setNextToken(res.data.listPostsSortedByTimestamp.nextToken);
        setIsLoading(false);
    };

    const getAdditionalPosts = () => {
        if(nextToken === null)
            return;
        getPosts(ADDITIONAL_QUERY, nextToken);
    };

    //set up and break down everything
    useEffect(() => {
        getPosts(INITIAL_QUERY).then(_ => {});

        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: msg => {
                console.log('allposts subscription fired');
                const post = msg.value.data.onCreatePost;
                dispatch({type:SUBSCRIPTION, post: post});
            }

        });

        return () => subscription.unsubscribe();

    }, []);

    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Explore'/>
            <View style={STYLES.body}>
                <Words/>
                <Words/>
                <Words/>
                <TouchableOpacity style={{backgroundColor: 'red'}} onPress={signOut} >
                    <Words>Sign out</Words>
                </TouchableOpacity>
                <View>
                    <PostList
                        navigation={props.navigation}
                        isLoading={isLoading}
                        posts={posts}
                        getAdditionalPosts={getAdditionalPosts}
                        listHeaderTitle={'Search'}
                        listHeaderTitleButton={
                            <>
                                <Write value={query} onChange={setQuery}/>
                                <TouchableOpacity onPress={() => searchPosts(INITIAL_QUERY)}>
                                    <Words>Search</Words>
                                </TouchableOpacity>
                            </>
                        }
                    />

                </View>
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


export default ExploreScreen;
