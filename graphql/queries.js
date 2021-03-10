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
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      image
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        image
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
          createdAt
          updatedAt
        }
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
      countryID
      stateID
      cityID
      gymID
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
        countryID
        stateID
        cityID
        gymID
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
export const getTrophy = /* GraphQL */ `
  query GetTrophy($id: ID!) {
    getTrophy(id: $id) {
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
        targetID
        rank
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
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
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
export const getCurrentWorkout = /* GraphQL */ `
  query GetCurrentWorkout($userID: ID!) {
    getCurrentWorkout(userID: $userID) {
      userID
      data
      routineID
      createdAt
      updatedAt
    }
  }
`;
export const listCurrentWorkouts = /* GraphQL */ `
  query ListCurrentWorkouts(
    $userID: ID
    $filter: ModelCurrentWorkoutFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCurrentWorkouts(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        data
        routineID
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
export const listEffortsByExerciseAndCountry = /* GraphQL */ `
  query ListEffortsByExerciseAndCountry(
    $countryID: ID
    $exerciseWeight: ModelEffortByCountryCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndCountry(
      countryID: $countryID
      exerciseWeight: $exerciseWeight
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
        countryID
        stateID
        cityID
        gymID
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
export const listEffortsByExerciseAndState = /* GraphQL */ `
  query ListEffortsByExerciseAndState(
    $stateID: ID
    $exerciseWeight: ModelEffortByStateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndState(
      stateID: $stateID
      exerciseWeight: $exerciseWeight
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
        countryID
        stateID
        cityID
        gymID
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
export const listEffortsByExerciseAndCity = /* GraphQL */ `
  query ListEffortsByExerciseAndCity(
    $cityID: ID
    $exerciseWeight: ModelEffortByCityCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndCity(
      cityID: $cityID
      exerciseWeight: $exerciseWeight
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
        countryID
        stateID
        cityID
        gymID
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
export const listEffortsByExerciseAndGym = /* GraphQL */ `
  query ListEffortsByExerciseAndGym(
    $gymID: ID
    $exerciseWeight: ModelEffortByGymCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndGym(
      gymID: $gymID
      exerciseWeight: $exerciseWeight
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
        countryID
        stateID
        cityID
        gymID
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
export const listEffortsByExerciseAndUser = /* GraphQL */ `
  query ListEffortsByExerciseAndUser(
    $userID: ID
    $exerciseWeight: ModelEffortByUserCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExerciseAndUser(
      userID: $userID
      exerciseWeight: $exerciseWeight
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
        countryID
        stateID
        cityID
        gymID
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
export const listEffortsByExercise = /* GraphQL */ `
  query ListEffortsByExercise(
    $exercise: String
    $weight: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEffortFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEffortsByExercise(
      exercise: $exercise
      weight: $weight
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
        countryID
        stateID
        cityID
        gymID
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
        createdAt
        updatedAt
      }
      nextToken
      total
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
            countryID
            stateID
            cityID
            gymID
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
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
          countryID
          stateID
          cityID
          gymID
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
            countryID
            stateID
            cityID
            gymID
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
            countryID
            stateID
            cityID
            gymID
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($followeeId: ID!, $followerId: ID!) {
    getFollowRelationship(followeeId: $followeeId, followerId: $followerId) {
      followeeId
      followerId
      createdAt
      updatedAt
    }
  }
`;
export const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $followeeId: ID
    $followerId: ModelIDKeyConditionInput
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFollowRelationships(
      followeeId: $followeeId
      followerId: $followerId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        followeeId
        followerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTimeline = /* GraphQL */ `
  query GetTimeline($userId: ID!, $createdAt: String!) {
    getTimeline(userId: $userId, createdAt: $createdAt) {
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
            countryID
            stateID
            cityID
            gymID
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
export const listTimelines = /* GraphQL */ `
  query ListTimelines(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelTimelineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTimelines(
      userId: $userId
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
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
          userImage {
            userID
            uri
            createdAt
            updatedAt
          }
          likes {
            nextToken
          }
          comments {
            nextToken
          }
          efforts {
            nextToken
          }
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
