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
