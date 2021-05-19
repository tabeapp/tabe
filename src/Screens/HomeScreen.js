import { View } from 'react-native';
import React, { useContext } from 'react';
import { STYLES } from '../Style/Values';
import { listTimelines } from '../../graphql/queries';
import { onCreateTimeline } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import { UserContext } from '../Contexts/UserProvider';
import { graphqlOperation } from 'aws-amplify';
import HeaderFooter from '../Components/Navigation/HeaderFooter';

const HomeScreen = props => {
    const {username} = useContext(UserContext);

    return (
        <>
            <HeaderFooter {...props} title='Feed' screen={'home'}>
                <View style={STYLES.body}>
                    {
                        username !== '' &&
                        <PostList
                            listOperation={listTimelines}
                            sortKey={'userID'}
                            sortValue={username}
                            filledSubscriptionOperation={graphqlOperation(onCreateTimeline, {
                                userID: username
                            })}
                            subscriptionCriteria={() => true}//this isn't ideal, oncreate timelines takes a userid
                        />
                    }
                </View>
            </HeaderFooter>
        </>
    );
};

export default HomeScreen;
