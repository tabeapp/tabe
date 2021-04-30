import React, { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import NumericSelector from '../Components/Routine/NumericSelector';
import Words from '../Components/Simple/Words';
import { WorkoutContext } from '../Contexts/WorkoutProvider';
import { RoutinesContext } from '../Contexts/RoutinesProvider';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Row from '../Components/Simple/Row';
import { DARK_GRAY } from '../Style/Colors';

const repNumbers = {
    def: 1,
    min: 1,
    max: 10,
    increment: 1
};

//this screen is used to input prs and bulid a custom routine based on another
const RoutineSetupScreen = props => {
    const {generateRoutine} = useContext(RoutinesContext);
    const {createWorkout} = useContext(WorkoutContext);

    //the object will be sent
    let loadRoutine = props.route.params.routine;

    //this will be sent on navigation
    //routinechosen = props.route.params.routine
    //switch (props.route.params.routine) {
    //case "reload":
    //
    //}

    //const loadRoutine = FiveThreeOneDefault;

    const idk = Object.entries(loadRoutine.info).map(([k,v]) => ({
        name: k,
        reps: 1,
        weight: v.current
    })).filter(i => !i.name.includes('.ez'));

    const [maxEfforts, setMaxEfforts] = useState(idk);

    const handleNext = async () => {
        //generate a routine we're gonna do this in the contextprovider
        await generateRoutine(loadRoutine, maxEfforts);

        createWorkout();
        //start the workout
        //navigate('workout')
        props.navigation.navigate('workout');
    };

    //this feels really fucking convoluted
    const updateRep = (ex, reps) => {
        setMaxEfforts(maxEfforts.map(e => {
            if(e.name === ex)
                return {...e, reps};
            return e;
        }));
    };

    //this can't be right
    const updateWeight = (ex, weight) => {
        setMaxEfforts(maxEfforts.map(e => {
            if(e.name === ex)
                return {...e, weight};
            return e;
        }));
    };

    return (
        <SafeBorder>
            <TopBar
                leftText='Back' title='Routine Setup' right='Begin'
                    onPressRight={handleNext}
            />
            <ScrollView>{
                maxEfforts.map(ex =>
                    <View key={ex.name} style={{backgroundColor: DARK_GRAY, padding: 5, margin: 4, borderRadius: 15, width: '98%'}}>
                        <Words style={{fontSize: 20}}>{ex.name}</Words>
                        <Row style={{justifyContent: 'space-around', height: 90}}>
                            <Words style={{fontSize: 20}}>Enter Max Effort:</Words>

                            <NumericSelector onChange={reps => updateRep(ex.name, reps)} numInfo={repNumbers}/>

                            <Words style={{fontSize: 20}}>x</Words>

                            <NumericSelector onChange={weight => updateWeight(ex.name, weight)} numInfo={{def: ex.weight, min: 0, max: 1000, increment: 5}}/>
                        </Row>
                    </View>
                )
            }</ScrollView>
        </SafeBorder>
    );
};

export default RoutineSetupScreen;
