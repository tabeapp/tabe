import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { listTimelines } from '../../graphql/queries';
import { onCreateTimeline } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import { UserContext } from '../Contexts/UserProvider';

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const HomeScreen = props => {
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


    const {username} = useContext(UserContext);

    //fetch the shits


    //set up and break down everything
    return (
        <SafeBorderNav {...props} screen={'home'}>
            <TopBar title='Feed'/>
            <View style={STYLES.body}>
                <PostList
                    listOperation={listTimelines}
                    sortKey='userID'
                    sortValue={username}
                    subscriptionOperation={onCreateTimeline}
                    subscriptionCriteria={() => true}//this isn't ideal, oncreate timelines takes a userid

                />
                    {
                        /*
                        I'm going to rethink how i handle following and followers soon
                        just gonna use a global feed for now
    const {listOperation, sortKey, sortValue, subscriptionOperation, subscriptionCriteria} = props;
                        <PostList
                            navigation={props.navigation}
                            isLoading={isLoading}
                            posts={posts}
                            getAdditionalPosts={getAdditionalPosts}
                            listHeaderTitle={'Home'}
                        />
                        */
                    }

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

export default HomeScreen;
