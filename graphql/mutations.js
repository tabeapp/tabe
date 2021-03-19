/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteUserRecord = /* GraphQL */ `
  mutation DeleteUserRecord(
    $input: DeleteUserRecordInput!
    $condition: ModelUserRecordConditionInput
  ) {
    deleteUserRecord(input: $input, condition: $condition) {
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
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateUserLocation = /* GraphQL */ `
  mutation UpdateUserLocation(
    $input: UpdateUserLocationInput!
    $condition: ModelUserLocationConditionInput
  ) {
    updateUserLocation(input: $input, condition: $condition) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const deleteUserLocation = /* GraphQL */ `
  mutation DeleteUserLocation(
    $input: DeleteUserLocationInput!
    $condition: ModelUserLocationConditionInput
  ) {
    deleteUserLocation(input: $input, condition: $condition) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const deleteUserImage = /* GraphQL */ `
  mutation DeleteUserImage(
    $input: DeleteUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    deleteUserImage(input: $input, condition: $condition) {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const updateRegion = /* GraphQL */ `
  mutation UpdateRegion(
    $input: UpdateRegionInput!
    $condition: ModelRegionConditionInput
  ) {
    updateRegion(input: $input, condition: $condition) {
      id
      superRegionID
      name
      createdAt
      updatedAt
      superRegion {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const deleteRegion = /* GraphQL */ `
  mutation DeleteRegion(
    $input: DeleteRegionInput!
    $condition: ModelRegionConditionInput
  ) {
    deleteRegion(input: $input, condition: $condition) {
      id
      superRegionID
      name
      createdAt
      updatedAt
      superRegion {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
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
export const updateEffort = /* GraphQL */ `
  mutation UpdateEffort(
    $input: UpdateEffortInput!
    $condition: ModelEffortConditionInput
  ) {
    updateEffort(input: $input, condition: $condition) {
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
export const deleteEffort = /* GraphQL */ `
  mutation DeleteEffort(
    $input: DeleteEffortInput!
    $condition: ModelEffortConditionInput
  ) {
    deleteEffort(input: $input, condition: $condition) {
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
export const updateTrophy = /* GraphQL */ `
  mutation UpdateTrophy(
    $input: UpdateTrophyInput!
    $condition: ModelTrophyConditionInput
  ) {
    updateTrophy(input: $input, condition: $condition) {
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
export const deleteTrophy = /* GraphQL */ `
  mutation DeleteTrophy(
    $input: DeleteTrophyInput!
    $condition: ModelTrophyConditionInput
  ) {
    deleteTrophy(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      userID
      postID
      content
      createdAt
      updatedAt
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      userID
      postID
      content
      createdAt
      updatedAt
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
export const deleteRoutine = /* GraphQL */ `
  mutation DeleteRoutine(
    $input: DeleteRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    deleteRoutine(input: $input, condition: $condition) {
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
export const createCurrentWorkout = /* GraphQL */ `
  mutation CreateCurrentWorkout(
    $input: CreateCurrentWorkoutInput!
    $condition: ModelCurrentWorkoutConditionInput
  ) {
    createCurrentWorkout(input: $input, condition: $condition) {
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const deleteCurrentWorkout = /* GraphQL */ `
  mutation DeleteCurrentWorkout(
    $input: DeleteCurrentWorkoutInput!
    $condition: ModelCurrentWorkoutConditionInput
  ) {
    deleteCurrentWorkout(input: $input, condition: $condition) {
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updatePostMedia = /* GraphQL */ `
  mutation UpdatePostMedia(
    $input: UpdatePostMediaInput!
    $condition: ModelPostMediaConditionInput
  ) {
    updatePostMedia(input: $input, condition: $condition) {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const deletePostMedia = /* GraphQL */ `
  mutation DeletePostMedia(
    $input: DeletePostMediaInput!
    $condition: ModelPostMediaConditionInput
  ) {
    deletePostMedia(input: $input, condition: $condition) {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowRelationship = /* GraphQL */ `
  mutation UpdateFollowRelationship(
    $input: UpdateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    updateFollowRelationship(input: $input, condition: $condition) {
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowRelationship = /* GraphQL */ `
  mutation DeleteFollowRelationship(
    $input: DeleteFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    deleteFollowRelationship(input: $input, condition: $condition) {
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const updateTimeline = /* GraphQL */ `
  mutation UpdateTimeline(
    $input: UpdateTimelineInput!
    $condition: ModelTimelineConditionInput
  ) {
    updateTimeline(input: $input, condition: $condition) {
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
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
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
export const deleteTimeline = /* GraphQL */ `
  mutation DeleteTimeline(
    $input: DeleteTimelineInput!
    $condition: ModelTimelineConditionInput
  ) {
    deleteTimeline(input: $input, condition: $condition) {
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
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
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
export const createUserRecord = /* GraphQL */ `
  mutation CreateUserRecord(
    $input: CreateUserRecordInput!
    $condition: ModelUserRecordConditionInput
  ) {
    createUserRecord(input: $input, condition: $condition) {
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
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateUserRecord = /* GraphQL */ `
  mutation UpdateUserRecord(
    $input: UpdateUserRecordInput!
    $condition: ModelUserRecordConditionInput
  ) {
    updateUserRecord(input: $input, condition: $condition) {
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
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
    }
  }
`;
export const createUserLocation = /* GraphQL */ `
  mutation CreateUserLocation(
    $input: CreateUserLocationInput!
    $condition: ModelUserLocationConditionInput
  ) {
    createUserLocation(input: $input, condition: $condition) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const createUserImage = /* GraphQL */ `
  mutation CreateUserImage(
    $input: CreateUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    createUserImage(input: $input, condition: $condition) {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const updateUserImage = /* GraphQL */ `
  mutation UpdateUserImage(
    $input: UpdateUserImageInput!
    $condition: ModelUserImageConditionInput
  ) {
    updateUserImage(input: $input, condition: $condition) {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const createGym = /* GraphQL */ `
  mutation CreateGym(
    $input: CreateGymInput!
    $condition: ModelGymConditionInput
  ) {
    createGym(input: $input, condition: $condition) {
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
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const updateGym = /* GraphQL */ `
  mutation UpdateGym(
    $input: UpdateGymInput!
    $condition: ModelGymConditionInput
  ) {
    updateGym(input: $input, condition: $condition) {
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
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const deleteGym = /* GraphQL */ `
  mutation DeleteGym(
    $input: DeleteGymInput!
    $condition: ModelGymConditionInput
  ) {
    deleteGym(input: $input, condition: $condition) {
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
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      state {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
      city {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const createRegion = /* GraphQL */ `
  mutation CreateRegion(
    $input: CreateRegionInput!
    $condition: ModelRegionConditionInput
  ) {
    createRegion(input: $input, condition: $condition) {
      id
      superRegionID
      name
      createdAt
      updatedAt
      superRegion {
        id
        superRegionID
        name
        createdAt
        updatedAt
        superRegion {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
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
export const createEffort = /* GraphQL */ `
  mutation CreateEffort(
    $input: CreateEffortInput!
    $condition: ModelEffortConditionInput
  ) {
    createEffort(input: $input, condition: $condition) {
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
export const createTrophy = /* GraphQL */ `
  mutation CreateTrophy(
    $input: CreateTrophyInput!
    $condition: ModelTrophyConditionInput
  ) {
    createTrophy(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      userID
      postID
      content
      createdAt
      updatedAt
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
export const createRoutine = /* GraphQL */ `
  mutation CreateRoutine(
    $input: CreateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    createRoutine(input: $input, condition: $condition) {
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
export const updateRoutine = /* GraphQL */ `
  mutation UpdateRoutine(
    $input: UpdateRoutineInput!
    $condition: ModelRoutineConditionInput
  ) {
    updateRoutine(input: $input, condition: $condition) {
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
export const updateCurrentWorkout = /* GraphQL */ `
  mutation UpdateCurrentWorkout(
    $input: UpdateCurrentWorkoutInput!
    $condition: ModelCurrentWorkoutConditionInput
  ) {
    updateCurrentWorkout(input: $input, condition: $condition) {
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createPostMedia = /* GraphQL */ `
  mutation CreatePostMedia(
    $input: CreatePostMediaInput!
    $condition: ModelPostMediaConditionInput
  ) {
    createPostMedia(input: $input, condition: $condition) {
      id
      postID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const createFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship(
    $input: CreateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    createFollowRelationship(input: $input, condition: $condition) {
      followeeID
      followerID
      createdAt
      updatedAt
    }
  }
`;
export const createTimeline = /* GraphQL */ `
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
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          state {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
          city {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
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
export const createPostAndTimeline = /* GraphQL */ `
  mutation CreatePostAndTimeline(
    $title: String!
    $description: String!
    $workoutData: String!
    $imageUrls: String!
  ) {
    createPostAndTimeline(
      title: $title
      description: $description
      workoutData: $workoutData
      imageUrls: $imageUrls
    ) {
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
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        state {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
        }
        city {
          id
          superRegionID
          name
          createdAt
          updatedAt
          superRegion {
            id
            superRegionID
            name
            createdAt
            updatedAt
            superRegion {
              id
              superRegionID
              name
              createdAt
              updatedAt
            }
          }
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
