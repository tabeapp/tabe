import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import Words from '../Simple/Words';
import { useNavigation } from '@react-navigation/native';
import { DARK_GRAY, TEXT_COLOR } from '../../Style/Colors';
import Row from '../Simple/Row';
import PostHeader from './PostHeader';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import SummaryDisplay from '../Workout/SummaryDisplay';
import LikeButton from './LikeButton';
import CommentBar from './CommentBar';
import CachedImage from './CachedImage';
import Ionicons from 'react-native-vector-icons/Ionicons';

//this really is just for rendering for the most part
const Post = ({post}) => {

    const width = useWindowDimensions().width;

    const navigation = useNavigation();

    //this is being really fucking annoying about undefineds
    //not sure what's going on, might need to look at some stuff
    //posts aren't immediately loading when you post nowadays
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded( post.media && post.userImage && post.data && post.likes );
    }, [post]);

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
                    contentOffset={{x: post.media.items.length!==0 ? width : 0, y:0}}
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
                            <CachedImage key={uri} imageKey={uri} style={{width: width, height: width}} placeholder={
                                <Words><Ionicons color={TEXT_COLOR} name='person-outline' size={40}/></Words>

                            }/>
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
