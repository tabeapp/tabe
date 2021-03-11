import { View, TouchableOpacity } from 'react-native';
import Words from '../Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteRoutine, updateRoutine } from '../../../graphql/mutations';
import { PRIMARY } from '../../Style/Theme';

const RoutineCard = props => {
    const {routinesDispatch, getCurrent} = useContext(RoutinesContext);

    const {id, title, current, routine} = props.routine;

    const removeRoutine = () => {
        //very confident this works, why wouldnt it
        API.graphql(graphqlOperation(deleteRoutine, {
            input: {
                id: id
            }
        }));
    };

    const handleSetCurrent = async () => {
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
        <TouchableOpacity
            onPress={() => {
                //set it in the context
                //need to just throw in title and id so we can edit it
                routinesDispatch({
                    path: 'editRoutine',
                    value: {...JSON.parse(routine), id: id, title: title}
                });
                /*send it off to routine editor*/
                props.navigation.navigate('routineedit');
            }}
            style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#222', padding: 10, margin: 4, borderRadius: 20, height: 100}}
        >
            <View>
                <Words style={{fontSize: 40, fontWeight: 'bold'}}>{title}</Words>

                <TouchableOpacity onPress={handleSetCurrent}>
                    <Words style={{fontSize:20}}>
                        Current:
                        {
                            current &&
                            <Ionicons color={PRIMARY} size={30} name={'checkbox'}/>
                        }
                        {
                            !current &&
                            <Ionicons color={'gray'} size={30} name={'checkbox-outline'}/>
                        }
                    </Words>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={removeRoutine}>
                    <Words><Ionicons color={'gray'} size={30} name={'trash'}/></Words>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default RoutineCard;
