import { REPS_TO_REPS, ROUND_5 } from './UtilFunctions';
import { FAILURE, REST_DAY } from '../Constants/Symbols';

//this is one ridiculous refactoring
//trying to make this whole thing a pure function
export const analyzeWorkout = async (report, workout, routine) => {

    ///----------------update user stats and get effort of workout ---------------
    //so first we look at the workout and break it up into efforts
    //efforts are linked to user, location, exercise, and weight
    //finally, user info comes into play

    //this is useless, we'll get max stats by looking at efforts by user
    /*let userStats = await AsyncStorage.getItem('@userStats');
    if(userStats === null)
        userStats = {
            'Bench': 0,
            'Squat': 0,
            'Deadlift': 0,
            'Press': 0
        };
    else
        userStats = JSON.parse(userStats);*/

    //this is pretty cool, and will enable progress tracking
    //just the max efforts per exercise, keep it simpler
    const workoutMaxes = {};

    console.log(report);

    if(report.exercises){
        report.exercises.forEach(ex => {
            const name = ex.name.split('-')[0];

            //calculate the largest 1rm for the day
            let orm = -1;

            ex.work.forEach(info => {
                //this has sets, weight, and reps
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

    /*const efforts = Object.entries(workoutMaxes).map([name, info] => new Effort({
        ...info,//weight, reps, orm
        exercise: name
        //still need postid, userid, and locations
        //so doing this in workout provider
    }))*/

    //again, gonna use efforts by user and created at for this
    /*let statProgress = await AsyncStorage.getItem('@progress');
    if(statProgress === null)
        statProgress = [];
    else
        statProgress = JSON.parse(statProgress);

    statProgress.push({
        time: report.time,
        stats: workoutMaxes
    });
    AsyncStorage.setItem('@progress', JSON.stringify(statProgress));

    //console.log(statProgress[statProgress.length-1]);
    AsyncStorage.setItem('@userStats', JSON.stringify(userStats));*/

    //----------------------------------------

    //the rest of this function involves progressing the routine
    //without a routine, just quit
    //maybe all this should go to routineprovider?
    //if no routine, just get the workout maxes
    if(workout.routine === '')
        return {
            efforts: workoutMaxes
        };

    //-------------------Increment linear progression-----------
    //also if you hit all the sets
    //update routine weights
    //wait what if we just wing it

    //so instead of current, we need to somehow indicate the routine the workout is based on

    const newRoutine = JSON.parse(routine);

    console.log(newRoutine);
    console.log(workout);

    //check for progression
    //this needs progress, so it uses workout
    workout.exercises.forEach(ex => {
        //dont progress warmup
        if(ex.name.includes('-Warmup'))
            return;

        //ex has name, and array of sets
        //this is what we added
        const exInfo = newRoutine.info[ex.name];

        //how the fuck would we increment 5/3/1
        // a progress rate of 4 is perfect for this
        //if(exInfo.setInfo.type === 'Custom')
        //return;
        //5/3/1 will progress here
        //texas method will progress by detecting 5rm

        //this exercise doesn't progress
        if (!exInfo.progress || exInfo.progress.amount === 0)
            return;

        //check if progress >= reps for every set
        //then you have completed it
        //maybe have some minimum for
        const passed = ex.sets.every(set =>
            set.reps === FAILURE || set.progress >= set.reps
        );

        //if you dont pass, you dont decremenent the counter
        if (passed) {
            //progress every session
            //i need to add a countdown
            ////progress rate is a number, 7 or 28 nvm
            //the problem is it that if there is a a break, it could be more than 7 days

            //best idea: is to have progress rate as depending on how many times it's done
            //this also handles the problem of "light" days, as they could have a separate countdown

            //decrement teh counter
            exInfo.progress.countdown--;
            if (exInfo.progress.countdown === 0) {
                //reset the counter
                exInfo.progress.countdown = exInfo.progress.rate;
                //the actual progression
                exInfo.current += exInfo.progress.amount;
            }
        }
    });
    //-----------------

    //-----------------increment cusotm cycles------
    //i don't know why this uses workout, not anymore
    report.exercises.forEach(ex => {
        const setInfo = newRoutine.info[ex.name].setInfo;
        if(setInfo.type !== 'Custom')
            return;

        //i know this seems complex but it just cycles through the cycles
        //the custom scheme is selected with customsets[scheme]
        //the length is used to mod the selector
        setInfo.selector = (setInfo.selector+1)%newRoutine.customSets[setInfo.scheme].length;
    });
    //-----------

    //-----------------see if PRs attempts worked---------
    Object.entries(workoutMaxes).forEach(([k,v]) => {
        if(k.includes('-Warmup'))
            return;

        const exInfo = newRoutine.info[k];
        //this only happens with cusomt sets, NEW_PR specifically
        if(exInfo.setInfo.type !== 'Custom')
            return;

        //essentially, go through the best calculated 5rm efforts
        //and go through the
        if(v > exInfo.current)
            exInfo.current = ROUND_5(v);//lol
    });
    //----------------------


    //------------------incrementn fialure countdowns-----------
    //check the failures
    //uses workout becuase this has progress info
    workout.exercises.forEach(ex => {
        //cant fail a warmup
        if(ex.name.includes('-Warmup'))
            return;

        //fail one, fail the exercise
        const failure = ex.sets.some(set => {
            //I'll add this feature later, but metallica ppl has a minimum of 8 for some reps
            //otherwise just use
            if(set.reps === FAILURE)
                return false;

            if (set.minReps)
                return set.progress < set.minReps;
            else
                return set.progress < set.reps;
        });

        if (failure) {

            const exInfo = newRoutine.info[ex.name];
            //this won't be initialized on routine creation
            if (!exInfo.strikes)
                exInfo.strikes = 0;
            exInfo.strikes++;

            //deload if you hit 3 strikes
            //im maybe too lazy to add failure to all the routines
            if (newRoutine.failure && exInfo.strikes >= newRoutine.failure.strikesToDeload) {
                exInfo.strikes = 0;
                exInfo.current *= newRoutine.failure.deload;
            }
            //add a strike for failure
        }

    });
    //-------------------------



    //----------------figureout next workout time
    //just look over this logic to make sure it's good

    //scan through the routine to find next workout
    let nextWorkoutTime = new Date();
    //not a rest day
    //this isn't caluclting correctly
    let daysToNext = 1;
    //scan through days to find next workout day
    //limit 14, just in case of errors
    while(newRoutine.days[(newRoutine.currentDay+daysToNext)%newRoutine.time] === REST_DAY && daysToNext < 14)
        daysToNext++;

    //temporarily set it to minutes to test it out
    /*nextWorkoutTime.setMinutes(nextWorkoutTime.getMinutes() + daysToNext);
    nextWorkoutTime.setSeconds(0);*/

    //we now know how many days until next workout
    nextWorkoutTime.setDate(nextWorkoutTime.getDate() + daysToNext);
    //set to midnight
    nextWorkoutTime.setHours(0);
    nextWorkoutTime.setMinutes(0);
    nextWorkoutTime.setSeconds(0);
    console.log('next workout: ' + nextWorkoutTime);
    //and save
    newRoutine.nextWorkoutTime = nextWorkoutTime.getTime();



    //increment day
    newRoutine.currentDay++;

    return {
        efforts: workoutMaxes,
        routine: newRoutine
    }

    ///and finally, save the thing
    //routinesDispatch({
    //path: `routines.${workout.routine}`,
    //value: newRoutine
    //});
}
