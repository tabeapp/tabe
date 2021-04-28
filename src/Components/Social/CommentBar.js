import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Row from '../Simple/Row';
import { BACKGROUND, PRIMARY } from '../../Style/Colors';
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

    return <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={{flex: 1, height: 50}}
    >
        <Row
            style={{
                overflow: 'hidden',
                justifyContent: 'center'
            }}
        >
            <Write
                value={comment}
                onChange={setComment}
                placeholder={'Add comment...'}
                style={{height: 50, fontSize: 20, flex: 1}}
            />
            <TouchableOpacity
                style={{
                    justifyContent: 'center', backgroundColor: PRIMARY,
                    height: '100%',
                    borderBottomRightRadius: 30,
                }}
                onPress={commentOnPost}
            >
                <Words>Comment</Words>
            </TouchableOpacity>
        </Row>
    </KeyboardAvoidingView>
}

export default CommentBar;
