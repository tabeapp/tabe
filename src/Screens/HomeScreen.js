import { View } from 'react-native';
import React, { useContext } from 'react';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { listTimelines } from '../../graphql/queries';
import { onCreateTimeline } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import { UserContext } from '../Contexts/UserProvider';

const HomeScreen = props => {
    const {username} = useContext(UserContext);

    return (
        <SafeBorderNav {...props} screen={'home'}>
            <TopBar title='Feed'/>
            <View style={STYLES.body}>
                {
                    username &&
                    <PostList
                        listOperation={listTimelines}
                        sortKey='userID'
                        sortValue={username}
                        subscriptionOperation={onCreateTimeline}
                        subscriptionCriteria={() => true}//this isn't ideal, oncreate timelines takes a userid
                    />
                }
            </View>
        </SafeBorderNav>
    );
};

export default HomeScreen;
