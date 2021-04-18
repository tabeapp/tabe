import React, { useReducer } from 'react';
import { FULL_COPY } from '../Utils/UtilFunctions';

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re

//so the idea behind this shit is that i'm really tired of passing down modifying functions
//so we're gonna use useReducer

export const RoutineEditContext = React.createContext();
//this is for all thigns routines
//edit the routine, set the current routine, and just manage all saved routines

//this will handle the data we edit, the other routineprovider will handle loading routines from aws
//so this is routine provider but just "editRoutine"
//this is an offline thing
const RoutineEditProvider = props => {
    //maybe use some routine type here?
    const initState = {};

    //you generate a routine, so it makes sense to have this here
    const invariantCheck = next => {

        return next;
    };

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    //maybe this should only be used for edit Routine
    const routineEditReducer = (state, action) => {
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

    const [editRoutine, routinesDispatch] = useReducer(routineEditReducer, initState);

    return (
        <RoutineEditContext.Provider value={{
            editRoutine: editRoutine,
            routinesDispatch: routinesDispatch,
        }}>
            {props.children}
        </RoutineEditContext.Provider>
    );
};

export default RoutineEditProvider;
