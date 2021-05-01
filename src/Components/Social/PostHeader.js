import React from 'react';
import Row from '../Simple/Row';
import { TouchableOpacity, View } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import Words from '../Simple/Words';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { PAST_DATE_FORMAT } from '../../Utils/UtilFunctions';

//just the image, username, time, location
//we need to rethink this
//instead of just post, let's instead take
//userID, , createdAt, uri
//nah just send the post in
//also size would be cool
const PostHeader = props => {
    const {post, size} = props;
    const {userID, createdAt} = post;
    const imageUri = post.userImage.uri;
    const gymName = post.gym?.name;

    const now = moment();

    //this really should be in utils, super useful
    const navigation = useNavigation();

    return(
        <Row style={{padding: 10, justifyContent: 'flex-start'}}>
            <TouchableOpacity
                style={{height: size, width: size, borderRadius: size/2, overflow: 'hidden'}}
                onPress={() => {
                    navigation.navigate('profile', {userID: userID})
                }}
            >
                {
                    imageUri &&
                    <S3Image key={imageUri} style={{width: size, height: size}} imgKey={imageUri}/>
                }
            </TouchableOpacity>

            <View style={{marginLeft: 5}}>
                <Words style={{fontWeight: 'bold'}}>{userID}</Words>
                <TouchableOpacity>
                    <Words>{PAST_DATE_FORMAT(createdAt, now)}</Words>
                </TouchableOpacity>
                {
                    gymName &&
                    <Words>{gymName}</Words>
                }
            </View>
        </Row>
    )
};

export default PostHeader;
