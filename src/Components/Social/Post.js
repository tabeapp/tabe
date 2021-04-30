import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import Words from '../Simple/Words';
import { useNavigation } from '@react-navigation/native';
import { DARK_GRAY } from '../../Style/Colors';
import Row from '../Simple/Row';
import { S3Image } from 'aws-amplify-react-native';
import PostHeader from './PostHeader';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import SummaryDisplay from '../Workout/SummaryDisplay';
import LikeButton from './LikeButton';
import CommentBar from './CommentBar';

//this really is just for rendering for the most part
const Post = ({post}) => {

    const width = useWindowDimensions().width;

    const navigation = useNavigation();

    //this is being really fucking annoying about undefineds
    const loaded = post.media && post.userImage && post.data && post.likes;

    if(!loaded)
        return (<View style={{backgroundColor: DARK_GRAY, marginBottom: 15, borderRadius: 20 }}/>);

    return (
        <View
            style={{backgroundColor: DARK_GRAY, marginBottom: 15, borderRadius: 20 }}
        >
            <View>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('post', {postID: post.id})}
                >
                    <View>
                        <PostHeader
                            post={post}
                            size={60}
                        />

                        <Words style={{fontSize: 30}}>{post.title}</Words>
                        <Words>{post.description}</Words>
                    </View>
                </TouchableWithoutFeedback>

                {/*this scroll view is really busted*/}
                <ScrollView
                    horizontal pagingEnabled
                    contentOffset={{x: post.media.items ? width : 0, y:0}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('post', {postID: post.id})}
                    >
                        <View style={{width: width}}>
                            <SummaryDisplay exercises={JSON.parse(post.data)}/>
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        //so we'd see all the images uploaded with the thing
                        post.media&&
                        post.media.items.map(({uri}) =>
                            //width doesn't work the way you expect btw
                            <S3Image key={uri} style={{width: width}} imgKey={uri}/>
                        )
                    }

                </ScrollView>

                <Row>
                    <LikeButton likes={post.likes} postID={post.id}/>
                    <CommentBar postID={post.id}/>
                </Row>


            </View>
        </View>
    );
};

export default Post;
