import React, {useContext} from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import NumericSelector from './NumericSelector';
import Words from './Words';
import { Picker } from '@react-native-picker/picker';
import RoutinesContext from "../Contexts/RoutinesContext";

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah this is a copy of exercvise editor
const SupersetEditor = props => {
    //ugh this sucks
    const {name, info, deleteExercise} = props;

    const {routinesDispatch} = useContext(RoutinesContext);
    const rd = (path, value) => {
        routinesDispatch({path: 'editRoutine.info.' + name + '.' + path, value});
    };
    const subExercises = name.split('/');

    //i guess the width is 400?
    //there's gotta be a more programmatic way to do this
    console.log(JSON.stringify(info));
    return(
        <View key={name} style={{margin: 5, width: 400, backgroundColor: '#333'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color:'white'}}>{name}</Text>
                <TouchableOpacity onPress={deleteExercise} style={{width: 20, borderWidth: 1, borderColor: 'red', borderRadius: 10}}>
                    <Text style={{color:'red'}}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
                {
                    //this part also doesn't do shit, btw, all the callbacks are () => {}
                    //info will be an array of info objects in the case of superset
                    info.map((subInfo, ssi) => {
                        return <View style={{flex: 1}}>
                            <Words>{subExercises[ssi]}</Words>
                            <Text>Current Working Weight: </Text>
                            <NumericSelector onChange={() => {}} numInfo={{def:subInfo.current, min: 0, max: 995, increment: 5}}/>


                            <Text>Progression:</Text>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Words>Add</Words>
                                <NumericSelector onChange={() => {}} numInfo={{def:subInfo.progress.amount, min: 0, max: 25, increment: 2.5}}/>
                                <Words>lb</Words>
                            </View>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Words>every</Words>
                                <NumericSelector onChange={() => {}} numInfo={{def:subInfo.progress.rate, min: 1, max: 10, increment: 1}}/>
                                <Words>time</Words>
                            </View>

                            <Text>Sets:</Text>
                            <Words>Set Type:</Words>
                            <Picker
                                style={{ width: 100, height: 50 }}
                                selectedValue={subInfo.setInfo.type}
                                itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                                onValueChange={value => {
                                    routinesDispatch(prev => {
                                        const x = prev.editRoutine.info[name][ssi].setInfo;
                                        x.type = value;
                                        if(value === 'Timed'){
                                            x.sets = x.sets.map(_ => ({minutes: 1, seconds: 0}))
                                        }
                                        else if(value === 'Normal')
                                            x.sets = x.sets.map(_ => 5);

                                        return prev;
                                    })
                                }}
                            >
                                {
                                    //fuck you only normal and timed
                                    ['Normal', 'Timed'].map(item =>
                                        <Picker.Item
                                            key={item} color={'white'} label={'' + item} value={item}
                                            style={{}} />)
                                }
                            </Picker>


                            {
                                subInfo.setInfo.type === 'Normal' &&//this doesn't do shit
                                <View>
                                    <Text>AMRAP Last Set:</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={subInfo.amrap ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => {}}
                                        value={subInfo.amrap}
                                    />
                                </View>
                            }
                        </View>

                    })
                }
            </View>

            <View>
                <TouchableOpacity
                    style={{
                        margin: 5,
                        height: 30,
                        width: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 15,
                        borderWidth: 3,
                        borderColor: 'red'
                    }}
                    onPress={() => {
                        routinesDispatch(prev => {
                            const x = prev.editRoutine.info[name];
                            x.forEach(sub =>
                                sub.setInfo.sets.splice(sub.setInfo.sets.length-1)
                            );

                            return prev;
                        });

                    }}>
                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>-</Text>
                </TouchableOpacity>
                {
                    //the only trick here is that the sets have to be the same
                    //you're really gonna need that index
                    //ssi is subset index
                    info.map((subInfo, ssi) => {
                        return <View>

                            {
                                //this should actually be very similar to custom workout screen
                                subInfo.setInfo.type === 'Normal' &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {
                                        subInfo.setInfo.sets.map((v, index) =>

                                            <View key={index} style={styles.circle}>
                                                <Picker
                                                    style={{ width: 50, height: 50 }}
                                                    selectedValue={v}
                                                    itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                                                    onValueChange={(value) => {
                                                        routinesDispatch(prev => {
                                                            const x = prev.editRoutine.info[name][ssi].setInfo.sets;
                                                            for(let i = index; i < x.length; i++)
                                                                x[i] = value;
                                                            return prev;
                                                        })
                                                        //how the fuck
                                                        //would defeinitely be a good idea to set all following sets to current rep
                                                    }}
                                                >
                                                    {
                                                        reps.map(item =>
                                                            <Picker.Item
                                                                key={item} color={'white'} label={'' + item}
                                                                value={item} style={{}}
                                                            />)
                                                    }
                                                </Picker>
                                            </View>
                                        )
                                    }
                                </View>
                            }
                            {
                                //maybe we can combine this with normal?
                                //ive added timeSets in this, seems like we need to add it somehwere else
                                subInfo.setInfo.type === 'Timed' &&
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>{
                                    //dont forget to add this shit to exercise editor
                                    subInfo.setInfo.sets.map((v, index) =>
                                        <View>
                                            <NumericSelector onChange={(value) => {
                                                rd(ssi + '.setInfo.sets.' + index + '.minutes', value);
                                            }} numInfo={{ def: subInfo.setInfo.sets[index].minutes, min: 0, max: 59, increment: 1 }} />
                                            <Words>:</Words>
                                            <NumericSelector onChange={(value) => {
                                                rd(ssi + '.setInfo.sets.' + index + '.seconds', value);

                                            }} numInfo={{ def: subInfo.setInfo.sets[index].seconds, min: 0, max: 55, increment: 5 }} />
                                        </View>
                                    )
                                }</View>
                            }
                        </View>
                    })
                }

                <TouchableOpacity
                    style={{
                        margin: 5,
                        height: 30,
                        width: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 15,
                        borderWidth: 3,
                        borderColor: 'green'
                    }}
                    onPress={() => {
                        routinesDispatch(prev => {
                            const x = prev.editRoutine.info[name];
                            x.forEach(sub => {
                                const y = sub.setInfo.sets;
                                if(y.length === 0){
                                    //wow this is dumb
                                    if(sub.setInfo.type === 'Normal')
                                        y.push(5);
                                    else if(sub.setInfo.type === 'Timed')
                                        y.push({minutes: 1, seconds: 0});
                                }

                                else if (y.length <= 12){
                                    if (sub.setInfo.type === 'Normal')
                                        y.push(y[y.length - 1]);
                                    else if (sub.setInfo.type === 'Timed')
                                        y.push({...y[y.length - 1]});
                                }

                            })
                            return prev;
                        })
                    }}
                >
                    <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
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

export default SupersetEditor;
