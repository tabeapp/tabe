import React from 'react';
import { View } from 'react-native';
import Words from '../Simple/Words';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND, DARK_GRAY } from '../../Style/Colors';
import PostHeader from './PostHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FORMAT_WEIGHT } from '../../Utils/UtilFunctions';

//concepttually simliar to trophy visual, but with very different information
const LeaderboardPosition = props => {
    const {record, rank} = props;

    const navigation = useNavigation();

    //go to post
    const handlePress = () =>
        navigation.navigate('post', {postID: record.postID});

    //i guess I could have a little userimage component
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{backgroundColor: DARK_GRAY, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 60, borderColor: BACKGROUND, borderBottomWidth: 1}}
        >
            <Words style={{width: 50, textAlign: 'center', fontSize: 20-rank}}>{
                rank === 0 ?
                    <Ionicons color={'#d9a952'} name={'trophy'} size={25}/> :
                    rank+1
            }</Words>

            <View style={{flex: 1}}>
                <PostHeader
                    post={{
                        userID: record.userID,
                        createdAt: record.updatedAt,
                        userImage: { uri: record.userImage.uri }
                    }}
                    size={35}
                />
            </View>

            <Words style={{width: 60}}>{FORMAT_WEIGHT(record.orm)}lb</Words>
        </TouchableOpacity>
    );
};

export default LeaderboardPosition;
