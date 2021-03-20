import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation } from 'aws-amplify';
import { getPost} from '../../graphql/queries';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createComment, createLike, deleteLike } from '../../graphql/mutations';
import { UserContext } from '../Contexts/UserProvider';
import Write from '../Components/Simple/Write';
import PostHeader from '../Components/Social/PostHeader';
import { BACKGROUND, PRIMARY } from '../Style/Colors';
import TrophyVisual from '../Components/Social/TrophyVisual';

//yes this is a copy of report screen
const PostScreen = props => {
    const { postID } = props.route.params;

    const { username } = useContext(UserContext);


    const [post, setPost] = useState({
        title: '',
        description: '',
        data: '',
        userID: '',
        comments: []

    });

    const [comment, setComment] = useState('');

    const [loaded, setLoaded] = useState(false);

    const [liked, setLiked] = useState(false);


    useEffect(() => {
        setLoaded(false);
        API.graphql(graphqlOperation(getPost, {
            id: postID
        }))
            .then(res => {
                console.log(res)
                //should only be one?
                const p = res.data.getPost;
                setPost(p);
                //this is so dumb, should we have a username provider?
                //console.log(JSON.stringify(res))
                //console.log(username);
                const l = p.likes.items.some(like =>
                    like.userID === username
                )
                setLiked(l);
                setLoaded(true)
            })

    }, [postID]);

    const icon = liked ? 'heart' : 'heart-outline';

    const commentOnPost = () => {
        API.graphql(graphqlOperation(createComment, {
            input: {
                userID: username,
                postID: postID,
                content: comment
            }
        }))
            .then(res => {
                setComment('');
            });
    };

    const likePost = () => {
        //the like function

        if(liked){
            //unlike
            setLiked(false);

            const likeID = post.likes.items.find(like =>
                like.userID === username
            ).id;

            //this needs id
            API.graphql(graphqlOperation(deleteLike, {
                input: {
                    id: likeID
                }
            }))
                .then(res => {
                    if(res.data.deleteLike.errors)
                        setLiked(true);
                })

        } else{
            // like
            setLiked(true);
            API.graphql(graphqlOperation(createLike, {
                input: {
                    parentID: postID,
                    userID: username
                }
            }))
                .then(res => {
                    if (res.data.createLike.errors)//is it errors or error?
                        setLiked(false)
                })
        }
    }

    return (
        <SafeBorder>
            <TopBar title='Workout Summary'/>
            {
                //easier than adding dumb default properties
                loaded &&
                <ScrollView style={{flex: 1}}>
                    <PostHeader post={post}/>
                    <Words style={{fontSize: 40}} >
                        {post.title}
                    </Words>
                    <Words style={{fontSize: 20}}>
                        {post.description}
                    </Words>
                    <TouchableOpacity
                        style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                        onPress={likePost}
                    >
                        <Words style={{fontWeight: 'bold'}}>
                            {post.likes.items.length}
                        </Words>
                        <Words>
                            <Ionicons size={30} color={PRIMARY} name={icon}/>
                        </Words>
                    </TouchableOpacity>

                    <Words style={{fontWeight: 'bold', fontSize: 40}}>
                        Achievements
                    </Words>
                    {
                        post.efforts.items.map(effort =>
                            <View key={effort.id}>
                                <Row>
                                    <Words>{effort.exercise}</Words>
                                    <Words>{effort.reps}</Words>
                                    <Words>{effort.weight}</Words>
                                    <Words>{effort.orm}</Words>
                                </Row>
                                {
                                    effort.trophies.items.map(trophy =>
                                        <TrophyVisual key={trophy.id} trophy={trophy} exercise={effort.exercise}/>
                                    )
                                }
                            </View>

                        )
                    }

                    <Words style={{fontWeight: 'bold', fontSize: 40}}>
                        Comments
                    </Words>
                    <View style={{width: '100%'}}>
                        {
                            post.comments.items.map(comment =>
                                <Row>
                                    <Words>{comment.userID}</Words>
                                    <Words>{comment.content}</Words>

                                </Row>
                            )
                        }
                    </View>


                </ScrollView>
            }
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                style={{padding: 5}}
            >
                <Row
                    style={{width: '100%', borderColor: PRIMARY, paddingHorizontal: 15, borderWidth: 1, borderRadius: 40, overflow: 'hidden'}}
                >
                    <Write
                        value={comment}
                        onChange={setComment}
                        placeholder={'Add comment...'}
                        style={{height: 40, fontSize: 20, flex: 1}}
                    />
                    <TouchableOpacity style={{justifyContent: 'center', backgroundColor: BACKGROUND}} onPress={commentOnPost}>
                        <Words>Comment</Words>
                    </TouchableOpacity>
                </Row>
            </KeyboardAvoidingView>
        </SafeBorder>
    );
};

export default PostScreen;
