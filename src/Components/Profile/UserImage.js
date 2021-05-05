import React from 'react';
//nice and circular, with default little icon if not loaded
import { TouchableOpacity } from 'react-native';
import CachedImage from '../Social/CachedImage';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const UserImage = props => {
    const navigation = useNavigation();
    const {size, userID, onPress} = props;
    return <TouchableOpacity
        style={{height: size, width: size, borderRadius: size/2, overflow: 'hidden'}}
        onPress={() =>{
            if(!onPress)//default behavior
                navigation.navigate('profile', {userID: userID});
            else
                onPress();
        }}
    >
        <CachedImage imageKey={props.imageKey} height={size} width={size} placeholder={
            <Words><Ionicons color={'white'} name='person-outline' size={40}/></Words>
        }/>
    </TouchableOpacity>;

};

export default UserImage;
