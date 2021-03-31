const { EX_INFO } = require('../Constants/DefaultExInfo');
const { ROUND_5 } = require('./UtilFunctions');

//does this even matter?
//not too sure what to do, so roughly copying starting strengtsh
export const WARMUP_WEIGHTS = (ex, workoutWeight) => {
    const bb = EX_INFO[ex].barbell;
    const min = bb ? 45 : 0;

    const sets = [];
    //only exception 2x5, 1x3, 1x2...
    if(ex === 'Deadlift'){
        sets.push({reps: 5, progress: null, weight: ROUND_5(Math.max(min, workoutWeight*0.4))});
    }
    //usually 2x5, 1x5, 1x3, 1x2
    else {
        sets.push({reps: 5, progress: null, weight: min});
        sets.push({reps: 5, progress: null, weight: min});
    }
    //common to all
    sets.push({reps: 5, progress: null, weight: ROUND_5(Math.max(min, workoutWeight*0.4))});
    sets.push({reps: 3, progress: null, weight: ROUND_5(Math.max(min, workoutWeight*0.6))});
    sets.push({reps: 2, progress: null, weight: ROUND_5(Math.max(min, workoutWeight*0.8))});

    return sets;
};
