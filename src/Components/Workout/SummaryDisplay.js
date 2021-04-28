import React from 'react';
import { ScrollView, View } from 'react-native';
import { DARK_GRAY } from '../../Style/Colors';
import Words from '../Simple/Words';
import Row from '../Simple/Row';

const SummaryDisplay = props => {
    const {exercises} = props;

    return (

        <>
            {
                exercises &&
                JSON.parse(exercises).map(exercise =>
                    <Row
                        key={exercise.name}
                        style={{alignItems: 'flex-start', padding: 4, borderTopWidth: 1, borderColor: DARK_GRAY}}
                    >
                        <Words style={{fontSize: 25}}>{exercise.name}</Words>
                        <View>{
                            exercise.work.map((set,i) =>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Words key={i} style={{fontSize: 15}}>
                                        {set.sets + 'x' + set.reps + '@' + set.weight + 'lb'}
                                    </Words>
                                </View>
                            )
                        }</View>
                    </Row>
                )
            }
        </>
    );
};

export default SummaryDisplay;
