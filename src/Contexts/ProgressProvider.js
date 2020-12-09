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

    render() {
        return (
            <ProgressContext.Provider value={{
                routine: this.state.routine,
                progress: this.state.progress
            }}>
                {this.props.children}
            </ProgressContext.Provider>
        );
    }
}

export default ProgressProvider;
