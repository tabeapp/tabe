import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState} from 'react';
import NumericSelector from '../Components/Routine/NumericSelector';
import DaysEditor from '../Components/Routine/DaysEditor';
import ExerciseEditor from '../Components/Routine/ExerciseEditor';
import RepSchemeEditor from '../Components/Routine/RepSchemeEditor';
import { RoutinesContext } from '../Contexts/RoutinesProvider';
import { FULL_COPY } from '../Utils/UtilFunctions';
import Words from '../Components/Simple/Words';
import Write from '../Components/Simple/Write';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { STYLES } from '../Style/Values';
import { REST_DAY } from '../Constants/Symbols';
import { API, graphqlOperation } from 'aws-amplify';
import { UserContext } from '../Contexts/UserProvider';
import { createRoutine, updateRoutine } from '../../graphql/mutations';
import { PRIMARY } from '../Style/Theme';
import Flip from '../Components/Simple/Flip';
import WorkoutsDisplay from '../Components/Routine/WorkoutsDisplay';

//so this isn't for setting up the routine with weights,
// this is for editing the routine nearly any way you want
//the only trick is putting it in a nice formattable way

const RoutineEditScreen = props => {
    const {username} = useContext(UserContext);
    //this is used more than you'd think

    const newSchemeCode = () => {
        let code = Object.keys(customSets).sort().reverse()[0] || '@';
        return String.fromCharCode(code.charCodeAt(0)+1);
    };

    const {editRoutine} = useContext(RoutinesContext);
    //consider making an edit routine dispatch just for editRoutine, this is annoying
    const {routinesDispatch} = useContext(RoutinesContext);
    //maybe i can do this shortcut?
    const rd = (path, value) => routinesDispatch({path: 'editRoutine.' + path, value});

    //can i do this?
    const {title, time, info, workouts, days, failure, customScheme, customSets, currentDay, nextWorkoutTime, id} = editRoutine;

    //this will allow for a much MUCH cleaner edit experience
    const [advanced, setAdvanced] = useState(false);

    //why the fuck is this one fine while the others go crazy
    //useeffects still coming back to haunt me
    useEffect(() => {
        routinesDispatch(prev => {
            if(prev.editRoutine.days.length !== prev.editRoutine.time)
                prev.editRoutine.days = Array.from(new Array(time), () => REST_DAY);
            return prev;
        });
    }, []);

    const saveRoutine = () => {
        //this is copied over, it's the save process
        const newRoutine = FULL_COPY(editRoutine);
        newRoutine.currentDay = currentDay || 0;
        newRoutine.nextWorkoutTime = nextWorkoutTime || new Date().getTime();

        Object.keys(newRoutine.info).forEach(ex => {
            const x = newRoutine.info[ex].progress;
            if(!x.countdown)
                x.countdown = x.rate;

            //i don't know why this isn't correctly handled by the exercise editor
            const y = newRoutine.info[ex].setInfo;
            if(y.type === 'Custom' && !y.selector)
                y.selector = 0;
        });

        //dont worry about routines dispatch, the subscription should update it
        //no that's a bad idea
        //send this to routines dispatch as a custom action
        //existing
        //if(id){
        if(!id){
            API.graphql(graphqlOperation(createRoutine, {
                input: {
                    routine: JSON.stringify(newRoutine),
                    title: newRoutine.title,
                    current: 0,
                    userID: username
                }
            }))
        }
        else{
            API.graphql(graphqlOperation(updateRoutine, {
                input: {
                    id: id,
                    routine: JSON.stringify(newRoutine),
                    title: newRoutine.title,
                }
            }))
        }

        props.navigation.navigate('routine');
    };


    return (
        <SafeBorder>
            <TopBar
                leftText='Discard' title='Routine Editor'
                onPressLeft={() =>
                    props.navigation.navigate('routine')
                }
                rightText='Save'
                //rewriting this part to save to aws
                onPressRight={saveRoutine}
            />
            <ScrollView style={STYLES.box}>
                <Words>Advanced Editor</Words>
                <Flip
                    onChange={setAdvanced}
                    value={advanced}
                />
                <Write
                    style={{fontSize: 40, fontWeight: 'bold'}}
                    value={title}
                    onChange={v => rd('title', v)}
                />
                <Row style={styles.section}>
                    <Words style={{fontSize: 20}}>Cycle length in days: </Words>
                    <NumericSelector
                        onChange={v =>
                            //that's fucking it, useEffect completely suks
                            routinesDispatch(prev => {
                                prev.editRoutine.time = v;
                                prev.editRoutine.days = Array.from(new Array(v), () => REST_DAY);
                                return prev;
                            })
                        }

                        numInfo={{def: time, min: 7, max: 56, increment: 7}}/>
                </Row>

                {/*shoud this be towards the bottom
                        or towards the top as it applies to all exercises?*/}
                {
                    advanced &&
                    <View style={styles.section}>
                        <Words style={{fontSize: 30}}>Failure Behavior:</Words>
                        <View style={styles.slot}>
                            <Words style={{fontSize: 20}}>Deload %</Words>
                            <NumericSelector
                                onChange={v => rd('failure.deloadPercent', v)}
                                numInfo={{def: failure.deloadPercent, min: 0, max: 50, increment: 5}}
                            />
                        </View>
                        <View style={styles.slot}>
                            <Words style={{fontSize: 20}}>after failed sets</Words>
                            <NumericSelector
                                onChange={v => rd('failure.after', v)}
                                numInfo={{def: failure.after, min: 1, max: 5, increment: 1}}
                            />
                        </View>
                    </View>
                }

                <Words style={{fontSize: 40}}>Workouts</Words>
                <WorkoutsDisplay workouts={workouts} info={info} advanced={advanced}/>


                <Words style={{fontSize: 40}}>Exercises</Words>
                <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>{
                    //definitely the trickiest of all
                    //editing exercises involves much of the state, so I've just added them
                    Object.entries(info).map(([k,v]) =>
                        <ExerciseEditor
                            key={k}
                            advanced={advanced}
                            name={k} info={v}
                        />
                    )
                }
                </ScrollView>

                {
                    advanced && customScheme &&
                    <>
                        <Words style={{fontSize: 40}}>Custom Rep Scheme</Words>
                        <Words>(workouts using this scheme will cycle through the following sets)</Words>
                        <ScrollView pagingEnabled style={styles.scroller} horizontal={true}>
                            {
                                Object.entries(customSets).map(([k,v]) =>
                                    <RepSchemeEditor key={k} sets={v} name={k} />
                                )
                            }
                            <View style={{justifyContent: 'center', height: 200, margin: 3, width: 406, backgroundColor: '#333'}}>
                                <TouchableOpacity style={STYLES.textButton} onPress={() => {
                                    //this actually works
                                    rd('customSets.' + newSchemeCode(), []);
                                    console.log(JSON.stringify(customSets))
                                }}>
                                    <Words style={{fontSize: 30}}>Add Custom Scheme</Words>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>
                }

                <Words style={{color:'white', fontSize: 40}}>Days</Words>
                <DaysEditor workouts={Object.keys(workouts)} days={days}/>

                <View style={{height: 25/*for the red button*/}}/>
            </ScrollView>
        </SafeBorder>
    );
};

const styles = StyleSheet.create({
    scroller: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        borderStyle: 'solid',
    },
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        //alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        //justifyContent: 'center',
    },
    section: {
        borderColor: PRIMARY,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    slot: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default RoutineEditScreen;
