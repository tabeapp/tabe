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
export const onCreateUserRecord = /* GraphQL */ `
  subscription OnCreateUserRecord {
    onCreateUserRecord {
      userID
      postID
      orm
      exercise
      countryID
      stateID
      cityID
      gymID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserRecord = /* GraphQL */ `
  subscription OnUpdateUserRecord {
    onUpdateUserRecord {
      userID
      postID
      orm
      exercise
      countryID
      stateID
      cityID
      gymID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserRecord = /* GraphQL */ `
  subscription OnDeleteUserRecord {
    onDeleteUserRecord {
      userID
      postID
      orm
      exercise
      countryID
      stateID
      cityID
      gymID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserImage = /* GraphQL */ `
  subscription OnCreateUserImage {
    onCreateUserImage {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserImage = /* GraphQL */ `
  subscription OnUpdateUserImage {
    onUpdateUserImage {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserImage = /* GraphQL */ `
  subscription OnDeleteUserImage {
    onDeleteUserImage {
      userID
      uri
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
      country {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
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
      country {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
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
      country {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRegion = /* GraphQL */ `
  subscription OnCreateRegion {
    onCreateRegion {
      id
      superRegionID
      superRegion {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
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
      superRegionID
      superRegion {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
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
      superRegionID
      superRegion {
        id
        superRegionID
        superRegion {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        name
        createdAt
        updatedAt
      }
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
        image
        createdAt
        updatedAt
      }
      userImage {
        userID
        uri
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
        nextToken
      }
      efforts {
        items {
          id
          postID
          userID
          exercise
          weight
          reps
          orm
          createdAt
          trophies {
            items {
              id
              effortID
              type
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
        image
        createdAt
        updatedAt
      }
      userImage {
        userID
        uri
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
        nextToken
      }
      efforts {
        items {
          id
          postID
          userID
          exercise
          weight
          reps
          orm
          createdAt
          trophies {
            items {
              id
              effortID
              type
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
        email
        image
        createdAt
        updatedAt
      }
      userImage {
        userID
        uri
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
        nextToken
      }
      efforts {
        items {
          id
          postID
          userID
          exercise
          weight
          reps
          orm
          createdAt
          trophies {
            items {
              id
              effortID
              type
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
      createdAt
      trophies {
        items {
          id
          effortID
          type
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
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
      createdAt
      trophies {
        items {
          id
          effortID
          type
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
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
      createdAt
      trophies {
        items {
          id
          effortID
          type
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateTrophy = /* GraphQL */ `
  subscription OnCreateTrophy {
    onCreateTrophy {
      id
      effortID
      type
      targetID
      rank
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTrophy = /* GraphQL */ `
  subscription OnUpdateTrophy {
    onUpdateTrophy {
      id
      effortID
      type
      targetID
      rank
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTrophy = /* GraphQL */ `
  subscription OnDeleteTrophy {
    onDeleteTrophy {
      id
      effortID
      type
      targetID
      rank
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
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurrentWorkout = /* GraphQL */ `
  subscription OnUpdateCurrentWorkout {
    onUpdateCurrentWorkout {
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurrentWorkout = /* GraphQL */ `
  subscription OnDeleteCurrentWorkout {
    onDeleteCurrentWorkout {
      userID
      data
      routineID
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
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
        country {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          superRegion {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          name
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
          country {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        user {
          id
          username
          email
          image
          createdAt
          updatedAt
        }
        userImage {
          userID
          uri
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
        efforts {
          items {
            id
            postID
            userID
            exercise
            weight
            reps
            orm
            createdAt
            trophies {
              nextToken
            }
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
          country {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        user {
          id
          username
          email
          image
          createdAt
          updatedAt
        }
        userImage {
          userID
          uri
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
        efforts {
          items {
            id
            postID
            userID
            exercise
            weight
            reps
            orm
            createdAt
            trophies {
              nextToken
            }
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
          country {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        user {
          id
          username
          email
          image
          createdAt
          updatedAt
        }
        userImage {
          userID
          uri
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
        efforts {
          items {
            id
            postID
            userID
            exercise
            weight
            reps
            orm
            createdAt
            trophies {
              nextToken
            }
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
