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
