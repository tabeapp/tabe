export const BLANK_ROUTINE = () => ({
    title: 'New Routine',
    time: 7,
    info: {},
    workouts: {},
    days: [],
    //defintely gonna have to redo the part in progressprovider that handles this tho
    failure: { after: 3, deloadPercent: 10 },//this is a good, right?
    customScheme: false,
    customSets: {},//this fucked me up
    currentDay: 0,//do we really need these last 2?
    nextWorkoutTime: 0
});
