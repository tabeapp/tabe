import { SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import NavBar from '../Components/NavBar';
import { PRIMARY } from '../Constants/Theme';
import WeightVisual from "../Utils/WeightVisual";
import Words from "../Components/Words";
import SafeBorder from "../Components/SafeBorder";
import SafeBorderNav from "../Components/SafeBorderNav";
import TopBar from "../Components/TopBar";
import Row from "../Components/Row";
import { STYLES } from "../Style/Values";

const liftMapping = {
    squat: 'orange',
    deadlift: 'red',
    bench: 'green',
    press: 'blue'
}

const ProfileScreen = props => {
    //fuck it, we'll just do it straight from this without using the context
    const [progress, setProgress] = useState([]);
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        //console.log('reloading progress ' + JSON.stringify(progress));
        AsyncStorage.getItem('@progress').then(val =>{

            setProgress(JSON.parse(val));
        });

        //better hope this is present, lol
        AsyncStorage.getItem('@userStats').then(val => {
            setUserStats(JSON.parse(val));
        });
    }, []);

    let timeStart = 0, timeEnd = 1, weightStart = 0, weightEnd = 1;
    if(progress[0]){
        timeStart = progress.reduce((min, p) => p.time < min ? p.time : min, progress[0].time);
        timeEnd = progress.reduce((max, p) => p.time > max ? p.time : max, progress[0].time);

        //this ones too copmlex to reduce
        progress.forEach(wo => {
            Object.values(wo.stats).forEach(weight => {
                if(weight > weightEnd)
                    weightEnd = weight
            })
        });


    }

    console.log(timeEnd-timeStart);
    console.log(weightEnd-weightStart);


    return (
        <SafeBorderNav {...props} screen={'profile'}>
            <TopBar title='Zyzz'/>
            <View style={STYLES.body}>
                <View style={styles.cardContainer}>{
                    Object.entries(userStats).map(([k,v]) =>
                        <View style={{...STYLES.card, width: '100%', height: 120}} key={k}>

                            <View style={{ height: 50, flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <WeightVisual weight={v} reverse={true} />
                                <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Words>{k}</Words>
                                    <Words>{v}</Words>
                                </Row>
                                <WeightVisual weight={v}/>
                            </View>
                        </View>

                    )
                }</View>
                <View style={{height: 100, width: '50%', padding: 5, borderColor: PRIMARY, borderWidth: 1}}>{
                    progress[0]&&
                    progress.map(wo => {
                        return Object.entries(wo.stats).map(([k,v]) => {
                            //lol should I make this a <canvas>
                            const x = Math.round((wo.time-timeStart)/(timeEnd-timeStart)*100)+'%';
                            const y = Math.round((v-weightStart)/(weightEnd-weightStart)*100)+'%';
                            const color = liftMapping[k];
                            return <View style={{position: 'absolute', left: x, bottom: y, backgroundColor: color, height: 5, width:5}} key={wo.time+k}/>
                        })
                    })
                }</View>
            </View>
        </SafeBorderNav>
    );
};

const styles = StyleSheet.create({
    cardContainer: {height: 500, width: '100%', alignItems: 'center', justifyContent: 'center', margin: 5},
});

export default ProfileScreen;
