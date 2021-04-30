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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      type
      id
      title
      description
      data
      userID
      gymID
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
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
          updatedAt
          trophies {
            items {
              id
              effortID
              type
              name
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
        }
        nextToken
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
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      type
      id
      title
      description
      data
      userID
      gymID
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
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
          updatedAt
          trophies {
            items {
              id
              effortID
              type
              name
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
        }
        nextToken
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
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      type
      id
      title
      description
      data
      userID
      gymID
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
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
          updatedAt
          trophies {
            items {
              id
              effortID
              type
              name
              targetID
              rank
              createdAt
              updatedAt
            }
            nextToken
          }
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
        }
        nextToken
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
      male
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
      male
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
      male
      createdAt
      updatedAt
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateUserStats = /* GraphQL */ `
  subscription OnCreateUserStats {
    onCreateUserStats {
      userID
      birthday
      weight
      height
      male
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserStats = /* GraphQL */ `
  subscription OnUpdateUserStats {
    onUpdateUserStats {
      userID
      birthday
      weight
      height
      male
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserStats = /* GraphQL */ `
  subscription OnDeleteUserStats {
    onDeleteUserStats {
      userID
      birthday
      weight
      height
      male
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
      createdAt
      updatedAt
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateUserLocation = /* GraphQL */ `
  subscription OnUpdateUserLocation {
    onUpdateUserLocation {
      userID
      gymID
      createdAt
      updatedAt
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteUserLocation = /* GraphQL */ `
  subscription OnDeleteUserLocation {
    onDeleteUserLocation {
      userID
      gymID
      createdAt
      updatedAt
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
        country {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
        }
      }
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
      createdAt
      updatedAt
      country {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
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
      country {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
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
      country {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateRegion = /* GraphQL */ `
  subscription OnCreateRegion {
    onCreateRegion {
      id
      superRegionID
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
      name
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
      updatedAt
      trophies {
        items {
          id
          effortID
          type
          name
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
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
      updatedAt
      trophies {
        items {
          id
          effortID
          type
          name
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
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
      updatedAt
      trophies {
        items {
          id
          effortID
          type
          name
          targetID
          rank
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateTrophy = /* GraphQL */ `
  subscription OnCreateTrophy {
    onCreateTrophy {
      id
      effortID
      type
      name
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
      name
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
      name
      targetID
      rank
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFollowRelationship = /* GraphQL */ `
  subscription OnUpdateFollowRelationship {
    onUpdateFollowRelationship {
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFollowRelationship = /* GraphQL */ `
  subscription OnDeleteFollowRelationship {
    onDeleteFollowRelationship {
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTimeline = /* GraphQL */ `
  subscription OnCreateTimeline($userID: String) {
    onCreateTimeline(userID: $userID) {
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
        gymID
        createdAt
        updatedAt
        userImage {
          userID
          uri
          createdAt
          updatedAt
        }
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
          country {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
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
            updatedAt
            trophies {
              nextToken
            }
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
            userImage {
              userID
              uri
              createdAt
              updatedAt
            }
            likes {
              nextToken
            }
          }
          nextToken
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
      }
    }
  }
`;
export const onUpdateTimeline = /* GraphQL */ `
  subscription OnUpdateTimeline($userID: String) {
    onUpdateTimeline(userID: $userID) {
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
        gymID
        createdAt
        updatedAt
        userImage {
          userID
          uri
          createdAt
          updatedAt
        }
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
          country {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
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
            updatedAt
            trophies {
              nextToken
            }
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
            userImage {
              userID
              uri
              createdAt
              updatedAt
            }
            likes {
              nextToken
            }
          }
          nextToken
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
      }
    }
  }
`;
export const onDeleteTimeline = /* GraphQL */ `
  subscription OnDeleteTimeline($userID: String) {
    onDeleteTimeline(userID: $userID) {
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
        gymID
        createdAt
        updatedAt
        userImage {
          userID
          uri
          createdAt
          updatedAt
        }
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
          country {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
          }
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
            updatedAt
            trophies {
              nextToken
            }
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
            userImage {
              userID
              uri
              createdAt
              updatedAt
            }
            likes {
              nextToken
            }
          }
          nextToken
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
      }
    }
  }
`;
