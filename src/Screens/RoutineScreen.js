import { TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Words from '../Components/Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BLANK_ROUTINE } from '../Constants/DefaultRoutineInfo';
import SafeBorderNav from '../Components/Navigation/SafeBorderNav';
import TopBar from '../Components/Navigation/TopBar';
import { STYLES } from '../Style/Values';
import { API, graphqlOperation } from 'aws-amplify';
import { RoutinesContext } from '../Contexts/RoutinesProvider';
import { deleteRoutine, updateRoutine } from '../../graphql/mutations';

//this is for choosing a routine to edit, instead of jumping right in
//crud operations on this level deserve server calls
const RoutineScreen = props => {
    //why is it like this
    const {routines, routinesDispatch, getCurrent} = useContext(RoutinesContext);

    const removeRoutine = async id => {
        //very confident this works, why wouldnt it
        await API.graphql(graphqlOperation(deleteRoutine, {
            input: {
                id: id
            }
        }));
    };

    const handleSetCurrent = async id => {
        //would this be easier with graphql mutation?
        //no
        //this unfortutaely is the best way

        const oldCurrent = getCurrent();


        //so we have routines available, which conviniently have ids
        //while we could do a check to truly ensure only one routine is current
        //it's easier to simply disable the old current and enable the new current
        //that's just 2 mutuations
        //cant test this until we have

        await API.graphql(graphqlOperation(updateRoutine, {
            input: {
                id: id,
                current: 1
            }
        }));

        if(oldCurrent){
            await API.graphql(graphqlOperation(updateRoutine, {
                input: {
                    id: oldCurrent.id,
                    current: 0
                }
            }));
        }

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
                                    removeRoutine(routine.id);//
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
