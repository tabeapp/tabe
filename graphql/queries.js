/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nearbyGyms = /* GraphQL */ `
  query NearbyGyms($location: LocationInput!, $km: Int) {
    nearbyGyms(location: $location, km: $km) {
      items {
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
      total
      nextToken
    }
  }
`;
export const getUserRecord = /* GraphQL */ `
  query GetUserRecord($userID: ID!, $exercise: String!) {
    getUserRecord(userID: $userID, exercise: $exercise) {
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
export const listUserRecords = /* GraphQL */ `
  query ListUserRecords(
    $userID: ID
    $exercise: ModelStringKeyConditionInput
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserRecords(
      userID: $userID
      exercise: $exercise
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listRecordsByUser = /* GraphQL */ `
  query ListRecordsByUser(
    $userID: ID
    $orm: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordsByUser(
      userID: $userID
      orm: $orm
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listRecordsByExercise = /* GraphQL */ `
  query ListRecordsByExercise(
    $exercise: String
    $orm: ModelStringKeyConditionInput
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
      nextToken
    }
  }
`;
export const getUserStats = /* GraphQL */ `
  query GetUserStats($userID: ID!) {
    getUserStats(userID: $userID) {
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
export const listUserStatss = /* GraphQL */ `
  query ListUserStatss(
    $userID: ID
    $filter: ModelUserStatsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserStatss(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        birthday
        weight
        height
        male
        createdAt
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
export const listUserLocations = /* GraphQL */ `
  query ListUserLocations(
    $userID: ID
    $filter: ModelUserLocationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserLocations(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listUserImages = /* GraphQL */ `
  query ListUserImages(
    $userID: ID
    $filter: ModelUserImageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserImages(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        uri
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserImage = /* GraphQL */ `
  query GetUserImage($userID: ID!) {
    getUserImage(userID: $userID) {
      userID
      uri
      createdAt
      updatedAt
    }
  }
`;
export const listGyms = /* GraphQL */ `
  query ListGyms(
    $filter: ModelGymFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGyms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGym = /* GraphQL */ `
  query GetGym($id: ID!) {
    getGym(id: $id) {
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
export const listGymsByCity = /* GraphQL */ `
  query ListGymsByCity(
    $cityID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelGymFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGymsByCity(
      cityID: $cityID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const searchGyms = /* GraphQL */ `
  query SearchGyms(
    $filter: SearchableGymFilterInput
    $sort: SearchableGymSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchGyms(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const listRegions = /* GraphQL */ `
  query ListRegions(
    $filter: ModelRegionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        superRegionID
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRegion = /* GraphQL */ `
  query GetRegion($id: ID!) {
    getRegion(id: $id) {
      id
      superRegionID
      name
      createdAt
      updatedAt
    }
  }
`;
export const listRegionsBySuperRegions = /* GraphQL */ `
  query ListRegionsBySuperRegions(
    $superRegionID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelRegionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegionsBySuperRegions(
      superRegionID: $superRegionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        superRegionID
        name
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
      nextToken
    }
  }
`;
export const listPostsSortedByUserAndTimestamp = /* GraphQL */ `
  query ListPostsSortedByUserAndTimestamp(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByUserAndTimestamp(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      total
    }
  }
`;
export const getEffort = /* GraphQL */ `
  query GetEffort($id: ID!) {
    getEffort(id: $id) {
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
export const listEfforts = /* GraphQL */ `
  query ListEfforts(
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEfforts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getTrophy = /* GraphQL */ `
  query GetTrophy($id: ID!) {
    getTrophy(id: $id) {
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
export const listTrophys = /* GraphQL */ `
  query ListTrophys(
    $filter: ModelTrophyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrophys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const listRoutines = /* GraphQL */ `
  query ListRoutines(
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listRoutinesByUser = /* GraphQL */ `
  query ListRoutinesByUser(
    $userID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutinesByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCurrentRoutinesByUser = /* GraphQL */ `
  query ListCurrentRoutinesByUser(
    $userID: ID
    $current: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoutineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCurrentRoutinesByUser(
      userID: $userID
      current: $current
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        title
        current
        routine
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      parentID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($followeeID: ID!, $followerID: ID!) {
    getFollowRelationship(followeeID: $followeeID, followerID: $followerID) {
      followeeID
      followerID
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
export const getTimeline = /* GraphQL */ `
  query GetTimeline($userID: ID!, $createdAt: String!) {
    getTimeline(userID: $userID, createdAt: $createdAt) {
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
export const listTimelines = /* GraphQL */ `
  query ListTimelines(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelTimelineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTimelines(
      userID: $userID
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
