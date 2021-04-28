import React from 'react';
import { ScrollView, View } from 'react-native';
import { BACKGROUND, DARK_GRAY } from '../../Style/Colors';
import Words from '../Simple/Words';
import Row from '../Simple/Row';

const SummaryDisplay = props => {
    const {exercises} = props;

    return (
        <>
            {
                exercises &&
                exercises.map(exercise =>
                    <Row
                        key={exercise.name}
                        style={{alignItems: 'flex-start', padding: 4, borderTopWidth: 1, borderColor: BACKGROUND}}
                    >
                        <Words style={{fontSize: 25}}>{exercise.name}</Words>
                        <View>{
                            exercise.work.map((set,i) =>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Row key={i}>
                                        <Words style={{fontSize: 15, width: 20}}>
                                            {set.sets + 'x'}
                                        </Words>
                                        <Words style={{fontSize: 15, width: 40, textAlign: 'right'}}>
                                            {set.reps + ' x'}
                                        </Words>
                                        <Words style={{fontSize: 15, width: 50, textAlign: 'right'}}>
                                            {set.weight + 'lb'}
                                        </Words>

                                    </Row>
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
