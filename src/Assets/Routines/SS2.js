export const SS2 = {
    title: 'Starting Strength',
    time: 14,
    next: '?',
    currentDay: 2,
    workouts: {
        A: [
            'squat',
            'bench',
            'deadlift'
        ],
        B: [
            'squat',
            'bench',
            'powerClean'
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
                rate: 'session',
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
                rate: 'session',
            },
            setInfo: {
                type:'normal',
                sets: [5]
            }
        },
        press: {
            current: 155,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 'session',
            },
            setInfo: {
                type:'normal',
                sets: [5,5,5]
            }
        },
        powerClean: {
            current: 155,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 'session',
            },
            setInfo: {
                type:'normal',
                sets: [3,3,3,3,3]
            }
        }
    }
}
