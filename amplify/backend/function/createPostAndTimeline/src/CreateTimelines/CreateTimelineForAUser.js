const { createTimeline } = require('/opt/mutations');
const gql = require('graphql-tag');

exports.createTimelineForAUser = async (graphqlClient, follower, postID) => {
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
