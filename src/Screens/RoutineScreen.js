import { TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Words from '../Components/Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BLANK_ROUTINE } from '../Constants/DefaultRoutineInfo';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { Routine } from '../../models';
import { DataStore } from 'aws-amplify';
import { UserContext } from '../Contexts/UserProvider';
import { RoutinesContext } from '../Contexts/RoutinesProvider';

//this is for choosing a routine to edit, instead of jumping right in
//crud operations on this level deserve server calls
const RoutineScreen = props => {
    //why is it like this
    const {username} = useContext(UserContext);
    const {routines} = useContext(RoutinesContext);
    const {routinesDispatch} = useContext(RoutinesContext);

    const deleteRoutine = async id => {
        //datastore actually makes this simple
        const toDelete = await DataStore.query(Routine, id);
        DataStore.delete(Routine, toDelete);
    };

    const handleSetCurrent = async id => {
        //would this be easier with graphql mutation?
        //no
        //this unfortutaely is the best way
        //pull all the users routines and set them current zero except the one
        const usersRoutines = await DataStore.query(Routine, r => r.userID('eq', username));
        usersRoutines.forEach(routine => {
            //only two secnarios that need to be updated
            if(routine.current === 1 && routine.id !== id)
                DataStore.save(Routine.copyOf(routine, updated => {
                    updated.current = 0
                }));
            else if(routine.current === 0 && routine.id === id)
                DataStore.save(Routine.copyOf(routine, updated => {
                    updated.current = 1
                }));
        });
    };

    return (
        <SafeBorderNav {...props} screen={'routine'}>
            <TopBar title='Routines'/>
            <View style={STYLES.body}>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {
                        routines &&
                        routines.map(routine =>
                            <TouchableOpacity
                                key={routine.id}
                                onPress={() => {
                                    //set it in the context
                                    //need to just throw in title and id so we can edit it
                                    routinesDispatch({
                                        path: 'editRoutine',
                                        value: {...JSON.parse(routine.routine), id: routine.id, title: routine.title}
                                    });
                                    /*send it off to routine editor*/
                                    props.navigation.navigate('routineedit');
                                }}
                                style={{flexDirection: 'row', width: '95%', backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100}}
                            >
                                <Words style={{fontSize: 20}}>{
                                    routine.title
                                }</Words>
                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    deleteRoutine(routine.id);//
                                }}>
                                    <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    handleSetCurrent(routine.id)
                                }}>
                                    <Words style={{fontSize:20}}>
                                        Current:
                                        {
                                            routine.current &&
                                            <Ionicons color={'green'} size={30} name={'checkbox'}/>
                                        }
                                        {
                                            !routine.current &&
                                            <Ionicons color={'gray'} size={30} name={'checkbox-outline'}/>
                                        }
                                    </Words>
                                </TouchableOpacity>
                                <Words>
                                    {routine.id}
                                </Words>
                            </TouchableOpacity>
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
