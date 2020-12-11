//using smaple workout from their page
//the real trick is in the progression
export const FiveThreeOne = {
    title: '5/3/1',
    time: 7,
    currentDay: 0,
    workouts: {
        A:[
            'press', 'dip', 'chinup',
        ],
        B:[],
        C:[],
        D:[],
    },
    days: [
        'A', 'B', null, 'C', 'D', null, null,
    ],
    info:{
        press: {
            //i just don't know how to best put this
            //a week number tracker is ideal
            current: 150,
            amrap: true,
            barbell: true,
            //either setInfo is an object
            setInfo:{
                //best var title?
                type: 'custom',
                name: '5/3/1',
                selector: 2 //this is the week number-1
            },
            //progress 5lb after every 4 weeks
            progress: {
                amount: 5,
                rate: 28
            }
        },
        dip: {
            current: 10,
            //or set info is an array
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
