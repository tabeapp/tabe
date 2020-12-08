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
        },
        {
            squat: [5,5,5],
        },
    ],
    weight: {
        deadlift: {
            current: 305, progress: 10, amrap: true
        },
        squats: {
            current: 225, progress: 5, amrap: true
        },
    }


};
