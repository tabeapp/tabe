//so this will add default info like
/*
{
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
}
*/
//for every possible workout

const WEIGHTS = {
    //these are 5rm from symmetric strength for 198lb male
    'Squat': 125,
    'Front Squats': 100,
    'Deadlift': 140,
    'Bench': 90,
    'Incline Bench': 75,
    'Dip': -20,
    'Press': 60,
    'Row': 75,

    //these are entirely made up
    'Tricep Pushdown': 30,
    'Overhead Tricep Extension': 30,
    'BB Curl': 45,
    'Incline Curl': 15,
    'Skull Crushers': 45,
    'Wrist Curls': 10,
    'Concentration Curl': 25,
    'DB Curl': 20,
    'Hammer Curl': 20,
    'DB Press': 40,
    'Clean and Press': 115,
    'Full Frontal Raise': 10,
    'Lateral Raise': 10,
    'Upright Row': 60,
    'Arnold Press': 35,
    'Behind the Neck Press': 60,
    'Rear Delt Flyes': 25,
    'DB Flyes': 25,
    'Romanian Deadlift': 95,
    'Good Morning': 95,
    'Lunges': 45,
    'Leg Press': 135,
    'Leg Extension': 65,
    'Leg Curl': 65,
    'Calf Raise': 95,
    'DB Row': 35,
    'Lat Pulldown': 70,
    'Cable Row': 70,
    'Chin Up': 0,
    'Pull up': 0,
    'Leg Raises': 0,
    'Sit Ups': 0,
    'Cable Crunch': 70
};

const BARBELL = [
    'Press',
    'BB Curl',
    'Skull Crushers',
    'Clean and Press',
    'Behind the Neck Press',
    'Bench',
    'Squat',
    'Romanian Deadlift',
    'Good Morning',
    'Front Squats',
    'Calf Raise',
    'Deadlift',
    'Row',
];

export const DEFAULT_EX_INFO = ex => ({
    current: WEIGHTS[ex],
    barbell: BARBELL.includes(ex),
    amrap: false,
    //bit aggressive, but whatever, you can change it
    progress:{
        amount: 5,
        rate: 1
    },
    setInfo: {
        type: 'Normal',
        sets: [5,5,5,5,5]
    },
});

//how the fuck, idk?
//should we add a superset: true property?
//I guess that would help rendering
//ugh i guess we need to make as many current as there are exercises
export const DEFAULT_SUPERSET_INFO = (name) => {
    return name.map(n => DEFAULT_EX_INFO(n));

};
//would probably be something more like

//might even need to have it's own component
/*
export const DEFAULT_SUPERSET_INFO = () => ({
    current: [0,0],
    progress:{
        amount: [5,5],
        rate: 1,
    },
    setInfo: {
        type: 'Normal',
        sets: [[5,5,5,5,5],[5,5,5,5,5]]
    }
});
*/

