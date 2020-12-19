import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import NumericSelector from './NumericSelector';
import Words from './Words';
import { Picker } from '@react-native-picker/picker';

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah this is a copy of exercvise editor
//so we still have access to props.editInfo
const SupersetEditor = props => {
    //ugh this sucks
    const {name, info, deleteExercise} = props;

    //
    //if(name.includes('/'))
        //return <SupersetEditor {...props}/>

    const subExercises = name.split('/');

    //i guess the width is 400?
    //there's gotta be a more programmatic way to do this
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
                    //info will be an array of info objects in the case of superset
                    info.map(subInfo => {
                        return <View>
                            <Text>Current Working Weight: </Text>
                            <NumericSelector onChange={() => {}} numInfo={{def:subInfo.current, min: 0, max: 995, increment: 5}}/>


                            <Text>Progression:</Text>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Words>Add</Words>
                                <NumericSelector onChange={() => {}} numInfo={{def:subInfo.progress.amount, min: 0, max: 25, increment: 2.5}}/>
                                <Words>lb every</Words>
                                <NumericSelector onChange={() => {}} numInfo={{def:subInfo.progress.rate, min: 1, max: 10, increment: 1}}/>
                                <Words>times the workout is done</Words>
                            </View>
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
                {
                    //you're really gonna need that index
                    info.map((subInfo, index) => {
                        return <View>
                            <Text>Sets:</Text>
                            <Words>Set Type:</Words>
                            <Picker
                                style={{ width: 100, height: 50 }}
                                selectedValue={subInfo.setInfo.type}
                                itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                                onValueChange={value => {
                                    props.editInfo(prev => {
                                        const next = { ...prev[props.name] };
                                        next.setInfo.type = value;
                                        return { ...prev, [props.name]: next };
                                    });
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
                                //this should actually be very similar to custom workout screen
                                subInfo.setInfo.type === 'Normal' &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
                                            //k is replaced by props.name
                                            props.editInfo(prev => {
                                                const next = { ...prev[props.name] };
                                                next.setInfo.sets.splice(next.setInfo.sets.length - 1);
                                                return { ...prev, [props.name]: next };
                                            });

                                        }}>
                                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>-</Text>
                                    </TouchableOpacity>
                                    {
                                        subInfo.setInfo.sets.map((v, index) =>

                                            <View key={index} style={styles.circle}>
                                                <Picker
                                                    style={{ width: 50, height: 50 }}
                                                    selectedValue={v}
                                                    itemStyle={{ fontSize: 20, borderRadius: 0, height: 50 }}
                                                    onValueChange={(value) => {
                                                        //how the fuck
                                                        //would defeinitely be a good idea to set all following sets to current rep
                                                        props.editInfo(prev => {
                                                            const next = { ...prev[props.name] };
                                                            next.setInfo.sets[index] = value;
                                                            for (let i = index; i < next.setInfo.sets.length; i++)
                                                                next.setInfo.sets[i] = value;
                                                            return { ...prev, [props.name]: next };
                                                        });
                                                    }}
                                                >
                                                    {
                                                        reps.map(item =>
                                                            <Picker.Item key={item} color={'white'} label={'' + item}
                                                                         value={item}
                                                                         style={{}} />)
                                                    }
                                                </Picker>
                                            </View>
                                        )
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
                                            props.editInfo(prev => {
                                                const next = { ...prev[props.name] };
                                                if (next.setInfo.sets.length <= 12)
                                                    next.setInfo.sets.push(next.setInfo.sets[next.setInfo.sets.length - 1])
                                                return { ...prev, [props.name]: next };
                                            })
                                        }}>
                                        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 15, }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                subInfo.setInfo.type === 'Timed' &&
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <NumericSelector onChange={(value) => {
                                        props.editInfo(prev => {
                                            const next = { ...prev[props.name] };
                                            next.setInfo.minutes = value;
                                            return { ...prev, [props.name]: next };
                                        });
                                    }} numInfo={{ def: subInfo.setInfo.minutes, min: 0, max: 59, increment: 1 }} />
                                    <Words>:</Words>
                                    <NumericSelector onChange={(value) => {
                                        props.editInfo(prev => {
                                            const next = { ...prev[props.name] };
                                            next.setInfo.seconds = value;
                                            return { ...prev, [props.name]: next };
                                        });

                                    }} numInfo={{ def: subInfo.setInfo.seconds, min: 0, max: 55, increment: 5 }} />
                                </View>
                            }
                        </View>
                    })
                }
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
