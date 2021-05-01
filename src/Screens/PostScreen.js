import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { API, graphqlOperation } from 'aws-amplify';
import { getPost } from '../../graphql/queries';
import PostHeader from '../Components/Social/PostHeader';
import TrophyVisual from '../Components/Social/TrophyVisual';
import LikeButton from '../Components/Social/LikeButton';
import CommentBar from '../Components/Social/CommentBar';
import { DARK_GRAY } from '../Style/Colors';

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

    //yeah this is dumb
    const effortVisForSet = (exercise, set) => {
        const effort = post.efforts.items.find(effort =>
            effort.reps === set.reps &&
            effort.weight === set.weight &&
            effort.exercise === exercise.name
        );

        if(!effort)
            return <View/>;

        return <View>
            {
                effort.trophies.items.map(trophy =>
                    <TrophyVisual
                        key={trophy.id}
                        trophy={trophy}
                        exercise={effort.exercise}
                        orm={effort.orm}
                    />
                )
            }

        </View>;
    };

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

                    {
                        //this is kinda weird but we're gonna combine the data and the efforts
                        //so for an exercise, you have set 1, set 2, set 3, and set 4
                        //but set 4 has all the trophies under it, from efforts

                        //another option: generate list of effort visuals and set visuals, sort them out then render
                        JSON.parse(post.data).map(exercise =>
                            <View
                                key={exercise.name}
                                style={{marginVertical: 5}}
                            >
                                <Words style={{fontSize: 30}}>{exercise.name}</Words>

                                <View style={{width: '100%'}}>{
                                    exercise.work.map((set,i) =>
                                        <View key={i} style={{marginVertical: 2, width: '100%', backgroundColor: DARK_GRAY, justifyContent: 'center'}}>
                                            <View style={{height: 50, justifyContent: 'center'}}>
                                                <Words style={{ textAlign: 'center', fontSize: 20}}>
                                                    {set.sets + 'x' + set.reps + 'x' + set.weight + 'lb'}
                                                </Words>
                                            </View>
                                            {
                                                //need some easier way to find if this set is one of the max efforts
                                                effortVisForSet(exercise, set)
                                            }
                                        </View>
                                    )
                                }</View>
                            </View>

                        )

                    }

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
