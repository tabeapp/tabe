import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { API, graphqlOperation } from 'aws-amplify';
import { getPost } from '../../graphql/queries';
import PostHeader from '../Components/Social/PostHeader';
import LikeButton from '../Components/Social/LikeButton';
import CommentBar from '../Components/Social/CommentBar';
import ExercisesDisplay from '../Components/Workout/ExercisesDisplay';

//side note: for trophy info, use post location info to fill in info
const PostScreen = props => {
    const { postID } = props.route.params;

    const [post, setPost] = useState({
        title: '',
        description: '',
        data: '',
        userID: '',
        comments: []

    });

    const [loaded, setLoaded] = useState(false);

    //TODO set up subscription for comments, that would actually be cool
    useEffect(() => {
        setLoaded(false);
        API.graphql(graphqlOperation(getPost, {
            id: postID
        }))
            .then(res => {
                //should only be one?
                const p = res.data.getPost;
                setPost(p);
                //this is so dumb, should we have a username provider?
                setLoaded(true)
            })

    }, [postID]);

    return (
        <SafeBorder>
            <TopBar title='Workout Summary'/>
            { loaded && <>
                <ScrollView style={{flex: 1}}>
                    <PostHeader
                        post={post}
                        size={60}
                    />
                    <Words style={{fontSize: 40}} >
                        {post.title}
                    </Words>
                    <Words style={{fontSize: 20}}>
                        {post.description}
                    </Words>

                    <ExercisesDisplay exercises={JSON.parse(post.data)} efforts={post.efforts}/>

                    <Words style={{fontWeight: 'bold', fontSize: 40}}>
                        Comments
                    </Words>
                    <View style={{width: '100%'}}>
                        {
                            //this looks like shit too
                            post.comments.items.map(comment =>
                                <Row
                                    key={comment.id}
                                    style={{justifyContent: 'space-between', flex: 1}}
                                >
                                    <PostHeader
                                        post={{
                                            userID: comment.userID,
                                            createdAt: comment.createdAt,
                                            userImage: {
                                                uri: comment.userImage.uri
                                            }
                                        }}
                                        size={40}
                                    />
                                    <Words>{comment.content}</Words>

                                </Row>
                            )
                        }
                    </View>

                </ScrollView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={50} //this is mad dumb
                >
                    <Row>
                        <LikeButton likes={post.likes} postID={post.id}/>
                        <CommentBar postID={post.id}/>
                    </Row>
                </KeyboardAvoidingView>
            </> }
        </SafeBorder>
    );
};

export default PostScreen;
