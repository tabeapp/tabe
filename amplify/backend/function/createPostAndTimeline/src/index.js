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
    console.log('event', event)
    let env;
    let graphql_auth;

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

    if (!graphqlClient) {
        graphqlClient = new AWSAppSyncClient({
            //i think this is the problem
            url: env.API_TABE_GRAPHQLAPIENDPOINTOUTPUT,
            region: env.REGION,
            auth: graphql_auth,
            disableOffline: true,
        });
    }

    const getUserLocationResult = await graphqlClient.query({
        query: gql(getUserLocation),
        fetchPolicy: 'network-only',
        variables: {
            userID: event.identity.username
        }
    });

    let gymID = 'emptyGym';
    if(getUserLocationResult.data.getUserLocation)
        gymID = getUserLocationResult.data.getUserLocation.gymID;


    console.log('gymid from appsync', gymID);

    //post to the origin
    const postInput = {
        mutation: gql(createPost),
        variables: {
            input: {
                type: 'post',
                title: event.arguments.title,
                description: event.arguments.description,
                data: event.arguments.data,
                gymID: gymID,
                userID: event.identity.username,
            },
        },
    };
    const res = await graphqlClient.mutate(postInput);
    console.log(res);
    const post = res.data.createPost;

    // list followers
    const queryInput = {
        followeeID: event.identity.username,
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
    //only add yourself if you're not already added
    if(!followers.some(follower => follower.followerID === post.userID )){
        followers.push({ followerID: post.userID });
    }
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
                userID: follower.followerID,
                postID: post.id,
            },
        },
    }
    const res = await graphqlClient.mutate(timelineInput);
    console.log(res);
}

const getUserLocation = /* GraphQL */ `
  query GetUserLocation($userID: ID!) {
    getUserLocation(userID: $userID) {
      userID
      gymID
      createdAt
      updatedAt
    }
  }
`;

const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeID: ID
    $followerID: ModelIDKeyConditionInput
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowRelationships(
      followeeID: $followeeID
      followerID: $followerID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeID
        followerID
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
      title
      description
      data
      userID
      gymID
      user {
        id
        username
        email
        image
        createdAt
        updatedAt
      }
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
      userID
      postID
      createdAt
      updatedAt
      post {
        type
        id
        title
        description
        data
        userID
        user {
          id
          username
          email
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
