import React, { useContext } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import NumericSelector from './NumericSelector';
import Words from '../Simple/Words';
import SupersetEditor from './SupersetEditor';
import RoutinesContext from '../../Contexts/RoutinesProvider';
import { FAILURE } from '../../Constants/Symbols';
import Chooser from '../Simple/Chooser';
import Row from '../Simple/Row';
import { STYLES } from '../../Style/Values';

const reps = [FAILURE];
for(let i = 0; i <= 50; i++)
    reps.push(i)

const ExerciseEditor = props => {
    //ugh this sucks
    const {name, info} = props;

    const {routinesDispatch} = useContext(RoutinesContext);
    const {routines} = useContext(RoutinesContext);
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
        <Row>
            <Words>{name}</Words>
        </Row>

        <Words>Current Working Weight: </Words>
        <NumericSelector onChange={value => {
            routinesDispatch({path: 'editRoutine.info.' + name + '.current', value: value});

        }} numInfo={{def:info.current, min: 0, max: 995, increment: 5}}/>

        <Words>Rest between sets</Words>

        <View style={{flexDirection:'row'}}>
            <NumericSelector
                //you should add default incrememtn value
                //this is so dumb, but it does make rest a single thing and handle it ok
                onChange={value => rd('rest', value*60 + info.rest%60) }
                numInfo={{def:Math.floor(info.rest/60), min: 0, max: 10, increment: 1}}
            />
            <Words>:</Words>
            <NumericSelector
                onChange={value => rd('rest', value + Math.floor(info.rest/60)*60)}
                numInfo={{def:info.rest%60, min: 0, max: 55, increment: 5}}
            />
        </View>

        <Words>Sets:</Words>
        <Words>Set Type:</Words>
        <Chooser
            style={{width: 100}}
            selected={info.setInfo.type}
            onChange={value => {
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
                        //can't edit this, this is just for later when we actually use it to generate workouts
                        x.selector = 0;
                    }
                    else{
                        prev.editRoutine.customScheme = Object.values(prev.editRoutine.info).some(i => {
                            //always jujmping through hoops for supersets
                            if (Array.isArray(i))
                                return i.some(j => j.setInfo.type === 'Custom');
                            return i.setInfo.type === 'Custom';
                        });
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
            list={ ['Normal', 'Custom', 'Sum', 'Timed']}
        />

        {
            //this should actually be very similar to custom workout screen
            info.setInfo.type === 'Normal' &&
            <Row>
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
                    <Words style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>-</Words>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-around'}}>
                    {
                        info.setInfo.sets.map((v, index) =>

                            <View key={index} style={STYLES.circle}>
                                <Chooser
                                    selected={v}
                                    onChange={(value) => {
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
                                    list={reps}
                                />
                            </View>
                        )
                    }
                </View>

                <TouchableOpacity
                    style={{margin: 10, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 15, borderWidth: 3, borderColor: 'green'}}
                    onPress={addSet}
                >
                    <Words style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Words>
                </TouchableOpacity>
            </Row>
        }
        {
            info.setInfo.type === 'Custom' &&
            //finally, the selector, somethign unique to custom
            <View>
                <Words>Select Custom Scheme:</Words>
                <Chooser
                    selected={info.setInfo.scheme}
                    onChange={value => {
                        rd('setInfo.scheme', value);
                    }}
                    list={Object.keys(routines.editRoutine.customSets)}
                />
            </View>
        }
        {
            info.setInfo.type === 'Sum' &&
            <View style={STYLES.circle}>
                <Chooser
                    selected={info.setInfo.sum}
                    onChange={(value) => {
                        routinesDispatch({path: 'editRoutine.info.' + name + '.setInfo.sum', value: value})
                    }}
                    list={reps}
                />
            </View>
        }
        {
            info.setInfo.type === 'Timed' &&
            <Row>
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
                    <Words style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>-</Words>
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
                    <Words style={{color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Words>
                </TouchableOpacity>

            </Row>
        }
        <Words>Progression:</Words>
        <Row>
            <Words>Add</Words>
            <NumericSelector onChange={value => {
                rd('progress.amount', value);
            }} numInfo={{def:info.progress.amount, min: 0, max: 25, increment: 2.5}}/>
            <Words>lb every</Words>
            <NumericSelector onChange={value => {
                rd('progress.rate', value);
            }} numInfo={{def:info.progress.rate, min: 1, max: 10, increment: 1}}/>
            <Words>times the workout is done</Words>
        </Row>

        {
            info.setInfo.type === 'Normal' &&//this doesn't do shit
            <View>
                <Words>AMRAP Last Set:</Words>
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
        <View>
            <Words>Warmup</Words>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={info.warmup ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={val => {
                    rd('warmup', val);
                }}
                value={info.warmup}
            />
        </View>
    </View>
}

export default ExerciseEditor;
