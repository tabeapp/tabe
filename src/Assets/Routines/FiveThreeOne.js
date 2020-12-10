//using smaple workout from their page
//the real trick is in the progression
export const FiveThreeOne = {
    title: '5/3/1',
    time: 7,
    currentDay: 0,
    workouts: {
        A:[
            {name: 'press', sets: [/*idk how to do this, come back?*/]},
            {name: 'dip', sets: [15, 15, 15, 15, 15]}
        ],
        B:[],
        C:[],
        D:[],
    },
    days: [
        'A', 'B', null, 'C', 'D', null, null,
    ],
    weights:{
        press: { //i just don't know how to best put this
            //a week number tracker is ideal
            current: 150, progress: 5, progressType: {type: '5/3/1', curWeek: 0}, amrap: true, primary: true
        },
        dip: {
            current: 10, progress: 0
        },
    },
    progressions:{
        '5/3/1': [
            [[5, .65], [5, .75], [5, .85]],
            [[3, .70], [3, .80], [3, .90]],
            [[5, .75], [3, .85], [1, .95]],
            [[5, .40], [5, .50], [5, .60]],
        ]
    }


}
