export const BLANK_ROUTINE = () => ({
    title: 'New Routine',
    time: 7,
    info: {},
    workouts: {},
    days: [],
    failure: { after: 3, deload: .9 },//this is a good, right?
    customScheme: false,
    customSets: {},//this fucked me up
    currentDay: 0,//do we really need these last 2?
    nextWorkoutTime: 0
});
