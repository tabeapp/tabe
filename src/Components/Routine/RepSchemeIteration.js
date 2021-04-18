import React, { useContext } from 'react';
import Words from '../Simple/Words';
import { TouchableOpacity, View } from 'react-native';
import Row from '../Simple/Row';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';
import RepSchemeSet from './RepSchemeSet';
import { BACKGROUND, DARK_GRAY, PRIMARY } from '../../Style/Colors';

//yeah maybe I should make another compoenent for htis
const RepSchemeIteration = props => {
    const {routineEditDispatch} = useContext(RoutineEditContext);
    const {week, weekIndex, name} = props;//need to use name

    return(
        <Row style={{borderTopWidth: 1, borderColor: PRIMARY}}>
            <TouchableOpacity
                style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                onPress={() => {
                    routineEditDispatch(prev => {
                        const x = prev.customSets[name][weekIndex];
                        x.splice(x.length-1);
                        return prev;
                    })
                }}>
                <Words style={{color: 'red', fontWeight: 'bold', fontSize: 15, }}>-</Words>
            </TouchableOpacity>
            <View style={{padding: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                {
                    week.map((v, setIndex) =>
                        <RepSchemeSet
                            key={setIndex} v={v}
                            pathPrefix={`customSets.${name}.${weekIndex}.${setIndex}`}
                        />
                    )
                }
            </View>
            <TouchableOpacity
                style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                onPress={() =>
                    routineEditDispatch(prev => {
                        const x = prev.customSets[name][weekIndex];
                        if(x.length === 0)
                            x.push({reps:5, '%': 100});
                        else
                            x.push({...x[x.length-1]});
                        return prev;
                    })
                }
            >
                <Words style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Words>
            </TouchableOpacity>

        </Row>
    );

};

export default RepSchemeIteration;
