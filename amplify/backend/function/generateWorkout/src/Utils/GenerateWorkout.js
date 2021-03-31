const { CURRENT, NEW_PR, REST_DAY } = require('../Constants/Symbols');
const { ROUND_5 } = require('./UtilFunctions');
const { WARMUP_WEIGHTS } = require('./WarmupCalc');

//we're not checking some other workout here,
//just taking a routine, generating a workout from it, and updating the routine
export const generateWorkout = async routine => {
    //comment this out to clear workout
    const r = routine;

    console.log(r)
    let day = r.days[r.currentDay % r.time];

    while(day === REST_DAY){
        r.currentDay++;
        day = r.days[r.currentDay%r.time];
    }

    const exercises = r.workouts[day];

    //just be careful about copying objects
    const compiledExercises = [];
    exercises.forEach(name => {
        //wait til you hear about supersets
        if(name.includes('/'))
            return null;

        const exInfo = r.info[name];
        const setInfo = exInfo.setInfo;


        let sets = [];
        if(setInfo.type === 'Normal'){
            sets = setInfo.sets.map(reps => ({
                reps: reps,
                progress: null,
                weight: exInfo.current
            }));
        }
        else if(setInfo.type === 'Custom'){
            //very complex, but it works
            //selector is missing, I wonder why though
            const custom = r.customSets[setInfo.scheme][setInfo.selector]

            sets = custom.map(set => {
                let w;
                if(set['%'] === NEW_PR)
                    //is this really the best place to store it?
                    //no
                    w = exInfo.current + 5;
                else
                    w = ROUND_5(set['%'] / 100 * exInfo.current);

                return {
                    reps: set.reps,
                    progress : null,
                    weight : w
                };
            });

        }
        else if(setInfo.type === 'Sum'){
            //TODO
        }
        else if(setInfo.type === 'Timed'){
            //TODO
        }

        if(exInfo.amrap)
            sets[sets.length-1].amrap = true;

        //add a warmup as a separate exercise
        if(exInfo.warmup){
            //entirely based on first set weight
            let warmupSets = WARMUP_WEIGHTS(name, sets[0].weight);

            compiledExercises.push({
                name: name + '-Warmup',
                barbell: exInfo.barbell,
                sets: warmupSets,
                rest: 0//too much?
            });
        }

        compiledExercises.push({
            name: name,
            barbell: exInfo.barbell,
            sets: sets,
            rest: exInfo.rest
        });

        //return;

    });
    compiledExercises[0].sets[0].progress = CURRENT;

    //this looks fine

    const workout = {
        title: r.title + ' ' + day,
        exercises: compiledExercises,
        edit: false,
        //very necessary for knowing which routine to progress
        //are these even necessary
        timer: 0,
        restStart: 0
    };
    return {
        routine: r,
        workout: workout
    };
}
