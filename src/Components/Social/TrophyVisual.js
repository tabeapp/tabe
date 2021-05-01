import Words from '../Simple/Words';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Row from '../Simple/Row';
import TrophyIcon from '../../Utils/TrophyIcon';
import { View } from 'react-native';
import { BACKGROUND } from '../../Style/Colors';

//this is acutally pretty complex logic regarding the color of the trophy,
// as well as determining where to navigate to (gym vs personal vs region)

const TrophyVisual = (props) => {
    const navigation = useNavigation();
    const {trophy, exercise, orm} = props;

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

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{height: 50, justifyContent: 'center'}}
        >
            <Row style={{justifyContent: 'flex-start', height: '100%', borderColor: BACKGROUND, borderTopWidth: 1 }} >
                <Words style={{paddingHorizontal: 10}}><TrophyIcon rank={rank}/></Words>
                <View>
                    <Words>{type==='personal'? targetID: name}</Words>
                    <Words>#{rank+1} - {orm}lb ORM</Words>
                </View>
            </Row>
        </TouchableOpacity>
    );
};

export default TrophyVisual;
