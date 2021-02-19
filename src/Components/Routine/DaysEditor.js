import React, { useContext } from 'react';
import { View } from 'react-native';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import Words from '../Simple/Words';
import Chooser from '../Simple/Chooser';
import { REST_DAY } from '../../Constants/Symbols';

const DaysEditor = props => {
    const {routinesDispatch} = useContext(RoutinesContext);

    const temp = [REST_DAY, ...props.workouts];

    return (<>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {
                //just to mark days of week
                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dow =>
                    <View key={dow} style={{ justifyContent: 'center', alignItems: 'center', width: '12.5%', height: 20, margin: 3 }} >
                        <Words>{dow}</Words>
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
                        <Chooser
                            selected={d}
                            onChange={value =>
                                routinesDispatch({path: 'editRoutine.days.' + index, value: value})
                            }
                            list={temp}
                        />
                    </View>
                    //good enough lol
                })
            }
        </View>
    </>)

};

export default DaysEditor;
