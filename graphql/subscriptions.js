/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onChangeRoutine = /* GraphQL */ `
  subscription OnChangeRoutine($userID: String!) {
    onChangeRoutine(userID: $userID) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      image
      createdAt
      updatedAt
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
    }
  }
`;
export const onCreateUserLocation = /* GraphQL */ `
  subscription OnCreateUserLocation {
    onCreateUserLocation {
      userID
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserLocation = /* GraphQL */ `
  subscription OnUpdateUserLocation {
    onUpdateUserLocation {
      userID
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserLocation = /* GraphQL */ `
  subscription OnDeleteUserLocation {
    onDeleteUserLocation {
      userID
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGym = /* GraphQL */ `
  subscription OnCreateGym {
    onCreateGym {
      id
      name
      location {
        lat
        lon
      }
      countryID
      stateID
      cityID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGym = /* GraphQL */ `
  subscription OnUpdateGym {
    onUpdateGym {
      id
      name
      location {
        lat
        lon
      }
      countryID
      stateID
      cityID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGym = /* GraphQL */ `
  subscription OnDeleteGym {
    onDeleteGym {
      id
      name
      location {
        lat
        lon
      }
      countryID
      stateID
      cityID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRegion = /* GraphQL */ `
  subscription OnCreateRegion {
    onCreateRegion {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRegion = /* GraphQL */ `
  subscription OnUpdateRegion {
    onUpdateRegion {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRegion = /* GraphQL */ `
  subscription OnDeleteRegion {
    onDeleteRegion {
      id
      name
      createdAt
      updatedAt
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
      reps
      orm
      countryID
      country {
        id
        name
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
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
      reps
      orm
      countryID
      country {
        id
        name
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
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
      reps
      orm
      countryID
      country {
        id
        name
        createdAt
        updatedAt
      }
      stateID
      state {
        id
        name
        createdAt
        updatedAt
      }
      cityID
      city {
        id
        name
        createdAt
        updatedAt
      }
      gymID
      gym {
        id
        name
        location {
          lat
          lon
        }
        countryID
        stateID
        cityID
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
export const onCreateCurrentWorkout = /* GraphQL */ `
  subscription OnCreateCurrentWorkout {
    onCreateCurrentWorkout {
      id
      userID
      data
      routineID
      routine {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurrentWorkout = /* GraphQL */ `
  subscription OnUpdateCurrentWorkout {
    onUpdateCurrentWorkout {
      id
      userID
      data
      routineID
      routine {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurrentWorkout = /* GraphQL */ `
  subscription OnDeleteCurrentWorkout {
    onDeleteCurrentWorkout {
      id
      userID
      data
      routineID
      routine {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
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
