import React, { useContext } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import NumericSelector from './NumericSelector';
import Words from './Words';
import { Picker } from '@react-native-picker/picker';
import SupersetEditor from "./SupersetEditor";
import RoutinesContext from "../Contexts/RoutinesContext";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

const ExerciseEditor = props => {
    //ugh this sucks
    const {name, info, deleteExercise} = props;

    const {routinesDispatch} = useContext(RoutinesContext);
    const rd = (path, value) => {
        routinesDispatch({path: 'editRoutine.info.' + name + '.' + path, value});
    };

    //it's only here cuz it appears twice
    const addSet = () => {
        routinesDispatch(prev => {
            let x = prev.editRoutine.info[name].setInfo;
            if(x.sets.length === 0) {
                if (x.type === 'Normal')
                    x.sets.push(5);
                else if (x.type === 'Timed')
                    x.sets.push({ minutes: 1, seconds: 0 });
            }
            else if(x.sets.length <= 12){
                //this doesn't seem to copy 5's
                if (x.type === 'Normal')
                    x.sets.push(x.sets[x.sets.length-1]);
                else if (x.type === 'Timed')
                    x.sets.push({...x.sets[x.sets.length-1]})
            }
            return prev;
        });
    };


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
            routinesDispatch({path: 'editRoutine.info.' + name + '.current', value: value});

        }} numInfo={{def:info.current, min: 0, max: 995, increment: 5}}/>

        <Text>Sets:</Text>
        <Words>Set Type:</Words>
        <Picker
            style={{width: 100, height: 50}}
            selectedValue={info.setInfo.type}
            itemStyle={{fontSize: 20, borderRadius: 0, height: 50}}
            onValueChange={value => {
                routinesDispatch(prev => {
                    const x = prev.editRoutine.info[name].setInfo;
                    x.type = value;

                    //this is a good start, making it an object with properties, but
                    //we also need to add a selector to exercsie editor
                    //and the ability to both add rep schemes
                    //and handles mulitples rep schemes similar to how we have multiple workotus, in repscheme editor
                    //i had this in useffect, but react is too dumb for my genius
                    if(value === 'Custom'){
                        prev.editRoutine.customScheme = true;
                        //need to make one quick
                        if(Object.keys(prev.editRoutine.customSets).length === 0)
                            prev.editRoutine.customSets.A = [];
                        //set to first
                        x.scheme = Object.keys(prev.editRoutine.customSets)[0];
                    }
                    else{
                        const hasCustom = Object.values(prev.editRoutine.info).some(i => {
                            //always jujmping through hoops for supersets
                            if(Array.isArray(i))
                                return i.some(j => j.setInfo.type === 'Custom');
                            return i.setInfo.type === 'Custom';
                        });
                        prev.editRoutine.customScheme = hasCustom;
                    }

                    //the thing is, we need to add a new thing, similar to the way we had it in
                    //5/3/1
                    //so if it's custom, setInfo will be
                    //{type: 'custom', scheme: '5/3/1', selector: 0}
                    //but selector won't be available
                    //but scheme will need to be selectable
                    //it'll be null until we actually add rep schemes
                    //so here we need to add one


                    if(value === 'Timed')
                        x.sets = x.sets.map(_ => ({minutes: 1, seconds: 0}));
                    else if(value === 'Normal')
                        x.sets = x.sets.map(_ => 5);

                    return prev;
                })
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
                        routinesDispatch(prev => {
                            const x = prev.editRoutine.info[name].setInfo.sets;
                            x.splice(x.length-1);
                            return prev;
                        })

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
                                        routinesDispatch(prev => {
                                            let x = prev.editRoutine.info[name].setInfo.sets;
                                            x[index] = value;
                                            for(let i = index; i < x.length; i++)
                                                x[i] = value;
                                            return prev;
                                        })
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
                    onPress={addSet}
                >
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
                        routinesDispatch({path: 'editRoutine.info.' + name + '.setInfo.sum', value: value})
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
                        routinesDispatch(prev => {
                            const x = prev.editRoutine.info[name].setInfo.sets;
                            x.splice(x.length-1);
                            return prev;
                        })

                    }} >
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>-</Text>
                </TouchableOpacity>
                {
                    info.setInfo.sets.map((v, index) =>
                        <View>
                            <NumericSelector onChange={(value) => {
                                rd('setInfo.sets.' + index + '.minutes', value);
                            }} numInfo={{def:info.setInfo.sets[index].minutes, min: 0, max: 59, increment: 1}}/>
                            <Words>:</Words>
                            <NumericSelector onChange={(value) => {
                                rd('setInfo.sets.' + index + '.seconds', value);
                            }} numInfo={{def:info.setInfo.sets[index].seconds, min: 0, max: 55, increment: 5}}/>
                        </View>
                    )
                }
                <TouchableOpacity
                    style={{margin: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                    onPress={addSet}
                >
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                </TouchableOpacity>

            </View>
        }
        <Text>Progression:</Text>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Words>Add</Words>
            <NumericSelector onChange={value => {
                rd('progress.amount', value);
            }} numInfo={{def:info.progress.amount, min: 0, max: 25, increment: 2.5}}/>
            <Words>lb every</Words>
            <NumericSelector onChange={value => {
                rd('progress.rate', value);
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
                        rd('amrap', val);
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
