import { listFollowRelationships } from '../../../graphql/queries';
import { createTimelineForAUser } from './CreateTimelineForAUser';
const gql = require('graphql-tag');

export const createTimelines = async (graphqlClient, postID, userID) => {
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
