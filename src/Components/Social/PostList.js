import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import {S3Image} from 'aws-amplify-react-native';
import Words from "../Simple/Words";
import moment from 'moment';
import Row from "../Simple/Row";

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
                            key={post.id}
                            post={post}
                            navigation={props.navigation}
                        />)
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

    //wouldn't it be better to just show the time?
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
            style={{backgroundColor: '#333', margin: 3}}
            onPress={() => {
                navigation.navigate('post', {postID: post.id})
            }}
        >
            <Row>
                <TouchableOpacity
                    style={{height: 40, width: 40, borderRadius: 20, backgroundColor: 'blue'}}
                    onPress={() => {
                        navigation.navigate('profile', {userId: post.userID})
                    }}
                />
                <View>

                    <Words>{post.userID}</Words>
                    <Words>{moment(post.createdAt).format('MMMM D YYYY, h:mma')}</Words>
                </View>
            </Row>
            <Words>{post.title}</Words>
            <Words>{post.description}</Words>
            <Words>{post.data}</Words>
            {
                post.media.items.map(({uri}) =>
                    //<Words>{uri}</Words>
                    <S3Image key={uri} style={{width: 50, height: 50}} imgKey={uri}/>
                )
            }
            <Words>
                {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.createdAt)}
            </Words>
        </TouchableOpacity>
    )
}

export default PostList;
