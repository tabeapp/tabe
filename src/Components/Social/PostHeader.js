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
const PostHeader = props => {

    const {userID, createdAt, imageUri} = props;

    const now = moment();

    //this really should be in utils, super useful
    const navigation = useNavigation();


    return(
        <Row style={{padding: 10, justifyContent: 'flex-start'}}>
            <TouchableOpacity
                style={{height: 40, width: 40, borderRadius: 20, overflow: 'hidden'}}
                onPress={() => {
                    navigation.navigate('profile', {userID: userID})
                }}
            >
                {

                    imageUri &&
                    <S3Image key={imageUri} style={{width: 40, height: 40}} imgKey={imageUri}/>
                }
            </TouchableOpacity>

            <View>
                <Words style={{fontWeight: 'bold'}}>{userID}</Words>
                <TouchableOpacity>
                    <Words>{PAST_DATE_FORMAT(createdAt, now)}</Words>
                </TouchableOpacity>
            </View>
        </Row>
    )
};

export default PostHeader;
