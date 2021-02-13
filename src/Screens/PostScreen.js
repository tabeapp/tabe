import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listPosts, listPostsSortedByTimestamp } from "../../graphql/queries";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createLike, deleteLike } from "../../graphql/mutations";
import { UserContext } from "../Contexts/UserProvider";

const primaryColor = '#66d6f8';

//yes this is a copy of report screen
const PostScreen = props => {
    //this will ALWAYS be passed a param of id,
    //sometimes it'll just be passed the workout itself
    //but id will enable it to load and send requests

    //const id = props.route.params.postId;
    const {postID} = props.route.params;

    const {username} = useContext(UserContext);

    //you know what fuck this, report will always be sent as an object.

    //should this be passed as params or generated here?
    //const [rep, setRep] = useState(report);

    //console.log(report);
    //const [title, setTitle] = useState(props.route.params.report.name);
    //const [description, setDescription] = useState(props.route.params.report.summary);

    //report should almost always not be null, even if it is the user can just add their own title

    //useEffect(() =>
    //setSummary(generateReport())
    //)

    //console.log('summary ' + JSON.stringify(workout));

    /*const handleNext = () => {
        //combine workout and title and description
        saveWorkout({...report, title: title, description: description})
        props.navigation.navigate('home');

    };*/
    const [post, setPost] = useState({
        title: '',
        description: '',
        data: '',
        userID: '',
        comments: []

    })

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
            <TopBar title='Workout Summary' rightText='Next'/>
            <View style={STYLES.card}>
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
                    {JSON.stringify(post)}
                </Words>
                {
                    //easier than adding dumb default properties
                    loaded &&
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
        </SafeBorder>
    );
};

export default PostScreen;
