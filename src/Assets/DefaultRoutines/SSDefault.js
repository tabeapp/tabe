export const SSDefault = {
    title: 'Starting Strength',
    time: 14,
    next: '?',
    //currentDay: 0,
    workouts: {
        A: [
            'squat',
            'press',
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
            //maybe change this to current, for consitency
            current: 145,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 1
            },
            setInfo: {
                type: 'normal',
                sets: [5,5,5]
            }
        },
        bench: {
            current: 105,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 1
            },
            setInfo: {
                type:'normal',
                sets: [5,5,5]
            }
        },
        deadlift: {
            current: 165,
            amrap: true,
            barbell: true,
            progress: {
                amount: 10,
                rate: 1
            },
            setInfo: {
                type:'normal',
                sets: [5]
            }
        },
        press: {
            current: 70,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 1
            },
            setInfo: {
                type:'normal',
                sets: [5,5,5]
            }
        },
    }
}
