//ideally stored on server, this is an example of "current routine", not default
export const MetallicaPPL = {
    title: 'MetallicaPPL',
    time: 7,
    next: '?',
    currentDay: 0,
    days: [
        {
            //day 0
            deadlift: [5],
            latPull: [12, 12, 12],
            cableRow: [12, 12, 12],
            facePull: [20, 20, 20, 20, 20],
            hammerCurl: [12, 12, 12, 12],
            dbCurl: [12, 12, 12, 12],
        },
        {
            squat: [5,5,5],
        },
    ],
    weight: {
        deadlift: {
            current: 305, progress: 10, amrap: true, primary: true
        },
        latPull: {
            current: 80, progress: 2.5
        },
        cableRow: {
            current: 120, progress: 5
        },
        facePull: {
            current: 50
        },
        hammerCurl: {
            current: 20
        },
        dbCurl: {
            current: 15
        },
        squats: {
            current: 225, progress: 5, amrap: true, primary: true
        },
    }
};

export const SampleProgress = {
    deadlift: [6],
    latPull: [12,12,12],
    cableRow: [12,],
    //gonna def need to update this
    currentSet: ['cableRow', 1, .3],
};
