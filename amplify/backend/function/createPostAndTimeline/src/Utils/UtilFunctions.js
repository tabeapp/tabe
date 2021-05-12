const ROUND_5 = num => {
    return Math.round(num/5)*5;
};

exports.ROUND_5 = ROUND_5;

//this could save some weird math elsewehere
exports.REPS_TO_REPS = (weight, fromReps, toReps) => {
    if(fromReps === toReps)
        return weight;
    else{
        fromReps = Math.min(fromReps, 10);
        toReps = Math.min(toReps, 10);
        let orm = weight*(1+fromReps/30)/(1+toReps/30);
        return ROUND_5(orm);
    }
};

exports.NUMBER_TO_THOU_STRING = weight => ('0000' + weight).slice(-4);

