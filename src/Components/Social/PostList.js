import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Words from '../Simple/Words';
import Post from './Post';

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
                        posts.map(post => <Post
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


export default PostList;
