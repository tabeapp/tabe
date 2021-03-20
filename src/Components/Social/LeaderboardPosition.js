import React from 'react';
import {View} from 'react-native';
import Words from '../Simple/Words';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Row from '../Simple/Row';
import { useNavigation } from '@react-navigation/native';
import { PRIMARY } from '../../Style/Theme';
import TrophyIcon from '../../Utils/TrophyIcon';
import { S3Image } from 'aws-amplify-react-native';

//concepttually simliar to trophy visual, but with very different information
const LeaderboardPosition = props => {
    const {record, rank} = props;

    const navigation = useNavigation();

    //go to post
    const handlePress = () => {
        navigation.navigate('post', {postID: record.postID})
    };

    //i guess I could have a little userimage component
    return (
        <TouchableOpacity onPress={handlePress} style={{height: 40, borderColor: PRIMARY, borderBottomWidth: 1}}>
            <Row>
                <Words><TrophyIcon rank={rank}/></Words>
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => navigation.navigate('profile', {userID: record.userID}) }
                >
                    <View
                        style={{height: 40, width: 40, borderRadius: 20, overflow: 'hidden'}}
                    >
                        <S3Image key={record.userImage.uri} style={{width: 40, height: 40}} imgKey={record.userImage.uri}/>
                    </View>
                    <Words>{record.userID}</Words>
                </TouchableOpacity>
                <Words>{record.updatedAt}</Words>
                <Words>{record.orm}</Words>
            </Row>
        </TouchableOpacity>
    );
};

export default LeaderboardPosition;
