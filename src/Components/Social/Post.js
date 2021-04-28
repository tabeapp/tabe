import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Words from '../Simple/Words';
import { useNavigation } from '@react-navigation/native';
import { DARK_GRAY, PRIMARY } from '../../Style/Colors';
import Row from '../Simple/Row';
import { S3Image } from 'aws-amplify-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PostHeader from './PostHeader';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import SummaryDisplay from '../Workout/SummaryDisplay';
import LikeButton from './LikeButton';

//this really is just for rendering for the most part
const Post = ({post}) => {

    const width = useWindowDimensions().width;

    const navigation = useNavigation();

    //this is cap
    const liked = false;
    const icon = liked? 'heart': 'heart-outline';

    return (
        <View
            style={{borderColor: PRIMARY, borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 15 }}
        >
            <View>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('post', {postID: post.id})}
                >
                    <View>
                        <PostHeader post={post}/>

                        <Words style={{fontSize: 30}}>{post.title}</Words>
                        <Words>{post.description}</Words>
                    </View>
                </TouchableWithoutFeedback>

                {/*this scroll view is really busted*/}
                <ScrollView
                    horizontal pagingEnabled
                    contentOffset={{x: post.media.items ? width : 0, y:0}}
                >
                    <View style={{width: width}}>
                        <SummaryDisplay exercises={JSON.parse(post.data)}/>
                    </View>
                    {
                        //so we'd see all the images uploaded with the thing
                        post.media&&
                        post.media.items.map(({uri}) =>
                            //width doesn't work the way you expect btw
                            <S3Image key={uri} style={{width: width}} imgKey={uri}/>
                        )
                    }

                </ScrollView>

                <Row style={{height: 50}}>
                    <LikeButton likes={post.likes} postID={post.id}/>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                        onPress={() => {
                            //todo i swear to god there's gotta be something we can reuse here
                            //the like function
                        }}
                    >
                        <Words style={{fontWeight: 'bold'}}>
                            {post.likes && post.likes.items.length}
                        </Words>
                        <Words>
                            <Ionicons size={30} color={PRIMARY} name={icon}/>
                        </Words>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                        onPress={() => {
                            //the like function
                        }}
                    >
                        <Words>
                            {
                                //TODO you'll actually have to address this eventually
                                post.comments && post.comments.items.length}
                        </Words>
                        <Words>
                            <Ionicons size={30} color={PRIMARY} name={'chatbox-outline'}/>
                        </Words>
                    </TouchableOpacity>
                </Row>


            </View>
        </View>
    );
};

export default Post;
