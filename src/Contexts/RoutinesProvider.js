import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoutinesContext from './RoutinesContext';
import { useReducer, useEffect } from 'react';

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re

//so the idea behind this shit is that i'm really tired of passing down modifying functions
//so we're gonna use useReducer


//this is for all thigns routines
//edit the routine, set the current routine, and just manage all saved routines
const RoutinesProvider = props => {
    const initState = {
        current: '',
        routines: {},
        editRoutine: {}
    };

    //initial load from storage
    useEffect(() => {
        AsyncStorage.getItem('@routines').then(obj => {
            console.log('object ' + obj);
            //kinda weird, but this will just set the state to this load
            //it does work tho
            if(obj !== null)
                routinesDispatch(() => JSON.parse(obj));
        })
    }, []);

    //so i guess state is the previous state
    //and action will be whatever i want, huh?
    const routinesReducer = (state, action) => {
        const next = {...state};
        if(action.constructor === Function){
            //run action on state
            return action(next);
        }

        //otherwise
        //drill into state programmatically
        //action.path //'editroutine.title']
        //action.value///startingstrength
        if(action.path){
            const path = action.path.split('.');
            let target = next;
            //stop right before last
            for(let i = 0; i < path.length-1; i++){
                const p = path[i];
                if(!(p in target)){
                    if(Number.isInteger(p))
                        target[p] = [];
                    else
                        target[p] = {};
                }
                target = target[p];
            }
            //and finally set it
            target[path[path.length-1]] = action.value;
        }

        //i guess we could store some logic here
        if(action.type){
            //this needs to happen a lot
            if(action.type === 'setItem')
                //don't save editRoutine... or should we?
                AsyncStorage.setItem('@routines', JSON.stringify({
                    current: next.current,
                    routines: next.routines,
                }));
        }

        return next;
    };

    const [routines, routinesDispatch] = useReducer(routinesReducer, initState);

    return (
        <RoutinesContext.Provider value={{
            routines: routines,
            routinesDispatch: routinesDispatch
        }}>
            {props.children}
        </RoutinesContext.Provider>
    );
}

export default RoutinesProvider;
