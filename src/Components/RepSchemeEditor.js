import React, {useContext} from 'react';
import Words from './Words';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RoutinesContext from '../Contexts/RoutinesContext';
import { FULL_COPY } from '../Utils/UtilFunctions';

const NEW_PR = 'PR';

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

    const {routinesDispatch} = useContext(RoutinesContext);
    const {name} = props;//need to use name
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?

    //this is kinda going to resemble customexercise card
    return(
        <>
            <View style={{justifyContent: 'center', height: 400, margin: 5, width: 400, backgroundColor: '#333'}}>
                <Words>Rep Scheme {name}</Words>
                {
                    props.sets.map((week, weekIndex) =>
                        <View key={weekIndex} style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Words>{weekIndex+1}:</Words>
                            <View style={{flex: 1, height: 60, backgroundColor: 'transparent', borderRadius: 20}}>
                                {
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <TouchableOpacity
                                            style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                                            onPress={() => {
                                                routinesDispatch(prev => {
                                                    const x = prev.editRoutine.customSets[name][weekIndex];
                                                    x.splice(x.length-1);
                                                    return prev;
                                                })
                                            }}>
                                            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15, }}>-</Text>
                                        </TouchableOpacity>
                                        {
                                            week.map((v, setIndex) =>

                                                <>
                                                    <View key={setIndex} style={styles.circle}>
                                                        <Picker
                                                            style={{width: 50, height: 50}}
                                                            selectedValue={v.reps}
                                                            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                                            onValueChange={value => {
                                                                routinesDispatch({
                                                                    path: `editRoutine.customSets.${name}.${weekIndex}.${setIndex}.reps`,
                                                                    value: value
                                                                });
                                                            }}
                                                        >
                                                            {
                                                                reps.map(item =>
                                                                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                                            }
                                                        </Picker>
                                                    </View>
                                                    <Words key={setIndex+'a'}>@</Words>
                                                    <View key={setIndex+'f'} style={styles.circle}>
                                                        <Picker
                                                            style={{width: 50, height: 50}}
                                                            selectedValue={v['%']}
                                                            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                                            onValueChange={value => {
                                                                routinesDispatch({
                                                                    path: `editRoutine.customSets.${name}.${weekIndex}.${setIndex}.%`,
                                                                    value: value
                                                                });
                                                            }}
                                                        >
                                                            {
                                                                percents.map(item =>
                                                                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                                            }
                                                        </Picker>
                                                    </View>
                                                    <Words key={setIndex+'b'}>%</Words>
                                                </>
                                            )
                                        }
                                        <TouchableOpacity
                                            style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                                            onPress={() =>
                                                routinesDispatch(prev => {
                                                    const x = prev.editRoutine.customSets[name][weekIndex];
                                                    if(x.length === 0)
                                                        x.push({reps:5, '%': 100});
                                                    else
                                                        x.push({...x[x.length-1]});
                                                    return prev;
                                                })
                                            }
                                        >
                                            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                        </View>

                    )

                }
                <TouchableOpacity style={styles.configButton} onPress={() => {
                    routinesDispatch(prev => {
                        const x = prev.editRoutine.customSets[name];
                        if(x.length === 0)
                            x.push([]);
                        else
                            x.push(FULL_COPY(x[x.length-1]));
                        return prev;
                    });
                    //append a new obj
                }}>
                    <Text style={{fontSize: 30}}>Add Week?Cycle?idk</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    configButton: {
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
    }
})

export default RepSchemeEditor;
