import { FlatList, View } from 'react-native';
import React, { useContext } from 'react';
import { BLANK_ROUTINE } from '../Constants/DefaultRoutineInfo';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { RoutinesContext } from '../Contexts/RoutinesProvider';
import RoutineCard from '../Components/Routine/RoutineCard';
import { RoutineEditContext } from '../Contexts/RoutineEditProvider';

//this is for choosing a routine to edit, instead of jumping right in
//crud operations on this level deserve server calls
const RoutineScreen = props => {
    //why is it like this
    const {routines} = useContext(RoutinesContext);
    const {routineEditDispatch} = useContext(RoutineEditContext);

    return (
        <SafeBorderNav {...props} screen={'routine'}>
            <TopBar
                title='Routines'
                rightText='+'
                onPressRight={() => {
                    routineEditDispatch(() => BLANK_ROUTINE());
                    props.navigation.navigate('routineedit');
                }}
            />
            <View style={STYLES.body}>
                <FlatList
                    style={{width: '100%'}}
                    data={routines}
                    renderItem={({item}) =>
                        <RoutineCard {...props} routine={item}/>
                    }
                />
            </View>
        </SafeBorderNav>
    );
};

export default RoutineScreen;
