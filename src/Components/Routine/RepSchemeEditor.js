import React, { useContext } from 'react';
import Words from '../Simple/Words';
import { TouchableOpacity, View } from 'react-native';
import { RoutinesContext } from '../../Contexts/RoutinesProvider';
import { FULL_COPY } from '../../Utils/UtilFunctions';
import { NEW_PR } from '../../Constants/Symbols';
import Chooser from '../Simple/Chooser';
import Row from '../Simple/Row';
import { STYLES } from '../../Style/Values';
import { BACKGROUND, DARK_GRAY } from '../../Style/Colors';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah maybe I should make another compoenent for htis
const percents = [];
for(let i = 0; i <= 100; i++)
    percents.push(i)
//
percents.push(NEW_PR);

const RepSchemeEditor = props => {
    //eventually you'll need to pass down the name of the rep scheme for multiple

    const {routineEditDispatch} = useContext(RoutineEditContext);
    const {name} = props;//need to use name
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?
    const width = useWindowDimensions().width;

    //this is kinda going to resemble customexercise card
    return(
        <View style={{borderColor: 'red', borderWidth: 1, width: width, backgroundColor: DARK_GRAY}}>
            <Words style={{fontWeight: 'bold', fontSize: 30}}>Rep Scheme {name}</Words>
            {
                props.sets.map((week, weekIndex) =>
                    <Row key={weekIndex}>
                        <Words>{weekIndex+1}:</Words>
                        <View style={{flex: 1, backgroundColor: 'transparent', borderRadius: 20}}>
                            {
                                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                                    {
                                        week.map((v, setIndex) =>
                                            <Row key={setIndex}>
                                                <View>
                                                    <Chooser
                                                        style={{height: 45}}
                                                        itemStyle={{height: 45}}
                                                        selected={v.reps}
                                                        onChange={value => {
                                                            routineEditDispatch({
                                                                path: `customSets.${name}.${weekIndex}.${setIndex}.reps`,
                                                                value: value
                                                            });
                                                        }}
                                                        list={reps}
                                                    />
                                                </View>
                                                <Words>@</Words>
                                                <View>
                                                    <Chooser
                                                        style={{height: 45}}
                                                        itemStyle={{height: 45}}
                                                        selected={v['%']}
                                                        onChange={value => {
                                                            routineEditDispatch({
                                                                path: `customSets.${name}.${weekIndex}.${setIndex}.%`,
                                                                value: value
                                                            });
                                                        }}
                                                        list={percents}
                                                    />
                                                </View>
                                                <Words>%</Words>
                                            </Row>
                                        )
                                    }
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
                                </View>
                            }

                        </View>
                    </Row>

                )

            }
            <TouchableOpacity style={STYLES.textButton} onPress={() => {
                routineEditDispatch(prev => {
                    const x = prev.customSets[name];
                    if(x.length === 0)
                        x.push([]);
                    else
                        x.push(FULL_COPY(x[x.length-1]));
                    return prev;
                });
                //append a new obj
            }}>
                <Words style={{fontSize: 30}}>Add iteration</Words>
            </TouchableOpacity>
        </View>
    )

}

export default RepSchemeEditor;
