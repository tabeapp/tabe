import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RoutinesContext from '../Contexts/RoutinesContext';

const DaysEditor = props => {
    const {routinesDispatch} = useContext(RoutinesContext);

    const temp = ['R', ...props.workouts];

    return (<>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {
                //just to mark days of week
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dow =>
                    <View key={dow} style={{ justifyContent: 'center', alignItems: 'center', width: '12.5%', height: 20, margin: 3 }} >
                        <Text style={{color: 'white'}}>{dow}</Text>
                    </View>
                )
            }
            {
                //you have no idea how complex this is about to get
                props.days.map((d, index) => {
                    return <View key={index} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '12.5%',
                        height: 40,
                        backgroundColor: '#333',
                        margin: 3
                    }}>
                        <Picker
                            style={{ width: 50, height: 50 }}
                            selectedValue={d}
                            itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                            onValueChange={(value) =>
                                routinesDispatch({path: 'editRoutine.days.' + index, value: value})
                            }
                        >
                            {
                                temp.map(item =>
                                    <Picker.Item key={item} color={'white'} label={'' + item} value={item} />
                                )
                            }
                        </Picker>
                    </View>
                    //good enough lol
                })
            }
        </View>
    </>)

};

export default DaysEditor;
