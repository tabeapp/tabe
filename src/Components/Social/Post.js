import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Words from '../Simple/Words';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { PRIMARY } from '../../Style/Theme';
import Row from '../Simple/Row';
import { S3Image } from 'aws-amplify-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//this really is just for rendering for the most part
const Post = ({post}) => {

    const navigation = useNavigation();
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

    //this is cap
    const liked = false;
    const icon = liked? 'heart': 'heart-outline';

    return (
        <TouchableWithoutFeedback
            style={{borderColor: PRIMARY, borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 15 }}
            onPress={() => {
                navigation.navigate('post', {postID: post.id})
            }}
        >
            <View>
                <Row style={{padding: 10, justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        style={{height: 40, width: 40, borderRadius: 20, overflow: 'hidden'}}
                        onPress={() => {
                            navigation.navigate('profile', {userId: post.userID})
                        }}
                    >
                        <S3Image key={post.userImage.uri} style={{width: 40, height: 40}} imgKey={post.userImage.uri}/>
                    </TouchableOpacity>

                    <View style={{flex:1}}>
                        <Words style={{fontWeight: 'bold'}}>{post.userID}</Words>
                        <TouchableOpacity>
                            {/*<Words>{moment(post.createdAt).format('MMMM D YYYY, h:mma')}</Words>*/}
                            <Words>{calcTimestampDiff(post.createdAt)}</Words>
                        </TouchableOpacity>
                    </View>
                </Row>

                <Words style={{fontSize: 30}}>{post.title}</Words>
                <Words>{post.description}</Words>

                <ScrollView horizontal>
                    <View style={{width: 400}}>
                        {
                            post.data &&
                            JSON.parse(post.data).map(exercise =>
                                <View style={{borderTopWidth: 1, borderColor: '#222'}}>
                                    <Words style={{fontSize: 20}}>{exercise.name}</Words>
                                    <View style={{alignItems: 'center'}}>{
                                        exercise.work.map(set =>
                                            <Words>{set.reps + 'x' + set.weight}</Words>
                                        )
                                    }</View>
                                </View>
                            )
                        }
                    </View>
                    {
                        //so we'd see all the images uploaded with the thing
                        post.media.items.map(({uri}) =>
                            //<Words>{uri}</Words>
                            <S3Image key={uri} style={{width: 50, height: 50}} imgKey={uri}/>
                        )
                    }
                </ScrollView>

                <Row style={{height: 50}}>
                    <TouchableOpacity
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                        onPress={() => {
                            //todo i swear to god there's gotta be something we can reuse here
                            //the like function
                        }}
                    >
                        <Words style={{fontWeight: 'bold'}}>
                            {post.likes.items.length}
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
                            {post.comments.items.length}
                        </Words>
                        <Words>
                            <Ionicons size={30} color={PRIMARY} name={'chatbox-outline'}/>
                        </Words>
                    </TouchableOpacity>
                </Row>


            </View>
        </TouchableWithoutFeedback>
    );
};

export default Post;
