import { createTimeline } from '../graphql/mutations';
const gql = require('graphql-tag');

export const createTimelineForAUser = async (graphqlClient, follower, postID) => {
    const timelineInput = {
        mutation: gql(createTimeline),
        variables: {
            input: {
                userID: follower.followerID,
                postID: postID
            },
        },
    };
    await graphqlClient.mutate(timelineInput);
};
