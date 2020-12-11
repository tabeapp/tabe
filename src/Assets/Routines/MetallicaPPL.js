//ideally stored on server, this is an example of "current routine", not default
export const MetallicaPPL = {
    title: 'MetallicaPPL',
    time: 7,
    next: '?',
    currentDay: 5,
    //would be like A B C D E C null
    workouts: {
        //easier to iterate through array than object keys
        Pull1: [
            'deadlift',
            'latPull',
            'cableRow',
            'facePull',
            'hammerCurl',
            'dbCurl',
        ],
        Push1: [
            'bench',
            'press.ez',
            'dbPress',
            'pushdown',
            'overheadExt',
            'latRaise'
        ],
        Legs: [
            'squat',
            'rdl',
            'legPress',
            'legCurl',
            'calfRaise'
        ],
        Pull2: [
            'row',
            'latPull',
            'cableRow',
            'facePull',
            'hammerCurl',
            'dbCurl',
        ],
        Push2: [
            'press',
            'bench.ez',
            'dbPress',
            'pushdown',
            'overheadExt',
            'latRaise'
        ]
    },
    days: [
        'Pull1', 'Push1', 'Legs', 'Pull2', 'Push2', 'Legs', null
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
                sets: [20,20,20,20,20]
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
        squat: {
            current: 235,
            amrap: true,
            barbell: true,
            progress: {
                amount: 5,
                rate: 'session'
            },
            setInfo: {
                type: 'normal',
                sets: [5,5,5]
            }
        },
        rdl: {
            current: 130,
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
        legPress: {
            current: 190,
            progress: {
                amount: 5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        legCurl: {
            current: 125,
            progress: {
                amount: 5,
                rate: 7
            },
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        calfRaise: {
            current: 100,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12,12]
            }
        },
        row: {
            current: 140,
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
        press: {
            current: 155,
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
        'bench.ez': {
            current: 130,
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
        }
    }
};

export const SampleProgress = {
    deadlift: [5, 5, 6],
    latPull: [12,12,12],
    cableRow: [12,],
    //gonna def need to update this
    //currentSet: ['cableRow', 1, .6],
};
