import Words from '../Simple/Words';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Row from '../Simple/Row';
import TrophyIcon from '../../Utils/TrophyIcon';

//this is acutally pretty complex logic regarding the color of the trophy,
// as well as determining where to navigate to (gym vs personal vs region)

const TrophyVisual = (props) => {
    const navigation = useNavigation();
    const {trophy, exercise} = props;

    const {rank, type, targetID, name} = trophy;

    //gold, silver, bronze
    //should I have diamond too?

    const handlePress = () => {
        //honestly, loading the users progress graph would be cool
        if(type === 'personal')
            navigation.navigate('profile', {userID: targetID});
        else if(type === 'gym')
            //coming soon!
            navigation.navigate('leaderboard', {gymID: targetID, exercise: exercise});
        else if(type === 'region')
            navigation.navigate('leaderboard', {regionID: targetID, exercise: exercise});
    };

    let wording;

    if(type === 'personal')
        wording = `Ranked ${rank+1} of ${targetID}'s efforts`;
    else
        wording = `Ranked ${rank+1} in ${name}`;

    return (
        <TouchableOpacity onPress={handlePress} style={{height: 40}}>
            <Row>
                <Words><TrophyIcon rank={rank}/></Words>
                <Words>{wording}</Words>
            </Row>
        </TouchableOpacity>
    );
};

export default TrophyVisual;
