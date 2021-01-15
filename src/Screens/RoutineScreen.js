import { TouchableOpacity, SafeAreaView, StyleSheet, View } from "react-native";
import React, {useContext} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import Words from "../Components/Words";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoutinesContext from "../Contexts/RoutinesContext";
import { BLANK_ROUTINE } from "../Constants/DefaultRoutineInfo";
import { FULL_COPY } from "../Utils/UtilFunctions";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";

//this is for choosing a routine to edit, instead of jumping right in
const RoutineScreen = props => {
    //const [current, setCurrent] = useState('');
    /*const [routines, setRoutines] = useState([]);

    //the routines will be saved under @routines
    //there may be multiple
    //the current routine will be @currentroutine
    useEffect(() => {
        AsyncStorage.getItem('@routines').then(obj => {
            if(obj === null)
                setRoutines([]);
            else{
                const r = JSON.parse(obj);
                setRoutines(r.routines);
                setCurrent(r.current);
            }
        });

    }, []);*/
    const {routines,current} = useContext(RoutinesContext).routines;
    const {routinesDispatch} = useContext(RoutinesContext);


    //get the context done rn, and just hold on to a list of routines in the state

    //should i have another fucking context for this
    //maybe i should, cuz it needs to reload before it sees new routines
    //yes this is exactly it
    //or ill say fuck it and have this be its own context
    //optimize this later once you figure out how to have multiple contexts

    const deleteRoutine = k => {
        //should probably have a warning, lol
        routinesDispatch(prev => {
            delete prev.routines[k];
            return prev;
        });
        //not a fan, but this should be a rare operation
        routinesDispatch({type: 'setItem'})//so save the thing
    }

    //again we have to fucking update the @rouintes
    const handleSetCurrent = k => {
        //setCurrent(k);
        routinesDispatch({path: 'current', value: k});

        //AsyncStorage.getItem('@routines').then(obj => {
        //if(obj === null)
        //return;
        //const r = JSON.parse(obj);
        //r.current = k;
        routinesDispatch({type: 'setItem'})//so save the thing
        //AsyncStorage.setItem('@routines', JSON.stringify(r));
        //})

    }

    return (
        <SafeBorderNav {...props} screen={'routine'}>
            <TopBar title='Routines'/>
            <View style={styles.box}>
                <View style={{width: '100%', alignItems: 'center'}}>
                    {
                        Object.entries(routines).map(([k,v]) =>
                            <TouchableOpacity
                                key={k}
                                onPress={() => {
                                    //set it in the context
                                    routinesDispatch({path: 'editRoutine', value: FULL_COPY(v)});
                                    /*send it off to routine editor*/
                                    props.navigation.navigate('routineedit');
                                }}
                                style={{width: '95%', backgroundColor: '#333', padding: 10, margin: 4, borderRadius: 20, height: 100}}
                            >
                                <Words style={{fontSize: 20}}>{
                                    v.title
                                }</Words>
                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    deleteRoutine(k);//
                                }}>
                                    <Words><Ionicons color={'gray'} size={30} name={'close'}/></Words>
                                </TouchableOpacity>

                                <TouchableOpacity style={{width: 50 }} onPress={() => {
                                    handleSetCurrent(k)
                                }}>
                                    <Words>
                                        Current:
                                        {
                                            k === current &&
                                            <Ionicons color={'green'} size={30} name={'checkbox'}/>
                                        }
                                        {
                                            k !== current &&
                                            <Ionicons color={'gray'} size={30} name={'checkbox-outline'}/>
                                        }
                                    </Words>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <TouchableOpacity  onPress={() => {
                    routinesDispatch({path: 'editRoutine', value: BLANK_ROUTINE()});

                    props.navigation.navigate('routineedit');
                    //routine: emptyRoutine, // no this will be set in the context
                    //saveRoutine: saveRoutine no this will be available in the context
                    //})
                }}>
                    <Words style={{fontSize: 40}}>+</Words>
                </TouchableOpacity>

            </View>
        </SafeBorderNav>
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
    },
});
export default RoutineScreen;
