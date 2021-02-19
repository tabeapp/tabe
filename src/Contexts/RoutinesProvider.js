import React, { useContext, useEffect, useReducer } from 'react';
import { FULL_COPY } from '../Utils/UtilFunctions';
import { DataStore } from 'aws-amplify';
import { UserContext } from './UserProvider';
import { Routine } from '../../models';

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

    //initial load from storage
    //BETTER IDEA, USE DATA STORE
    useEffect(() => {
        //load routine from the magical datastore
        //||r.current('eq', 1)) will get only current
        console.log(username);
        //sometimes the username filter works, sometimes not
        //maybe it needs subscription
        DataStore.query(Routine)//, r => r.userID('eq', username))
            .then(routines => {
                console.log('routines', routines);

                //temporary code to remove some dumb accidental entries
                routines.forEach(routine => {
                    if(!routine.userID)
                        DataStore.delete(Routine, r => r.id('eq', routine.id))
                });

                //take the routines and set them to the format we need
                routinesDispatch(() => ({
                    //holy shit
                    //not that we need it, but this now has
                    //current, userid, title, routine obj
                    routines: routines

                }));
            });
    }, []);

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


    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    const routinesReducer = (state, action) => {
        //this is also great cuz it does the {...state} step right here
        //need deeper copy
        const next = FULL_COPY(state);

        //so just edit the passed in object directly
        if(action.constructor === Function){
            //run action on state
            return action(next);
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

        return next;
    };

    const [data, routinesDispatch] = useReducer(routinesReducer, initState);

    return (
        <RoutinesContext.Provider value={{
            routines: data.routines,
            editRoutine: data.editRoutine,
            routinesDispatch: routinesDispatch,

            generateRoutine: generateRoutine
        }}>
            {props.children}
        </RoutinesContext.Provider>
    );
}

export default RoutinesProvider;
