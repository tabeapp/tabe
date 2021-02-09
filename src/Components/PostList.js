import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Words from "./Words";
import moment from 'moment';
import Row from "./Row";

const PostList = props => {
    const {isLoading, posts, getAdditionalPosts, listHeaderTitleButton} = props;
    return <View>
        {
            isLoading
                ?
                <Words>loading...</Words>
                :
                <ScrollView>
                    <Words>{listHeaderTitleButton && listHeaderTitleButton}</Words>
                    {
                        posts.map(post => <PostItem
                            post={post}
                            navigation={props.navigation}
                        />)
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

const PostItem = ({ post, navigation }) => {
    const now = moment();
    console.log(now)

    const calcTimestampDiff = (timestamp) => {
        const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

        for (let i=0; i < scales.length; i++){
            const scale = scales[i];
            const diff = moment(now).diff(timestamp /** 1000*/, scale);
            if( diff > 0) return diff + scale.charAt(0)
        }

        return 0 + scales[scales.length - 1].charAt(0)
    }

    return (
        <TouchableOpacity
            onPress={() => {}}
            style={{backgroundColor: '#333', margin: 3}}
        >
            <Row>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('profile', {userId: post.userID})
                }}>
                    <View style={{height: 40, width: 40, backgroundColor: 'blue'}}/>
                    <Words>{post.userID}</Words>
                    <Words>{post.title}</Words>
                    <Words>{post.description}</Words>
                    <Words>{post.data}</Words>
                    <Words>
                        {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.timestamp)}
                    </Words>
                </TouchableOpacity>
            </Row>

        </TouchableOpacity>
    )
}

export default PostList;
