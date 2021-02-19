import { TouchableOpacity, SafeAreaView, StyleSheet, View } from "react-native";
import React, {useContext} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoutinesContext from "../Contexts/RoutinesContext";
import { BLANK_ROUTINE } from "../Constants/DefaultRoutineInfo";
import { FULL_COPY } from "../Utils/UtilFunctions";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import { STYLES } from "../Style/Values";
import { Routine } from "../../models";
import { API, DataStore, graphqlOperation } from "aws-amplify";
import { updateRoutine } from "../../graphql/mutations";
import { UserContext } from "../Contexts/UserProvider";

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
                                    routinesDispatch({path: 'editRoutine', value: JSON.parse(routine.routine)});
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
