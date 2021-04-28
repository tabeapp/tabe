import React, { useContext, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Row from '../Simple/Row';
import { BACKGROUND, DARK_GRAY, PRIMARY } from '../../Style/Colors';
import Write from '../Simple/Write';
import Words from '../Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import { createComment } from '../../../graphql/mutations';
import { UserContext } from '../../Contexts/UserProvider';

//even easier than the like thing
const CommentBar = props => {
    const {username} = useContext(UserContext);
    const {postID} = props;

    const [comment, setComment] = useState('');

    const commentOnPost = () => {
        API.graphql(graphqlOperation(createComment, {
            input: {
                userID: username,
                postID: postID,
                content: comment
            }
        }))
            .then(res => {
                setComment('');
            });
    };

    return <View
        //behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{flex: 1, height: 40}}
    >
        <Row
            style={{
                overflow: 'hidden',
            }}
        >
            <Write
                value={comment}
                onChange={setComment}
                placeholder={'Add comment...'}
                style={{padding: 3, height: 40, fontSize: 20, flex: 1, backgroundColor: DARK_GRAY}}
            />

            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: PRIMARY,
                    height: 40,
                    width: 90,
                    borderBottomRightRadius: 20,
                }}
                onPress={commentOnPost}
            >
                <Words>Comment</Words>
            </TouchableOpacity>
        </Row>
    </View>
}

export default CommentBar;
