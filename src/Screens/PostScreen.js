import React, {useEffect, useState, useContext} from 'react';
import { TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { PRIMARY } from '../Style/Theme';
import Words from "../Components/Simple/Words";
import SafeBorder from "../Components/Navigation/SafeBorder";
import TopBar from "../Components/Navigation/TopBar";
import Row from "../Components/Simple/Row";
import { STYLES } from "../Style/Values";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listPosts, listPostsSortedByTimestamp } from "../../graphql/queries";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createComment, createLike, deleteLike } from "../../graphql/mutations";
import { UserContext } from "../Contexts/UserProvider";
import NavBar from "../Components/Navigation/NavBar";
import Write from "../Components/Simple/Write";

const primaryColor = '#66d6f8';

//yes this is a copy of report screen
const PostScreen = props => {
    const {postID} = props.route.params;

    const {username} = useContext(UserContext);


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
        API.graphql(graphqlOperation(listPosts, {
            filter:{
                id: {
                    eq: postID
                }
            }
        }))
            .then(res => {
                console.log(res)
                //should only be one?
                const p = res.data.listPosts.items[0];
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

    const icon = liked? 'heart': 'heart-outline';

    return (
        <SafeBorder>
            <TopBar title='Workout Summary'/>
            <View style={STYLES.body}>
                <Row>
                    <View style={{height: 50, width: 50, borderRadius: 25, backgroundColor: 'gray'}}/>
                    <Words>Zyzz</Words>
                </Row>
                <Words style={{fontSize: 40}} >
                    {post.title}
                </Words>
                <Words style={{fontSize: 20}}>
                    {post.description}
                </Words>
                <Words>
                    {JSON.stringify(post.media.items.map(m => m.uri))}
                </Words>
                <Words>
                    {JSON.stringify(post.data)}
                </Words>
                {
                    //easier than adding dumb default properties
                    loaded &&
                    <>
                        <Row>
                            <Words>Likes:{post.likes.items.length}</Words>
                            <TouchableOpacity
                                onPress={() => {
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
                                }}
                            >
                                <Words><Ionicons name={icon}/></Words>
                            </TouchableOpacity>
                            <Words>Comments:{post.comments.items.length}</Words>
                        </Row>
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

                    </>

                }

                {
                    /*workout && workout.exercises.map((ex, index) =>
                        index === 0?
                            //first one is biggest
                            <View style={{alignItems: 'center', margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                <Words style={{fontSize: 40}}>{ex.name}</Words>
                                {
                                    ex.work.map((set,i) =>
                                        <Words key={i} style={{fontSize:40}}>
                                            {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                        </Words>)
                                }
                            </View>
                            :
                            <View style={{margin: 5, padding: 4, backgroundColor: '#333'}} key={ex.name}>
                                <Words style={{fontSize: 20}}>{ex.name}</Words>
                                {
                                    ex.work.map(set => <Words style={{fontSize: 20}}>
                                        {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                    </Words>)
                                }
                            </View>
                    )*/
                }
            </View>
            <View
                style={{height: 60, width: '100%', backgroundColor: '#222'}}
            >
                <Row>

                    <Write
                        value={comment}
                        onChange={setComment}
                        style={{width: 150, borderColor: 'red', borderWidth: 1}}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            //so far looks like dog shit but here is where we comment
                            API.graphql(graphqlOperation(createComment, {
                                input: {
                                    userID: username,
                                    postID: postID,
                                    content: comment
                                }
                            }))
                                .then(res => {
                                    setComment('')
                                })

                        }}
                    >
                        <Words>Comment</Words>
                    </TouchableOpacity>
                </Row>

            </View>
        </SafeBorder>
    );
};


export default PostScreen;
