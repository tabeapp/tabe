const { createPostMedia } = require('../graphql/mutations');
const gql = require('graphql-tag');

exports.uploadImages = async (graphqlClient, postID, imageUrls) => {
    //i don't think it's this guy either, we parse it
    console.log(imageUrls);
    await Promise.all(imageUrls.map(async key => {
        const postMediaInput = {
            mutation: gql(createPostMedia),
            variables: {
                input: {
                    postID: postID,
                    uri: key
                }
            }
        };
        await graphqlClient.mutate(postMediaInput);
    }));
};
