import React, { useContext, useEffect, useReducer } from 'react';
import { FULL_COPY } from '../Utils/UtilFunctions';
import { API, graphqlOperation } from 'aws-amplify';
import { UserContext } from './UserProvider';
import { listRoutinesByUser } from '../../graphql/queries';
import { updateRoutine } from '../../graphql/mutations';
import { onChangeRoutine } from '../../graphql/subscriptions';

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re

//so the idea behind this shit is that i'm really tired of passing down modifying functions
//so we're gonna use useReducer

export const RoutinesContext = React.createContext();
//this is for all thigns routines
//edit the routine, set the current routine, and just manage all saved routines
const RoutinesProvider = props => {
    const initState = {
        current: '',
        routines: [],
        editRoutine: {}
    };

    const {username} = useContext(UserContext);

    //hopeful this wont mess anythign up
    //for some reason, starting a workout call this thing twice
    const reload = async () => {
        const routinesResult = await API.graphql(graphqlOperation(listRoutinesByUser, {
            userID: username,
            limit: 10
        }))
        console.log(routinesResult)
        routinesDispatch(() => ({
            routines: routinesResult.data.listRoutinesByUser.items
        }))

    }

    //initial load from storage
    //BETTER IDEA, USE DATA STORE
    useEffect(() => {
        console.log('username', username);
        if(username === '')
            return;
        //sometimes the username filter works, sometimes not

        reload();
        //fuck it, a subscription IS the easiest way

        //maybe it needs subscription TODO yeah it does
        //no it doesn't
        //the deal is, when we make an edit to the routinesProvider object,
        //we should also send off a graphql updateroutine
        //not the other way around
        const sub = API.graphql(graphqlOperation(onChangeRoutine, {
            userID: username
        })).subscribe({
            //just reload routines, it should be pretty small
            next: (obj) => {
                console.log(obj);
                reload();
            }
        })

        return () => sub.unsubscribe();
    }, [username]);

    //you generate a routine, so it makes sense to have this here
    const generateRoutine = async (baseRoutine, efforts) => {
        const routine = {...baseRoutine};
        routine.currentDay = 0;//seems unnecssary
        //just setting this to dumb value for now
        //next work out is today, buddy
        //set it to super early in the morning for easy comparison
        let nextW = new Date();
        nextW.setHours(0);
        nextW.setMinutes(0);
        routine.nextWorkoutTime = nextW.getTime();

        //need to iterate because of press vs press.ez
        for(let i = 0; i < efforts.length; i++){
            const ex = efforts[i];
            //progress is copied in right here
            const routineEx = routine.info[ex.name];
            //this is actually pretty imporatnt, forgot it in routineedit
            routineEx.progress.countdown = routineEx.progress.rate;

            //step 1, calculate one rep max
            //using epley
            let orm = ex.reps === 1 ? ex.weight : ex.weight*(1+ex.reps/30);
            //step 2, multiply * .9 to get training orm
            orm *= .9;

            //step 3, 5/3/1 will just take that orm, starting strength will use 5RM
            //the calculation isn't perfect, but who cares tbh
            //the current weight will incrmement anyways, and you can change it if you need

            //if normal, all sets have the same reps
            routineEx.current = orm/(1+routineEx.setInfo.sets[0]/30);
            routineEx.current = Math.floor(routineEx.current/5)*5;
            //otherwise, just use the orm, like in 5/3/1

            //i guess we should go throught the entire alphabet
            const ez = routine.info[ex.name + '-b'];
            if(ez){
                ez.current = orm/(1+ez.setInfo.sets[0]/30);
                ez.current = Math.floor(ez.current/5)*5;
            }

        }
        routinesDispatch(prev => {
            prev.routines[routine.title] = routine;
            prev.current = routine.title;
            return prev;
        });
    };

    //in the case of routines, here we make sure exercise list matches what's in workouts
    const invariantCheck = next => {

        return next;
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //maybe this should only be used for edit Routine
    const routinesReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            const x = invariantCheck(action(next));
            return x
        }

        //otherwise
        //drill into state programmatically
        //action.path //'editroutine.title']
        //action.value///startingstrength
        //or you can do action = ['editroutine.title', 'startingstrength']
        if(action.path || action.length === 2){
            let path, value;
            //use - instead
            if(action.path) {
                path = action.path.split('.');
                value = action.value;
            } else {
                path = action[0].split('.');
                value = action[1];
            }

            let target = next;
            //stop right before last
            for(let i = 0; i < path.length-1; i++){
                const p = path[i];
                if(!(p in target)){
                    //words. needs this cuz the splitter will split like 'set', '0'
                    if(isNaN(p))
                        target[p] = {};
                    else
                        target[p] = [];
                }
                target = target[p];
            }
            //and finally set it
            target[path[path.length-1]] = value;
        }

        //i guess we could store some logic here
        if(action.type){
        }

        const x = invariantCheck(next);
        return x;
    };

    const [data, routinesDispatch] = useReducer(routinesReducer, initState);

    const updateRoutineData = async (routineId, routineData) => {

        await API.graphql(graphqlOperation(updateRoutine, {
            input: {
                id: routineId,
                routine: JSON.stringify(routineData)
            }
        }));
    };

    const getCurrent = () => {
        return data.routines.find(x => x.current === 1);
    };

    return (
        <RoutinesContext.Provider value={{
            routines: data.routines,
            editRoutine: data.editRoutine,
            routinesDispatch: routinesDispatch,

            getCurrent: getCurrent,
            updateRoutineData: updateRoutineData,
            generateRoutine: generateRoutine
        }}>
            {props.children}
        </RoutinesContext.Provider>
    );
}

export default RoutinesProvider;
