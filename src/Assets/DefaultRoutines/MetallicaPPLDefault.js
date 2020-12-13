//ideally stored on server, this is an example of "current routine", not default
export const MetallicaPPLDefault = {
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
            //needs a failure object with strikes and deload amt
            def1RM: 100,
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
            def1RM: 80,
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
            def1RM: 70,
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
            def1RM: 60,
            setInfo: {
                type: 'normal',
                sets: [20,20,20,20,20]
            }
        },
        hammerCurl: {
            def1RM: 50,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12]
            }
        },
        dbCurl: {
            def1RM: 40,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12]
            }
        },
        bench: {
            def1RM: 205,
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
            def1RM: 110,
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
            def1RM: 35,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        pushdown: {
            def1RM: 30,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        overheadExt: {
            def1RM: 40,
            setInfo: {
                type: 'normal',
                sets: [12,12,12]
            }
        },
        latRaise: {
            def1RM: 10,
            setInfo: {
                type: 'normal',
                sets: [20,20,20]
            }
        },
        squat: {
            def1RM: 235,
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
            def1RM: 130,
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
            def1RM: 190,
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
            def1RM: 125,
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
            def1RM: 100,
            setInfo: {
                type: 'normal',
                sets: [12,12,12,12,12]
            }
        },
        row: {
            def1RM: 140,
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
            def1RM: 155,
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
            def1RM: 130,
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

