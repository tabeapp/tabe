const { NUMBER_TO_THOU_STRING } = require('../Utils/UtilFunctions');
const { REPS_TO_REPS } = require('../Utils/UtilFunctions');

exports.analyzeWorkoutEfforts = report => {
    const workoutMaxes = {};

    console.log(report);

    report.forEach(ex => {
        const name = ex.name.split('-')[0];

        let orm = -1;

        ex.work.forEach(info => {
            const calculatedOrm = REPS_TO_REPS(info.weight, info.reps, 1);

            if(calculatedOrm > orm){
                const formattedOrm = NUMBER_TO_THOU_STRING(orm);
                workoutMaxes[name] = {
                    weight: info.weight,
                    reps: info.reps,
                    orm: formattedOrm,
                };
            }
        });
    });

    return workoutMaxes;
}
