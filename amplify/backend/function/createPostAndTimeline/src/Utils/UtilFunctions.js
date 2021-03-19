
export const ROUND_5 = num => {
    return Math.round(num/5)*5;
};

//this could save some weird math elsewehere
export const REPS_TO_REPS = (weight, fromReps, toReps) => {
    if(fromReps === toReps)
        return weight;
    else{
        fromReps = Math.min(fromReps, 10);
        toReps = Math.min(toReps, 10);
        let orm = weight*(1+fromReps/30)/(1+toReps/30);
        return ROUND_5(orm);
    }
};

