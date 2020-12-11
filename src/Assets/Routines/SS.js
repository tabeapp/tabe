export const SS = {
    title: 'Starting Strength',
    time: 14,
    next: '?',
    currentDay: 0,
    workouts: {
        A: [
            'squat',
            'bench',
            'deadlift'
        ],
        B: [
            'squat',
            'bench',
            'deadlift'
        ],
    },
    days: [
        'A', null, 'B', null, 'A', null, null,
        'B', null, 'A', null, 'B', null, null,
    ],
    info: {
        squat: {
            current: 235,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 'session',
            },
            setInfo: {
                type: 'normal',
                sets: [5,5,5]
            }
        },
        bench: {
            current: 190,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 7,
            },
            setInfo: {
                type:'normal',
                sets: [5,5,5]
            }
        },
        deadlift: {
            current: 305,
            amrap: true,
            barbell: true,
            progress: {
                amount: 10,
                rate: 7,
            },
            setInfo: {
                type:'normal',
                sets: [5,5,5]
            }
        }
    }
}
