import React, { useContext, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { UserContext } from './UserProvider';
import { listRoutinesByUser } from '../../graphql/queries';
import { updateRoutine } from '../../graphql/mutations';
import { onChangeRoutine } from '../../graphql/subscriptions';
import { REST_DAY } from '../Constants/Symbols';

export const RoutinesContext = React.createContext();

//edit the routine, set the current routine, and just manage all saved routines
const RoutinesProvider = props => {
    const [routines, setRoutines] = useState([]);

    const {username} = useContext(UserContext);

    //hopeful this wont mess anythign up
    //for some reason, starting a workout call this thing twice
    const reload = async () => {
        const routinesResult = await API.graphql(graphqlOperation(listRoutinesByUser, {
            userID: username,
            limit: 10
        }))
        setRoutines(routinesResult.data.listRoutinesByUser.items);
    };

    //initial load from storage
    //BETTER IDEA, USE DATA STORE
    useEffect(() => {
        if(username === '')
            return;

        reload();

        //not the other way around
        const sub = API.graphql(graphqlOperation(onChangeRoutine, {
            userID: username
        })).subscribe({
            //just reload routines, it should be pretty small
            next: (obj) => {
                reload();
            }
        })

        return () => sub.unsubscribe();
    }, [username]);

    //you generate a routine, so it makes sense to have this here
    const generateRoutine = async (baseRoutine, efforts) => {
        const routine = { ...baseRoutine };
        routine.currentDay = 0;//seems unnecssary
        //just setting this to dumb value for now
        //next work out is today, buddy
        //set it to super early in the morning for easy comparison
        let nextW = new Date();
        nextW.setHours(0);
        nextW.setMinutes(0);
        routine.nextWorkoutTime = nextW.getTime();

        //need to iterate because of press vs press.ez
        for (let i = 0; i < efforts.length; i++) {
            const ex = efforts[i];
            //progress is copied in right here
            const routineEx = routine.info[ex.name];
            //this is actually pretty imporatnt, forgot it in routineedit
            routineEx.progress.countdown = routineEx.progress.rate;

            //step 1, calculate one rep max
            //using epley
            let orm = ex.reps === 1 ? ex.weight : ex.weight * (1 + ex.reps / 30);
            //step 2, multiply * .9 to get training orm
            orm *= .9;

            //step 3, 5/3/1 will just take that orm, starting strength will use 5RM
            //the calculation isn't perfect, but who cares tbh
            //the current weight will incrmement anyways, and you can change it if you need

            //if normal, all sets have the same reps
            routineEx.current = orm / (1 + routineEx.setInfo.sets[0] / 30);
            routineEx.current = Math.floor(routineEx.current / 5) * 5;
            //otherwise, just use the orm, like in 5/3/1

            //i guess we should go throught the entire alphabet
            const ez = routine.info[ex.name + '-b'];
            if (ez) {
                ez.current = orm / (1 + ez.setInfo.sets[0] / 30);
                ez.current = Math.floor(ez.current / 5) * 5;
            }

        }
        //eh, this is pretty important for beginners but we'll come back to it
        setRoutines([...routines, routine]);
    };

    //use this for sure
    const updateRoutineData = async (routineID, routineData) => {

        await API.graphql(graphqlOperation(updateRoutine, {
            input: {
                id: routineID,
                routine: JSON.stringify(routineData)
            }
        }));
    };

    const getCurrent = () => {
        return routines.find(x => x.current === 1);
    };

    //can't avoid doing this
    //step 3, right before workout
    const checkRest = () => {
        //if the current time is before the nextWorkout time, take a rest
        const now = new Date().getTime();
        //even if this isn't initialized, it should work as it just returns the current day
        const current = getCurrent();
        const r = JSON.parse(current.routine);

        if(now < r.nextWorkoutTime)
            return true;

        //if it's after, advance currentday until there's a workout
        //and return false
        while(r.days[r.currentDay%r.time] === REST_DAY)
            r.currentDay++;

        updateRoutineData(current.id, r);

        return false;
    };

    return (
        <RoutinesContext.Provider value={{
            routines: routines,
            getCurrent: getCurrent,
            updateRoutineData: updateRoutineData,
            generateRoutine: generateRoutine,
            checkRest: checkRest
        }}>
            {props.children}
        </RoutinesContext.Provider>
    );
}

export default RoutinesProvider;
