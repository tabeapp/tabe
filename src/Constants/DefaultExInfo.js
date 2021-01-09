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

//i feel like we should have more info on these guys
//and the modal should read from here
//something like
//'Squat': {'weight': 125, 'barbell': true', 'category': 'legs'}
//the ultimate database

const CATEGORIES = [
    'Arms',
    'Shoulders',
    'Chest',
    'Legs',
    'Back',
    'Bodyweight',
    'Core',
];




const EX_INFO = {

    //these are 5rm from symmetric strength for 198lb male
    'Squat': {weight:125, barbell: true, categories: ['Legs']},
    'Front Squats': {weight:100, barbell: true, categories: ['Legs']},
    'Deadlift': {weight:140, barbell: true, categories: ['Legs']},
    'Bench': {weight:90, barbell: true, categories: ['Legs']},
    'Incline Bench': {weight:75, barbell: true, categories: ['Legs']},
    'Dip': {weight:-20, barbell: false, categories: ['Legs']},
    'Press': {weight:60, barbell: true, categories: ['Legs']},
    'Row': {weight:75, barbell: true, categories: ['Legs']},
    'Power Clean': {weight:80, barbell: true, categories: ['Legs']},

    //these are entirely made up
    'Tricep Pushdown': {weight:30, barbell: false, categories: ['Legs']},
    'Overhead Tricep Extension': {weight:30, barbell: false, categories: ['Legs']},
    'BB Curl': {weight:45, barbell: true, categories: ['Legs']},
    'Incline Curl': {weight:15, barbell: false, categories: ['Legs']},
    'Skull Crushers': {weight:45, barbell: true, categories: ['Legs']},
    'Wrist Curls': {weight:10, barbell: false, categories: ['Legs']},
    'Concentration Curl': {weight:25, barbell: false, categories: ['Legs']},
    'DB Curl': {weight:20, barbell: false, categories: ['Legs']},
    'Hammer Curl': {weight:20, barbell: false, categories: ['Legs']},
    'DB Press': {weight:40, barbell: false, categories: ['Legs']},
    'Clean and Press': {weight:115, barbell: true, categories: ['Legs']},
    'Full Frontal Raise': {weight:10, barbell: false, categories: ['Legs']},
    'Lateral Raise': {weight:10, barbell: false, categories: ['Legs']},
    'Upright Row': {weight:60, barbell: false, categories: ['Legs']},
    'Arnold Press': {weight:35, barbell: false, categories: ['Legs']},
    'Behind the Neck Press': {weight:60, barbell: true, categories: ['Legs']},
    'Rear Delt Flyes': {weight:25, barbell: false, categories: ['Legs']},
    'DB Flyes': {weight:25, barbell: false, categories: ['Legs']},
    'Romanian Deadlift': {weight:95, barbell: true, categories: ['Legs']},
    'Good Morning': {weight:95, barbell: true, categories: ['Legs']},
    'Lunges': {weight:45, barbell: false, categories: ['Legs']},
    'Leg Press': {weight:135, barbell: false, categories: ['Legs']},
    'Leg Extension': {weight:65, barbell: false, categories: ['Legs']},
    'Leg Curl': {weight:65, barbell: false, categories: ['Legs']},
    'Calf Raise': {weight:95, barbell: true, categories: ['Legs']},
    'DB Row': {weight:35, barbell: false, categories: ['Legs']},
    'Lat Pulldown': {weight:70, barbell: false, categories: ['Legs']},
    'Cable Row': {weight:70, barbell: false, categories: ['Legs']},
    'Chin Up': {weight:0, barbell: false, categories: ['Legs']},
    'Pull up': {weight:0, barbell: false, categories: ['Legs']},
    'Leg Raises': {weight:0, barbell: false, categories: ['Legs']},
    'Sit Ups': {weight:0, barbell: false, categories: ['Legs']},
    'Cable Crunch': {weight:70, barbell: false, categories: ['Legs']},
    'Back Ext': {weight:0, barbell: false, categories: ['Legs']},
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
    'Power Clean'
];

export const DEFAULT_EX_INFO = ex => {
    //TODO you know, it would be a  good idea to test if it's a superset here
    //just in case someting like squat-b gets through
    ex = ex.split('-')[0];

    const info = EX_INFO[ex];

    return {
        current: info.weight,
        barbell: info.barbell,
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
    }
}

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

