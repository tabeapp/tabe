/* eslint-disable */
// this is an auto generated file. This will be overwritten

exports.getUserRecord = /* GraphQL */ `
  query GetUserRecord($userID: ID!, $exercise: String!) {
    getUserRecord(userID: $userID, exercise: $exercise) {
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
exports.getRoutine = /* GraphQL */ `
  query GetRoutine($id: ID!) {
    getRoutine(id: $id) {
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
exports.listRecordsByExercise = /* GraphQL */ `
  query ListRecordsByExercise(
    $exercise: String
    $orm: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByExercise(
      exercise: $exercise
      orm: $orm
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
exports.listEffortsByExerciseAndUser = /* GraphQL */ `
  query ListEffortsByExerciseAndUser(
    $userID: ID
    $exerciseOrm: ModelEffortByExerciseAndUserCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndUser(
      userID: $userID
      exerciseOrm: $exerciseOrm
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
exports.getUserLocation = /* GraphQL */ `
  query GetUserLocation($userID: ID!) {
    getUserLocation(userID: $userID) {
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
exports.listFollowRelationships = /* GraphQL */ `
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
