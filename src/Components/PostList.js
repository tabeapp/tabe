import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Words from "./Words";
import moment from 'moment';

const PostList = props => {
    const {isLoading, posts, getAdditionalPosts, listHeaderTitle, listHeaderTitleButton} = props;
    return <View>
        {
            isLoading
                ?
                <Words>loading...</Words>
                :
                <ScrollView>
                    <Words>{listHeaderTitle}</Words>
                    <Words>{listHeaderTitleButton && listHeaderTitleButton}</Words>
                    {
                        posts.map(PostItem)
                            //<Words>{JSON.stringify(post)}</Words>
                        //})
                    }
                    <TouchableOpacity onPress={getAdditionalPosts}>
                        <Words>More</Words>

                    </TouchableOpacity>

                </ScrollView>

        }
    </View>
};

const PostItem = ({ post }) => {
    const classes = useStyles();
    const history = useHistory();
    const now = moment();
    console.log(now)

    const calcTimestampDiff = (timestamp) => {
        const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

        for (let i=0; i < scales.length; i++){
            const scale = scales[i];
            const diff = moment(now).diff(timestamp * 1000, scale);
            if( diff > 0) return diff + scale.charAt(0)
        }

        return 0 + scales[scales.length - 1].charAt(0)
    }

    return (
        <View alignItems='flex-start' key={post.id}>
            <View>
                <TouchableOpacity className={classes.clickable} onClick={() => history.push('/' + post.owner)}>
                    <View style={{height: 40, width: 40, backgroundColor: 'blue'}}/>
                </TouchableOpacity>
            </View>
            <View>
                <Words
                    color='textSecondary'
                    display='inline'
                >
                    {post.owner}
                    {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.timestamp)}
                </Words>
            </View>
            <View>
                <Words
                    color='textPrimary'
                >
                    {post.content}
                </Words>
            </View>
        </View>
    )
}

export default PostList;
