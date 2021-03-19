const { listFollowRelationships } = require('../../../graphql/queries');
const { createTimelineForAUser } = require('./CreateTimelineForAUser');
const gql = require('graphql-tag');

exports.createTimelines = async (graphqlClient, postID, userID) => {
    const queryInput = {
        followeeID: userID,
        limit: 100000,
    };

    const listFollowRelationshipsResult = await graphqlClient.query({
        query: gql(listFollowRelationships),
        fetchPolicy: 'network-only',
        variables: queryInput,
    });

    const followers = listFollowRelationshipsResult.data.listFollowRelationships.items;

    if(!followers.some(follower => follower.followerID === userID )){
        followers.push({ followerID: userID });
    }

    //do we really need to await?
    await Promise.all(followers.map(follower =>
        createTimelineForAUser(graphqlClient, follower, postID)
    ));

};
