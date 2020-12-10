export const SS = {
    title: 'Starting Strength',
    time: 14,
    next: '?',
    currentDay: 0,
    workouts: {
        A: [
            {name: 'squat', sets: [5, 5, 5]},
            {name: 'press', sets: [5, 5, 5]},
            {name: 'deadlift', sets: [5]},
        ],
        B: [
            {name: 'squat', sets: [5, 5, 5]},
            {name: 'bench', sets: [5, 5, 5]},
            {name: 'deadlift', sets: [5]},
        ],
    },
    days: [
        'A', null, 'B', null, 'A', null, null,
        'B', null, 'A', null, 'B', null, null,
    ],
    weight: {
        squat: {
            current: 235, progress: 5, amrap: true, primary: true
        },
        bench: {
            current: 190, progress: 5, amrap: true, primary: true
        },
        press: {
            current: 150, progress: 5, amrap: true, primary: true
        },
        deadlift: {
            current: 305, progress: 5, amrap: true, primary: true
        },
    }
}
