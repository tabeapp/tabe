import React from 'react';
import GymMap from '../Components/Map/GymMap';
import { Pressable, SafeAreaView, View } from 'react-native';
import Words from '../Components/Simple/Words';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TEXT_COLOR } from '../Style/Colors';

//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const GymMapScreen = props => {
    return (
        <>
            <GymMap/>
            <SafeAreaView>
                <View>
                    <Pressable
                        onPress={() => props.navigation.goBack()}
                        style={{position: 'absolute', left: 15}}
                    >
                        <Words><Ionicons name='chevron-back' color={TEXT_COLOR} size={30}/></Words>
                    </Pressable>


                    <Words style={{alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>Gym Map</Words>
                </View>
            </SafeAreaView>
        </>
    );
};


export default GymMapScreen;
