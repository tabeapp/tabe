/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserRecord = /* GraphQL */ `
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
export const getRoutine = /* GraphQL */ `
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
export const listRecordsByExerciseAndCountry = /* GraphQL */ `
  query ListRecordsByExerciseAndCountry(
    $countryID: ID
    $exerciseOrm: ModelUserRecordByCountryCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByExerciseAndCountry(
      countryID: $countryID
      exerciseOrm: $exerciseOrm
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
export const listRecordsByExerciseAndState = /* GraphQL */ `
  query ListRecordsByExerciseAndState(
    $stateID: ID
    $exerciseOrm: ModelUserRecordByStateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByExerciseAndState(
      stateID: $stateID
      exerciseOrm: $exerciseOrm
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
export const listRecordsByExerciseAndCity = /* GraphQL */ `
  query ListRecordsByExerciseAndCity(
    $cityID: ID
    $exerciseOrm: ModelUserRecordByCityCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByExerciseAndCity(
      cityID: $cityID
      exerciseOrm: $exerciseOrm
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
export const listRecordsByExerciseAndGym = /* GraphQL */ `
  query ListRecordsByExerciseAndGym(
    $gymID: ID
    $exerciseOrm: ModelUserRecordByGymCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByExerciseAndGym(
      gymID: $gymID
      exerciseOrm: $exerciseOrm
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
export const listRecordsByExercise = /* GraphQL */ `
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
export const listEffortsByExerciseAndUser = /* GraphQL */ `
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
export const getUserLocation = /* GraphQL */ `
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
export const listFollowRelationships = /* GraphQL */ `
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
