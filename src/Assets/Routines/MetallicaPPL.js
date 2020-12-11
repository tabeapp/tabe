//ideally stored on server, this is an example of "current routine", not default
export const MetallicaPPL = {
    title: 'MetallicaPPL',
    time: 7,
    next: '?',
    currentDay: 1,
    //would be like A B C D E C null
    workouts: {
        //easier to iterate through array than object keys
        A: [
            'deadlift',
            'latPull',
            'cableRow',
            'facePull',
            'hammerCurl',
            'dbCurl',
        ],
        B: [
            'bench',
            'press.ez',
            'dbPress',
            'pushdown',
            'overheadExt',
            'latRaise'

        ],
        D: [
            'row',
            'latPull',
            'cableRow',
            'facePull',
            'hammerCurl',
            'dbCurl',
        ]
    },
    days: [
        'A', 'B', 'C', 'D', 'E', 'C', null
    ],
    info: {
        deadlift: {
            current: 305,
            amrap: true,
            barbell: true,
            progress: {
                amount: 10,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [5]
            }
        },
        latPull: {
            current: 80,
            progress: {
                amount: 2.5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        cableRow: {
            current: 120,
            progress: {
                amount: 5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        facePull: {
            current: 50,
            setInfo: {
                type: 'normal',
                sets: [20,20,20,20]
            }
        },
        hammerCurl: {
            current: 20,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12]
            }
        },
        dbCurl: {
            current: 15,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12]
            }
        },
        bench: {
            current: 190,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [5,5,5,5,5]
            }
        },
        'press.ez': {
            current: 110,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        dbPress: {
            current: 35,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        pushdown: {
            current: 30,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        overheadExt: {
            current: 40,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        latRaise: {
            current: 10,
            setInfo: {
                type: 'normal',
                sets: [20,20,20]
            }
        },
        squats: {
            current: 225, progress: 5, amrap: true, primary: true
        },
    }
};

export const SampleProgress = {
    deadlift: [5, 5, 6],
    latPull: [12,12,12],
    cableRow: [12,],
    //gonna def need to update this
    //currentSet: ['cableRow', 1, .6],
};
