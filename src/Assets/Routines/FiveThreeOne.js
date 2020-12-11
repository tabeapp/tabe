//using smaple workout from their page
//the real trick is in the progression
export const FiveThreeOne = {
    title: '5/3/1',
    time: 7,
    currentDay: 3,
    workouts: {
        A:[
            'press', 'dip', 'chinup',
        ],
        B:[
            'deadlift', 'goodMorning', 'hangingLegRaise'
        ],
        C:[
            'bench', 'dbPress', 'dbRow'
        ],
        D:[
            'squat', 'legPress', 'legCurl'
        ],
    },
    days: [
        'A', 'B', null, 'C', 'D', null, null,
    ],
    info:{
        press: {
            current: 150,
            amrap: true,
            barbell: true,
            setInfo:{
                type: 'custom',
                name: '5/3/1',
                selector: 0 //this is the week number-1
            },
            progress: {
                amount: 5,
                rate: 28
            }
        },
        dip: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [15,15,15,15,15]
            }
        },
        chinup: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [10,10,10,10,10]
            }
        },
        deadlift:{
            current: 315,
            amrap: true,
            barbell: true,
            setInfo:{
                type: 'custom',
                name: '5/3/1',
                selector: 0 //this is the week number-1
            },
            progress: {
                amount: 5,
                rate: 28
            }
        },
        goodMorning: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [12,12,12,12,12]
            }
        },
        hangingLegRaise: {
            current: 10,
            setInfo: {
                type: 'normal',
                sets: [10, 10, 10, 10, 10]
            }
        },
        bench: {
            current: 195,
            amrap: true,
            barbell: true,
            setInfo:{
                type: 'custom',
                name: '5/3/1',
                selector: 0 //this is the week number-1
            },
            progress: {
                amount: 5,
                rate: 28
            }
        },
        dbPress: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [15,15,15,15,15]
            }
        },
        dbRow: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [10,10,10,10,10]
            }
        },
        squat: {
            current: 235,
            amrap: true,
            barbell: true,
            setInfo:{
                type: 'custom',
                name: '5/3/1',
                selector: 0 //this is the week number-1
            },
            progress: {
                amount: 5,
                rate: 28
            }
        },
        legPress: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [15,15,15,15,15]
            }
        },
        legCurl: {
            current: 10,
            setInfo: {
                type:'normal',
                sets: [10,10,10,10,10]
            }
        },
    },
    customSet:{
        '5/3/1': [
            [
                {reps: 5, '%': .65},
                {reps: 5, '%': .75},
                {reps: 5, '%': .85},
            ],
            [
                {reps: 3, '%': .70},
                {reps: 3, '%': .80},
                {reps: 3, '%': .90},
            ],
            [
                {reps: 5, '%': .75},
                {reps: 3, '%': .85},
                {reps: 1, '%': .95},
            ],
            [
                {reps: 5, '%': .40},
                {reps: 5, '%': .50},
                {reps: 5, '%': .60},
            ]
        ]
    }
}
