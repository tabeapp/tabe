import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import NumericSelector from './NumericSelector';
import Words from './Words';
import { Picker } from '@react-native-picker/picker';
import SupersetEditor from "./SupersetEditor";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

const ExerciseEditor = props => {
    //ugh this sucks
    const {name, info, deleteExercise} = props;

    //
    if(name.includes('/'))
        return <SupersetEditor {...props}/>

    //i guess the width is 400?
    //there's gotta be a more programmatic way to do this
    return <View key={name} style={{margin: 3, width: 406, backgroundColor: '#333'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color:'white'}}>{name}</Text>
            <TouchableOpacity onPress={deleteExercise} style={{width: 20, borderWidth: 1, borderColor: 'red', borderRadius: 10}}>
                <Text style={{color:'red'}}>X</Text>
            </TouchableOpacity>
        </View>

        <Text>Current Working Weight: </Text>
        <NumericSelector onChange={value => {
            props.editInfo(prev => {
                //there's gotta be some way to generalize this
                const next = {...prev[props.name]};
                next.current = value;
                return {...prev, [props.name]: next}
            });
        }} numInfo={{def:info.current, min: 0, max: 995, increment: 5}}/>

        <Text>Sets:</Text>
        <Words>Set Type:</Words>
        <Picker
            style={{width: 100, height: 50}}
            selectedValue={info.setInfo.type}
            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
            onValueChange={value => {
                props.editInfo(prev => {
                    const next = {...prev[props.name]};
                    next.setInfo.type = value;

                    if(value === 'Timed')
                        next.setInfo.sets = next.setInfo.sets.map(_ => ({minutes: 1, seconds: 0}));
                    else if(value === 'Normal')
                        next.setInfo.sets = next.setInfo.sets.map(_ => 5);

                    return {...prev, [props.name]: next};
                });
            }}
        >
            {
                ['Normal', 'Custom', 'Sum', 'Timed'].map(item =>
                    <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
            }
        </Picker>

        {
            //this should actually be very similar to custom workout screen
            info.setInfo.type === 'Normal' &&
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                    style={{margin: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                    onPress={() => {
                        //k is replaced by props.name
                        props.editInfo(prev => {
                            const next = {...prev[props.name]};
                            next.setInfo.sets.splice(next.setInfo.sets.length-1);
                            return {...prev, [props.name]: next};
                        });

                    }} >
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>-</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
                    {
                        info.setInfo.sets.map((v, index) =>

                            <View key={index} style={styles.circle}>
                                <Picker
                                    style={{width: 50, height: 50}}
                                    selectedValue={v}
                                    itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                                    onValueChange={(value) => {
                                        //how the fuck
                                        //would defeinitely be a good idea to set all following sets to current rep
                                        props.editInfo(prev => {
                                            const next = {...prev[props.name]};
                                            next.setInfo.sets[index] = value;
                                            for(let i = index; i < next.setInfo.sets.length; i++)
                                                next.setInfo.sets[i] = value;
                                            return {...prev, [props.name]: next};
                                        });
                                    }}
                                >
                                    {
                                        reps.map(item =>
                                            <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                                    }
                                </Picker>
                            </View>
                        )
                    }
                </View>

                <TouchableOpacity
                    style={{margin: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                    onPress={() => {
                        props.editInfo(prev => {
                            const next = {...prev[props.name]};
                            if(next.setInfo.sets.length === 0) {
                                if (next.setInfo.type === 'Normal')
                                    next.setInfo.sets.push(5);
                                else if (next.setInfo.type === 'Timed')
                                    next.setInfo.sets.push({ minutes: 1, seconds: 0 });
                            }
                            else if(next.setInfo.sets.length <= 12)
                                next.setInfo.sets.push(next.setInfo.sets[next.setInfo.sets.length-1])
                            return {...prev, [props.name]: next};
                        })
                    }}>
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                </TouchableOpacity>
            </View>
        }
        {
            info.setInfo.type === 'Custom' &&
            <View></View>
        }
        {
            info.setInfo.type === 'Sum' &&
            <View style={styles.circle}>
                <Picker
                    style={{width: 50, height: 50}}
                    selectedValue={info.setInfo.sum}
                    itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
                    onValueChange={(value) => {
                        props.editInfo(prev => {
                            const next = {...prev[props.name]};
                            next.setInfo.sum = value;
                            return {...prev, [props.name]: next};
                        });
                    }}
                >
                    {
                        reps.map(item =>
                            <Picker.Item key={item} color={'white'} label={''+item} value={item} style={{}}/> )
                    }
                </Picker>
            </View>
        }
        {
            info.setInfo.type === 'Timed' &&
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity
                    style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'red'}}
                    onPress={() => {
                        //k is replaced by props.name
                        props.editInfo(prev => {
                            const next = {...prev[props.name]};
                            next.setInfo.sets.splice(next.setInfo.sets.length-1);
                            return {...prev, [props.name]: next};
                        });

                    }} >
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>-</Text>
                </TouchableOpacity>
                {
                    info.setInfo.sets.map((v, index) =>
                        <View>
                            <NumericSelector onChange={(value) => {
                                props.editInfo(prev => {
                                    const next = {...prev[props.name]};
                                    next.setInfo.sets[index].minutes = value;
                                    return {...prev, [props.name]: next};
                                });
                            }} numInfo={{def:info.setInfo.sets[index].minutes, min: 0, max: 59, increment: 1}}/>
                            <Words>:</Words>
                            <NumericSelector onChange={(value) => {
                                props.editInfo(prev => {
                                    const next = {...prev[props.name]};
                                    next.setInfo.sets[index].seconds = value;
                                    return {...prev, [props.name]: next};
                                });

                            }} numInfo={{def:info.setInfo.sets[index].seconds, min: 0, max: 55, increment: 5}}/>
                        </View>
                    )
                }
                <TouchableOpacity
                    style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                    onPress={() => {
                        props.editInfo(prev => {
                            const next = {...prev[props.name]};
                            if(next.setInfo.sets.length === 0) {
                                if (next.setInfo.type === 'Normal')
                                    next.setInfo.sets.push(5);
                                else if (next.setInfo.type === 'Timed')
                                    next.setInfo.sets.push({ minutes: 1, seconds: 0 });
                            }
                            else if(next.setInfo.sets.length <= 12)
                                next.setInfo.sets.push({...next.setInfo.sets[next.setInfo.sets.length-1]})
                            return {...prev, [props.name]: next};
                        })
                    }}>
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                </TouchableOpacity>

            </View>
        }
        <Text>Progression:</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Words>Add</Words>
            <NumericSelector onChange={value => {
                props.editInfo(prev => {
                    const next = { ...prev[props.name] };
                    next.progress.amount = value;
                    return { ...prev, [props.name]: next };
                });
            }} numInfo={{def:info.progress.amount, min: 0, max: 25, increment: 2.5}}/>
            <Words>lb every</Words>
            <NumericSelector onChange={value => {
                props.editInfo(prev => {
                    const next = { ...prev[props.name] };
                    next.progress.rate = value;
                    return { ...prev, [props.name]: next };
                });
            }} numInfo={{def:info.progress.rate, min: 1, max: 10, increment: 1}}/>
            <Words>times the workout is done</Words>
        </View>

        {
            info.setInfo.type === 'Normal' &&//this doesn't do shit
            <View>
                <Text>AMRAP Last Set:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={info.amrap ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={val => {
                        props.editInfo(prev => {
                            const next = { ...prev[props.name] };
                            next.amrap = val;
                            return { ...prev, [props.name]: next };
                        });
                    }}
                    value={info.amrap}
                />
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    circle: {
        flex: 1,
        minWidth: 20,
        maxWidth: 50,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

export default ExerciseEditor;
