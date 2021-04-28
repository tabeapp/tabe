import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import Words from '../Components/Simple/Words';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { API, graphqlOperation } from 'aws-amplify';
import { getPost} from '../../graphql/queries';
import PostHeader from '../Components/Social/PostHeader';
import TrophyVisual from '../Components/Social/TrophyVisual';
import SummaryDisplay from '../Components/Workout/SummaryDisplay';
import LikeButton from '../Components/Social/LikeButton';
import CommentBar from '../Components/Social/CommentBar';
import { S3Image } from 'aws-amplify-react-native';

//yes this is a copy of report screen
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
                setLoaded(true)
            })

    }, [postID]);

    return (
        <SafeBorder>
            <TopBar title='Workout Summary'/>
            {
                //easier than adding dumb default properties
                loaded &&
                <ScrollView style={{flex: 1}}>
                    <PostHeader userID={post.userID} imageUri={post.userImage.uri} createdAt={post.createdAt}/>
                    <Words style={{fontSize: 40}} >
                        {post.title}
                    </Words>
                    <Words style={{fontSize: 20}}>
                        {post.description}
                    </Words>

                    <Words style={{fontWeight: 'bold', fontSize: 40}}>
                        Workout Detail
                    </Words>
                    <SummaryDisplay exercises={JSON.parse(post.data)}/>

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
                            //this looks like shit too
                            post.comments.items.map(comment =>
                                <Row
                                    style={{justifyContent: 'space-between', flex: 1}}
                                >
                                    <PostHeader
                                        userID={comment.userID}
                                        imageUri={comment.userImage.uri}
                                        createdAt={comment.createdAt}
                                    />
                                    <Words>{comment.content}</Words>

                                </Row>
                            )
                        }
                    </View>


                </ScrollView>
            }
            {

                loaded&&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={50} //this is mad dumb
                >
                    <Row>
                        <LikeButton likes={post.likes} postID={post.id}/>
                        <CommentBar postID={post.id}/>
                    </Row>
                </KeyboardAvoidingView>
            }
        </SafeBorder>
    );
};

export default PostScreen;
