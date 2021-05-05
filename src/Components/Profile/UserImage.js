import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import CachedImage from '../Social/CachedImage';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserImage } from '../../../graphql/queries';

//nice and circular, with default little icon if not loaded
const UserImage = props => {
    const navigation = useNavigation();
    const {size, userID, onPress} = props;
    //optionally uses prop.imagekey, np if this is undefined
    const [imageKey, setImageKey] = useState(props.imageKey);

    useEffect(() => {
        if(!userID)
            return;

        API.graphql(graphqlOperation(getUserImage, {
            userID: userID
        })).then(result => {
            if(result.data.getUserImage)
                setImageKey(result.data.getUserImage.uri);
        });
    });

    return <TouchableOpacity
        style={{height: size, width: size, borderRadius: size/2, overflow: 'hidden'}}
        onPress={() =>{
            if(!onPress)//default behavior
                navigation.navigate('profile', {userID: userID});
            else
                onPress();
        }}
    >
        <CachedImage imageKey={imageKey} height={size} width={size} placeholder={
            <Words><Ionicons color={'white'} name='person-outline' size={40}/></Words>
        }/>
    </TouchableOpacity>;
};

export default UserImage;
