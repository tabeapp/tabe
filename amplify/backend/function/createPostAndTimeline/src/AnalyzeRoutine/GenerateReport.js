const { CURRENT } = require('../Constants/Symbols');

//this runs before posting any data, get the workout info ready
//might want to merge in the other one too
exports.generateReport = (workout) => {
    //just default for the report
    if(!workout) {
        return {
            report: {
                title: '',
                summary: '',
                exercises: []
            }
        }
    }

    let report = {};
    report.title = workout.title;
    //this seems to mess with graphQl?
    //report.time = new Date().getTime();//get current time;

    //now that we have workout-warmup, this is parsing incorrectly
    console.log(workout);
    report.exercises = workout.exercises.map(exercise => {
        if(exercise.name.includes('-Warmup'))
            return {work: []}

        let exReport = {
            name: exercise.name,
            work: []
        };

        //not sure when tf this would happen
        if(!exercise.sets[0])
            return {work:[]};

        //scan and compile into somethign like 2x3@150, 1x5@180
        let curWeight = exercise.sets[0].weight;
        let curReps = exercise.sets[0].progress;
        let curRun = 1;
        for(let j = 1; j < exercise.sets.length; j++){
            const set = exercise.sets[j];

            if(set.weight === curWeight && set.progress === curReps)
                curRun++;
            else{
                //save and restart counter
                exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });
                curWeight = set.weight;
                curReps = set.progress;
                curRun = 1;
            }
        }
        //save the last one
        exReport.work.push({sets: curRun, reps: curReps, weight: curWeight });

        //will this filter out 0s?
        exReport.work = exReport.work.filter(s =>
            s.reps && s.reps !== CURRENT
        )

        return exReport;
    });

    report.exercises = report.exercises.filter(ex => ex.work.length);

    let x = '';
    report.exercises.forEach(ex => {
        x += ex.name + ' ';
        ex.work.forEach(info => {
            x += info.sets + 'x' + info.reps + '@' + info.weight + ', ';
        });
    });
    x = x.substring(0, x.length-2);
    report.summary = x;

    return {
        report: report
    };
}



