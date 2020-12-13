export const SSDefault = {
    title: 'Starting Strength',
    time: 14,
    next: '?',
    //currentDay: 0,
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
            def1RM: 145,
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
            def1RM: 105,
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
            def1RM: 165,
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
            def1RM: 70,
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
    }
}
