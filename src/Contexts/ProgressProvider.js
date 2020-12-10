import React from 'react';
import ProgressContext from './ProgressContext';
import { MetallicaPPL, SampleProgress } from '../Assets/Routines/MetallicaPPL';

//one way to do it, custom provider object

class ProgressProvider extends React.Component {
    //load from local storage?
    state = {
        routine: {...MetallicaPPL},
        progress: {...SampleProgress}
    }

    //the most simple of the workout functions
    updateSet = (exercise, setN, reps) => {
        this.setState(state => {
            if(!state.progress[exercise])
                state.progress[exercise] = [];
            state.progress[exercise][setN] = reps;
            return state;
        });
    };

    render() {
        return (
            <ProgressContext.Provider value={{
                routine: this.state.routine,
                progress: this.state.progress,
                updateSet: this.updateSet,
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
