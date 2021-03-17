import {View} from 'react-native';
import Words from '../Simple/Words';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Row from '../Simple/Row';
import Ionicons from 'react-native-vector-icons/Ionicons';

//this is acutally pretty complex logic regarding the color of the trophy,
// as well as determining where to navigate to (gym vs personal vs region)

const TrophyVisual = (props) => {
    const navigation = useNavigation();
    const {trophy} = props;

    const {rank, type, targetID} = trophy;

    //gold, silver, bronze
    //should I have diamond too?
    let color = '#453519';
    if(rank === 0)
        color =  '#d9a952';
    else if(rank === 1)
        color =  '#9d9d9d';
    else if(rank === 2)
        color =  '#725626';

    const handlePress = () => {
        if(type === 'personal')
            navigation.navigate('profile', { userId: targetID});
        else if(type === 'gym')
            //coming soon!
            navigation.navigate('gym', { gymID: targetID});
        else if(type === 'region')
            navigation.navigate('region', {regionID: targetID});
    };

    let wording;

    if(type === 'personal')
        wording = `Ranked ${rank+1} of ${targetID}'s efforts`;
    else if(type === 'gym')
        wording = `Ranked ${rank+1} in the gym`;//should we actually get the gym name?
    else if(targetID === 'earth')
        wording = `Ranked ${rank+1} in the world`;
    else if(type === 'region')
        wording = `Ranked ${rank+1} in the ${targetID} region`;

    return (
        <TouchableOpacity onPress={handlePress} style={{height: 40}}>
            <Row>
                <Words><Ionicons name={'trophy'} color={color}/></Words>
                <Words>{wording}</Words>
            </Row>
        </TouchableOpacity>
    );
};

export default TrophyVisual;
