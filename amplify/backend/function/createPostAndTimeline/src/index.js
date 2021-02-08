/* Amplify Params - DO NOT EDIT
	API_TABE_GRAPHQLAPIENDPOINTOUTPUT
	API_TABE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');

let graphqlClient;

exports.handler = async (event, context, callback) => {
    console.log(event)
    let env;
    let graphql_auth;

    if(event.arguments.content.length > 140) {
        callback('content length is over 140', null);
    }

    if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV.startsWith('AWS_Lambda_')) {
        //for cloud env
        env = process.env;
        graphql_auth = {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: env.AWS_ACCESS_KEY_ID,
                secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
                sessionToken: env.AWS_SESSION_TOKEN,
            }
        };
    } else {
        // for local mock
        env = {
            API_TABE_GRAPHQLAPIENDPOINTOUTPUT: 'http://192.168.1.2:20002/graphql',
            REGION: 'us-east-1',
        }
        graphql_auth = {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: 'mock',
                secretAccessKey: 'mock',
                sessionToken: 'mock',
            }
        };
    }
    console.log(env);
    console.log(graphql_auth);

    if (!graphqlClient) {
        graphqlClient = new AWSAppSyncClient({
            //i think this is the problem
            url: env.API_TABE_GRAPHQLAPIENDPOINTOUTPUT,
            region: env.REGION,
            auth: graphql_auth,
            disableOffline: true,
        });
    }


    //post to the origin
    const postInput = {
        mutation: gql(createPost),
        variables: {
            input: {
                type: 'post',
                timestamp: Date.now(),
                owner: event.identity.username,
                content: event.arguments.content,
            },
        },
    };
    const res = await graphqlClient.mutate(postInput);
    console.log(res);
    const post = res.data.createPost;

    // list followers
    const queryInput = {
        followeeId: event.identity.username,
        limit: 100000,
    }
    console.log(queryInput)
    const listFollowRelationshipsResult = await graphqlClient.query({
        query: gql(listFollowRelationships),
        fetchPolicy: 'network-only',
        variables: queryInput,
    });
    console.log(listFollowRelationshipsResult);
    const followers = listFollowRelationshipsResult.data.listFollowRelationships.items;
    console.log(followers);

    //post to timeline
    followers.push({
        followerId: post.owner,
    })
    //is this scalable...
    const results = await Promise.all(followers.map((follower)=> createTimelineForAUser({follower: follower, post: post})));
    console.log(results)

    return post;
};

const createTimelineForAUser = async ({follower, post}) => {
    const timelineInput = {
        mutation: gql(createTimeline),
        variables: {
            input: {
                userId: follower.followerId,
                timestamp: post.timestamp,
                postId: post.id,
            },
        },
    }
    const res = await graphqlClient.mutate(timelineInput);
    console.log(res);
}

const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeId: ID
    $followerId: ModelIDKeyConditionInput
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowRelationships(
      followeeId: $followeeId
      followerId: $followerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeId
        followerId
        timestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      type
      id
      content
      owner
      timestamp
      createdAt
      updatedAt
    }
  }
`;

const createTimeline = /* GraphQL */ `
  mutation CreateTimeline(
    $input: CreateTimelineInput!
    $condition: ModelTimelineConditionInput
  ) {
    createTimeline(input: $input, condition: $condition) {
      userId
      timestamp
      postId
      createdAt
      updatedAt
      post {
        id
        content
        type
        owner
        timestamp
        createdAt
        updatedAt
      }
    }
  }
`;
