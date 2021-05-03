import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { listPostsSortedByTimestamp } from '../../graphql/queries';
import { onCreatePost } from '../../graphql/subscriptions';
import PostList from '../Components/Social/PostList';
import { graphqlOperation } from 'aws-amplify';
import RestCircle from '../Components/Workout/RestCircle';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const ExploreScreen = props => {

    const progress = useSharedValue(0.5);

    useEffect(() => {
        progress.value = withTiming(1.0, {duration: 1000});
    }, []);

    return (
        <SafeBorderNav {...props} screen={'explore'}>
            <TopBar title='Global Feed'/>
            <View style={STYLES.body}>
                <RestCircle progress={progress}/>

            </View>
        </SafeBorderNav>
    );
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
export const searchPostsGql = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        content
        owner
      }
      nextToken
      total
    }
  }
`;

export default ExploreScreen;
