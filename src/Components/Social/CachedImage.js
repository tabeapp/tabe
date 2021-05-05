import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import RNFetchBlob from 'rn-fetch-blob';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
const dirs = RNFetchBlob.fs.dirs;

const CachedImage = props => {

    const navigation = useNavigation();
    const {size, userID, imageKey} = props;
    const [loaded, setLoaded] = useState(false);

    const downloadImage = async (key) => {
        //this url is ridiculously long lol
        const url = await Storage.get(key);
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path : `${dirs.DocumentDir}/${key}`
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
                setLoaded(true);
            });
    };

    useEffect(() => {
        RNFetchBlob.fs.exists(`${dirs.DocumentDir}/${imageKey}`).then(imageSaved =>{
            if(imageSaved)
                setLoaded(true);
            else
                downloadImage(imageKey);
        });

    }, [imageKey]);

    return <TouchableOpacity
        style={{height: size, width: size, borderRadius: size/2, overflow: 'hidden'}}
        onPress={() => {
            navigation.navigate('profile', {userID: userID})
        }}
    >
        {
            loaded ?
                <Image source={{uri: `file://${dirs.DocumentDir}/${imageKey}`}} style={{width: size, height: size}}/> :
                <View style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Words><Ionicons color={'white'} name='person-outline' size={40}/></Words>
                    <Words>Add image</Words>
                </View>
        }
    </TouchableOpacity>
};

export default CachedImage;
