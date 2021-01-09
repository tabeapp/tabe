export const BLANK_ROUTINE = () => ({
    title: 'New Routine',
    time: 7,
    info: {},
    workouts: {},
    days: [],
    customScheme: false,
    customSets: {},//this fucked me up
    currentDay: 0,//do we really need these last 2?
    nextWorkoutTime: 0
});
