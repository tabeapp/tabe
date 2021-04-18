//so this will add default info like
export const CATEGORIES = [
    'Arms',
    'Shoulders',
    'Chest',
    'Legs',
    'Back',
    'Bodyweight',
    'Core',
];

export const EX_INFO = {
    //these are 5rm from symmetric strength for 198lb male
    'Squat': {weight:125, barbell: true, categories: ['Legs']},
    'Bench': {weight:90, barbell: true, categories: ['Chest', 'Arms']},
    'Deadlift': {weight:140, barbell: true, categories: ['Legs', 'Back']},
    'Press': {weight:60, barbell: true, categories: ['Shoulders', 'Arms']},
    'Power Clean': {weight:80, barbell: true, categories: ['Back', 'Legs']},
    'Row': {weight:85, barbell: true, categories: ['Back', 'Arms']},

    'Sumo Deadlift': {weight:140, barbell: true, categories: ['Legs', 'Back']},
    'Incline Bench': {weight:75, barbell: true, categories: ['Chest', 'Arms']},
    'Dip': {weight:0, barbell: false, categories: ['Arms', 'Bodyweight']},
    'Push Press': {weight:80, barbell: true, categories: ['Shoulders', 'Arms']},
    'Snatch Press': {weight:50, barbell: true, categories: ['Shoulders', 'Arms']},

    'Front Squats': {weight:100, barbell: true, categories: ['Legs']},
    'Chin Up': {weight:0, barbell: false, categories: ['Arms', 'Bodyweight']},
    'Pull up': {weight:0, barbell: false, categories: ['Arms', 'Bodyweight']},
    'Push up': {weight:0, barbell: false, categories: ['Arms', 'Bodyweight']},

    //these are entirely made up
    'Tricep Pushdown': {weight:30, barbell: false, categories: ['Arms']},
    'Overhead Extension': {weight:30, barbell: false, categories: ['Arms']},
    'Cable Kickback': {weight:30, barbell: false, categories: ['Arms']},
    'BB Curl': {weight:45, barbell: true, categories: ['Arms']},
    'Incline Curl': {weight:15, barbell: false, categories: ['Arms']},
    'Skull Crushers': {weight:45, barbell: true, categories: ['Arms']},
    'DB Skull Crushers': {weight:20, barbell: false, categories: ['Arms']},
    'Wrist Curls': {weight:10, barbell: false, categories: ['Arms']},
    'Concentration Curl': {weight:25, barbell: false, categories: ['Arms']},
    'Preacher Curl': {weight:40, barbell: false, categories: ['Arms']},
    'DB Curl': {weight:20, barbell: false, categories: ['Arms']},
    'CB Curl': {weight:20, barbell: false, categories: ['Arms']},
    'DB Row': {weight:35, barbell: false, categories: ['Arms']},
    'Hammer Curl': {weight:20, barbell: false, categories: ['Arms']},

    'DB Fly': {weight:25, barbell: false, categories: ['Chest']},
    'Cable Fly': {weight:25, barbell: false, categories: ['Chest']},
    'DB Press': {weight:40, barbell: false, categories: ['Chest']},
    'Incline DB Press': {weight:30, barbell: false, categories: ['Chest']},

    'DB Shoulder Press': {weight:25, barbell: false, categories: ['Shoulders']},
    'Full Frontal Raise': {weight:10, barbell: false, categories: ['Shoulders']},
    'Lateral Raise': {weight:10, barbell: false, categories: ['Shoulders']},
    'Upright Row': {weight:60, barbell: false, categories: ['Shoulders']},
    'Arnold Press': {weight:35, barbell: false, categories: ['Shoulders']},
    'Behind the Neck Press': {weight:60, barbell: true, categories: ['Shoulders']},
    'Clean and Press': {weight:115, barbell: true, categories: ['Back', 'Shoulders']},

    'Horizontal Row': {weight:0, barbell: false, categories: ['Back']},
    'Cable Row': {weight:70, barbell: false, categories: ['Back']},
    'Rear Delt Flyes': {weight:25, barbell: false, categories: ['Back']},
    'Lat Pulldown': {weight:70, barbell: false, categories: ['Back']},
    'Back Ext': {weight:0, barbell: false, categories: ['Back']},

    'Hack Squat': {weight:125, barbell: true, categories: ['Legs']},
    'Calf Raise': {weight:95, barbell: true, categories: ['Legs']},
    'Seated Calf Raise': {weight:95, barbell: false, categories: ['Legs']},
    'Romanian Deadlift': {weight:95, barbell: true, categories: ['Back', 'Legs']},
    'Glute Bridge': {weight:0, barbell: false, categories: ['Legs']},
    'Hip Thrust': {weight:45, barbell: true, categories: ['Legs']},
    'Good Morning': {weight:95, barbell: true, categories: ['Legs']},
    'Lunges': {weight:45, barbell: false, categories: ['Legs']},
    'Leg Press': {weight:135, barbell: false, categories: ['Legs']},
    'Leg Curl': {weight:65, barbell: false, categories: ['Legs']},
    'Lying Leg Curl': {weight:45, barbell: false, categories: ['Legs']},
    'Leg Extension': {weight:65, barbell: false, categories: ['Legs']},

    'Hanging Leg Raise': {weight:0, barbell: false, categories: ['Core']},
    'Sit Ups': {weight:0, barbell: false, categories: ['Core']},
    'Cable Crunch': {weight:70, barbell: false, categories: ['Core']},

};

const FIVE_BY_FIVE = [5, 5, 5, 5, 5];

//for adding on the fly, not to a routine or anything
export const DEFAULT_EX_WORKOUT = ex => {
    const info = EX_INFO[ex];

    return {
        name: ex,
        barbell: info.barbell,
        rest: info.barbell ? 180 : 60,
        sets: FIVE_BY_FIVE.map(s => ({
            reps: s,
            progress: null,
            weight: info.weight,
        })),
    };
};

export const DEFAULT_EX_INFO = ex => {
    if (ex.includes('/'))
    {return DEFAULT_SUPERSET_INFO(ex.split('/'));}
    //just in case someting like squat-b gets through
    ex = ex.split('-')[0];

    const info = EX_INFO[ex];

    return {
        current: info.weight,
        warmup: false,
        barbell: info.barbell,
        amrap: false,
        //bit aggressive, but whatever, you can change it
        progress:{
            amount: 0,
            rate: 1,
        },
        rest: info.barbell ? 180 : 60,
        setInfo: {
            type: 'Normal',
            sets: [5,5,5,5,5],
        },
    };
};

//how the fuck, idk?
//should we add a superset: true property?
//I guess that would help rendering
//ugh i guess we need to make as many current as there are exercises
export const DEFAULT_SUPERSET_INFO = (name) => {
    return name.map(DEFAULT_EX_INFO);

};
//would probably be something more like

