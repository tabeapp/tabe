/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      image
      createdAt
      updatedAt
      posts {
        items {
          type
          id
          title
          description
          data
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        image
        createdAt
        updatedAt
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPostMedia = /* GraphQL */ `
  query GetPostMedia($id: ID!) {
    getPostMedia(id: $id) {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const listPostMedias = /* GraphQL */ `
  query ListPostMedias(
    $filter: ModelPostMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        uri
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        media {
          nextToken
        }
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      media {
        items {
          id
          postID
          uri
          createdAt
          updatedAt
        }
        nextToken
      }
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
        posts {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostsSortedByTimestamp = /* GraphQL */ `
  query ListPostsSortedByTimestamp(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByTimestamp(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        media {
          nextToken
        }
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
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        type
        id
        media {
          nextToken
        }
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
      nextToken
      total
    }
  }
`;
export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($followeeId: ID!, $followerId: ID!) {
    getFollowRelationship(followeeId: $followeeId, followerId: $followerId) {
      followeeId
      followerId
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const listFollowRelationships = /* GraphQL */ `
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
export const getTimeline = /* GraphQL */ `
  query GetTimeline($userId: ID!, $timestamp: AWSTimestamp!) {
    getTimeline(userId: $userId, timestamp: $timestamp) {
      userId
      timestamp
      postId
      createdAt
      updatedAt
      post {
        type
        id
        media {
          nextToken
        }
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
export const listTimelines = /* GraphQL */ `
  query ListTimelines(
    $userId: ID
    $timestamp: ModelIntKeyConditionInput
    $filter: ModelTimelineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTimelines(
      userId: $userId
      timestamp: $timestamp
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        timestamp
        postId
        createdAt
        updatedAt
        post {
          type
          id
          title
          description
          data
          userID
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
