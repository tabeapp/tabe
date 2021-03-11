import { TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Words from '../Components/Simple/Words';
import { BLANK_ROUTINE } from '../Constants/DefaultRoutineInfo';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { RoutinesContext } from '../Contexts/RoutinesProvider';
import RoutineCard from '../Components/Routine/RoutineCard';

//this is for choosing a routine to edit, instead of jumping right in
//crud operations on this level deserve server calls
const RoutineScreen = props => {
    //why is it like this
    const {routines, routinesDispatch} = useContext(RoutinesContext);


    return (
        <SafeBorderNav {...props} screen={'routine'}>
            <TopBar title='Routines'/>
            <View style={STYLES.body}>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {
                        routines &&
                        routines.map(routine =>
                            <RoutineCard {...props} routine={routine}/>
                        )
                    }
                </View>
                <TouchableOpacity  onPress={() => {
                    routinesDispatch({path: 'editRoutine', value: BLANK_ROUTINE()});

                    props.navigation.navigate('routineedit');
                    //routine: emptyRoutine, // no this will be set in the context
                    //saveRoutine: saveRoutine no this will be available in the context
                    //})
                }}>
                    <Words style={{fontSize: 40}}>+</Words>
                </TouchableOpacity>

            </View>
        </SafeBorderNav>
    );
};

export default RoutineScreen;
