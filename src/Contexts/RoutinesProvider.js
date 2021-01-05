import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoutinesContext from './RoutinesContext';

//heirarchy: routine => workout => exercise => set => rep
//ro, wo, ex, se, re
const RoutinesProvider = props => {


    return (
        <RoutinesContext.Provider value={{
        }}>
            {props.children}
        </RoutinesContext.Provider>
    );
}

export default RoutinesProvider;
