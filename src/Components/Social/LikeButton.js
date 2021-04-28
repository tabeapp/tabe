import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { createLike, deleteLike } from '../../../graphql/mutations';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRIMARY } from '../../Style/Colors';
import { UserContext } from '../../Contexts/UserProvider';

//ugh i have no idea
//but this logic is good to reuse
//it's a pretty dumb component, everything is handed to it
const LikeButton = props => {
    const {likes, postID} = props;
    const { username } = useContext(UserContext);

    const [liked, setLiked] = useState(false);

    const handlePress = () => {
        //the like function

        if(liked){
            //unlike
            setLiked(false);

            const likeID = likes.items.find(like =>
                like.userID === username
            ).id;

            //this needs id
            API.graphql(graphqlOperation(deleteLike, {
                input: {
                    id: likeID
                }
            }))
                .then(res => {
                    if(res.data.deleteLike.errors)
                        setLiked(true);
                })

        } else{
            // like
            setLiked(true);
            API.graphql(graphqlOperation(createLike, {
                input: {
                    parentID: postID,
                    userID: username
                }
            }))
                .then(res => {
                    if (res.data.createLike.errors)//is it errors or error?
                        setLiked(false)
                })
        }
    };

    useEffect(() => {
        const l = likes.items.some(like =>
            like.userID === username
        );
        setLiked(l);

    }, [likes])

    const icon = liked ? 'heart' : 'heart-outline';

    return (
        <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
            onPress={handlePress}
        >
            <Words style={{fontWeight: 'bold'}}>
                {likes.items.length}
            </Words>
            <Words>
                <Ionicons size={30} color={PRIMARY} name={icon}/>
            </Words>
        </TouchableOpacity>
    );
};

export default LikeButton;
