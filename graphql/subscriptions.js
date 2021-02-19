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
          likes {
            nextToken
          }
          comments {
            nextToken
          }
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
          likes {
            nextToken
          }
          comments {
            nextToken
          }
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
          likes {
            nextToken
          }
          comments {
            nextToken
          }
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
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          userID
          postID
          content
          likes {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
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
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          userID
          postID
          content
          likes {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
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
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          userID
          postID
          content
          likes {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEffort = /* GraphQL */ `
  subscription OnCreateEffort {
    onCreateEffort {
      id
      postID
      userID
      exercise
      weight
      countryID
      country {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEffort = /* GraphQL */ `
  subscription OnUpdateEffort {
    onUpdateEffort {
      id
      postID
      userID
      exercise
      weight
      countryID
      country {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEffort = /* GraphQL */ `
  subscription OnDeleteEffort {
    onDeleteEffort {
      id
      postID
      userID
      exercise
      weight
      countryID
      country {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      id
      name
      superLocationID
      superLocation {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      id
      name
      superLocationID
      superLocation {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      id
      name
      superLocationID
      superLocation {
        id
        name
        superLocationID
        superLocation {
          id
          name
          superLocationID
          superLocation {
            id
            name
            superLocationID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      userID
      postID
      content
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      userID
      postID
      content
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      userID
      postID
      content
      likes {
        items {
          id
          parentID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRoutine = /* GraphQL */ `
  subscription OnCreateRoutine {
    onCreateRoutine {
      id
      userID
      title
      current
      routine
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoutine = /* GraphQL */ `
  subscription OnUpdateRoutine {
    onUpdateRoutine {
      id
      userID
      title
      current
      routine
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRoutine = /* GraphQL */ `
  subscription OnDeleteRoutine {
    onDeleteRoutine {
      id
      userID
      title
      current
      routine
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      parentID
      userID
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTimeline = /* GraphQL */ `
  subscription OnCreateTimeline($userId: String) {
    onCreateTimeline(userId: $userId) {
      userId
      postId
      createdAt
      updatedAt
      post {
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
        likes {
          items {
            id
            parentID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        comments {
          items {
            id
            userID
            postID
            content
            createdAt
            updatedAt
          }
          nextToken
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
      postId
      createdAt
      updatedAt
      post {
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
        likes {
          items {
            id
            parentID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        comments {
          items {
            id
            userID
            postID
            content
            createdAt
            updatedAt
          }
          nextToken
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
      postId
      createdAt
      updatedAt
      post {
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
        likes {
          items {
            id
            parentID
            userID
            createdAt
            updatedAt
          }
          nextToken
        }
        comments {
          items {
            id
            userID
            postID
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
