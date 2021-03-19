import { REPS_TO_REPS } from '../../Utils/UtilFunctions';

export const analyzeWorkoutEfforts = report => {
    const workoutMaxes = {};

    console.log(report);

    if(report.exercises){
        report.exercises.forEach(ex => {
            const name = ex.name.split('-')[0];

            let orm = -1;

            ex.work.forEach(info => {
                const calculatedOrm = REPS_TO_REPS(info.weight, info.reps, 1);

                if(calculatedOrm > orm)
                    workoutMaxes[name] = {
                        weight: info.weight,
                        reps: info.reps,
                        orm: calculatedOrm,
                    };
            });
        });
    }

    return workoutMaxes;
}
