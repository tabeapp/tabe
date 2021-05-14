import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Words from '../Simple/Words';
import { BACKGROUND, PRIMARY, PRIMARY_DARKER } from '../../Style/Colors';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../Contexts/UserProvider';
import WorkoutButton from './WorkoutButton';

const routes = [
    'home',
    'explore',
    'workout',
    'routine',
    'profile',
];

const iconMapping = {
    home: 'home',
    explore: 'search',
    workout: 'barbell',
    routine: 'reload',
    profile: 'person',
};

const NavBar = props => {
    const {username} = useContext(UserContext);

    const navigation = useNavigation();

    const currentPage = props.current;
    const handlePress = (r) => {
        if (r === currentPage)
            return;

        if (r === 'workout')
            navigation.navigate(r);
        else if (r === 'profile'){
            navigation.replace(r, {userID: username})
        }

        else
            navigation.replace(r);
    };

    return (<View style={styles.navBar}>{
        routes.map(r => {
            let icon = iconMapping[r];
            if (r !== currentPage)
                icon += '-outline'

            if (r === 'workout') {
                return <WorkoutButton key={r}/>
            }

            return (<TouchableOpacity style={styles.button} key={r} onPress={() => handlePress(r)}>
                <Words>
                    <Ionicons name={icon} color={'white'} size={40}/>
                </Words>
            </TouchableOpacity>); })
    }</View>);
};
//needs to be placed in safeareaview and view with flex:1
const styles = StyleSheet.create({
    navBar: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: BACKGROUND,
        justifyContent: 'space-around',
        borderColor: PRIMARY_DARKER,
        borderTopWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
});

export default NavBar;
