
exports.createUserRecord = /* GraphQL */ `
  mutation CreateUserRecord(
    $input: CreateUserRecordInput!
    $condition: ModelUserRecordConditionInput
  ) {
    createUserRecord(input: $input, condition: $condition) {
      userID
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
exports.updateUserRecord = /* GraphQL */ `
  mutation UpdateUserRecord(
    $input: UpdateUserRecordInput!
    $condition: ModelUserRecordConditionInput
  ) {
    updateUserRecord(input: $input, condition: $condition) {
      userID
      userImage {
        userID
        uri
        createdAt
        updatedAt
      }
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
exports.createEffort = /* GraphQL */ `
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
exports.createTrophy = /* GraphQL */ `
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
exports.updateRoutine = /* GraphQL */ `
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
exports.updateCurrentWorkout = /* GraphQL */ `
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
exports.createPostMedia = /* GraphQL */ `
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
exports.createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
exports.createTimeline = /* GraphQL */ `
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
