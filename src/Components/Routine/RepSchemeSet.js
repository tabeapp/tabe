import React, { useContext } from 'react';
import Words from '../Simple/Words';
import { View } from 'react-native';
import { NEW_PR } from '../../Constants/Symbols';
import Chooser from '../Simple/Chooser';
import Row from '../Simple/Row';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';
import { PRIMARY } from '../../Style/Colors';

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah maybe I should make another compoenent for htis
const percents = [];
for(let i = 0; i <= 100; i++)
    percents.push(i)
//
percents.push(NEW_PR);

const RepSchemeSet = props => {
    const {routineEditDispatch} = useContext(RoutineEditContext);
    const {pathPrefix, v} = props;

    return(
        <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center'}}>
                <Chooser
                    itemStyle={{height: 45}}
                    selected={v.reps}
                    onChange={value => {
                        routineEditDispatch({
                            path: `${pathPrefix}.reps`,
                            value: value
                        });
                    }}
                    list={reps}
                />
                <Words>@</Words>
            </View>
            <View style={{alignItems: 'center'}}>
                <Chooser
                    itemStyle={{height: 45}}
                    selected={v['%']}
                    onChange={value => {
                        routineEditDispatch({
                            path: `${pathPrefix}.%`,
                            value: value
                        });
                    }}
                    list={percents}
                />
                <Words>%</Words>
            </View>
        </View>
    );

};

export default RepSchemeSet;
