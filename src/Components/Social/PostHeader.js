import React from 'react';
import Row from '../Simple/Row';
import { TouchableOpacity, View } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';
import Words from '../Simple/Words';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

//just the image, username, time, location
//we need to rethink this
//instead of just post, let's instead take
//userID, , createdAt, uri
const PostHeader = props => {

    const {userID, createdAt, imageUri} = props;

    const now = moment();
    const calcTimestampDiff = (timestamp) => {
        const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

        for (let i=0; i < scales.length; i++){
            const scale = scales[i];
            const diff = moment(now).diff(timestamp /** 1000*/, scale);
            if( diff > 0) return diff + scale.charAt(0)
        }

        return 0 + scales[scales.length - 1].charAt(0)
    };
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
                    {/*<Words>{moment(post.createdAt).format('MMMM D YYYY, h:mma')}</Words>*/}
                    <Words>{calcTimestampDiff(createdAt)}</Words>
                </TouchableOpacity>
            </View>
        </Row>
    )
};

export default PostHeader;
