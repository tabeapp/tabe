import { FAILURE, REST_DAY } from '../../Constants/Symbols';
import { ROUND_5 } from '../../Utils/UtilFunctions';

export const analyzeWorkoutRoutine = (workout, report, efforts, routine) => {
    if(!routine)
        return null;

    const newRoutine = JSON.parse(routine);

    console.log(newRoutine);
    console.log(workout);

    workout.exercises.forEach(ex => {
        if(ex.name.includes('-Warmup'))
            return;

        const exInfo = newRoutine.info[ex.name];

        if (!exInfo.progress || exInfo.progress.amount === 0)
            return;

        const passed = ex.sets.every(set =>
            set.reps === FAILURE || set.progress >= set.reps
        );

        if (passed) {
            exInfo.progress.countdown--;
            if (exInfo.progress.countdown === 0) {
                exInfo.progress.countdown = exInfo.progress.rate;
                exInfo.current += exInfo.progress.amount;
            }
        }
    });

    report.exercises.forEach(ex => {
        const setInfo = newRoutine.info[ex.name].setInfo;
        if(setInfo.type !== 'Custom')
            return;

        setInfo.selector = (setInfo.selector+1)%newRoutine.customSets[setInfo.scheme].length;
    });

    Object.entries(efforts).forEach(([k,v]) => {
        if(k.includes('-Warmup'))
            return;

        const exInfo = newRoutine.info[k];
        if(exInfo.setInfo.type !== 'Custom')
            return;

        if(v > exInfo.current)
            exInfo.current = ROUND_5(v);//lol
    });

    workout.exercises.forEach(ex => {
        if(ex.name.includes('-Warmup'))
            return;

        const failure = ex.sets.some(set => {
            if(set.reps === FAILURE)
                return false;

            if (set.minReps)
                return set.progress < set.minReps;
            else
                return set.progress < set.reps;
        });

        if (failure) {

            const exInfo = newRoutine.info[ex.name];
            if (!exInfo.strikes)
                exInfo.strikes = 0;
            exInfo.strikes++;

            if (newRoutine.failure && exInfo.strikes >= newRoutine.failure.strikesToDeload) {
                exInfo.strikes = 0;
                exInfo.current *= newRoutine.failure.deload;
            }
        }

    });

    let nextWorkoutTime = new Date();
    let daysToNext = 1;
    while(newRoutine.days[(newRoutine.currentDay+daysToNext)%newRoutine.time] === REST_DAY && daysToNext < 14)
        daysToNext++;

    nextWorkoutTime.setDate(nextWorkoutTime.getDate() + daysToNext);
    nextWorkoutTime.setHours(0);
    nextWorkoutTime.setMinutes(0);
    nextWorkoutTime.setSeconds(0);
    console.log('next workout: ' + nextWorkoutTime);
    newRoutine.nextWorkoutTime = nextWorkoutTime.getTime();

    newRoutine.currentDay++;

    return newRoutine;
}
