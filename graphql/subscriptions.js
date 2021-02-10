/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreatePostMedia = /* GraphQL */ `
  subscription OnCreatePostMedia {
    onCreatePostMedia {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePostMedia = /* GraphQL */ `
  subscription OnUpdatePostMedia {
    onUpdatePostMedia {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePostMedia = /* GraphQL */ `
  subscription OnDeletePostMedia {
    onDeletePostMedia {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFollowRelationship = /* GraphQL */ `
  subscription OnCreateFollowRelationship {
    onCreateFollowRelationship {
      followeeId
      followerId
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFollowRelationship = /* GraphQL */ `
  subscription OnUpdateFollowRelationship {
    onUpdateFollowRelationship {
      followeeId
      followerId
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFollowRelationship = /* GraphQL */ `
  subscription OnDeleteFollowRelationship {
    onDeleteFollowRelationship {
      followeeId
      followerId
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTimeline = /* GraphQL */ `
  subscription OnCreateTimeline($userId: String) {
    onCreateTimeline(userId: $userId) {
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
export const onUpdateTimeline = /* GraphQL */ `
  subscription OnUpdateTimeline($userId: String) {
    onUpdateTimeline(userId: $userId) {
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
export const onDeleteTimeline = /* GraphQL */ `
  subscription OnDeleteTimeline($userId: String) {
    onDeleteTimeline(userId: $userId) {
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
