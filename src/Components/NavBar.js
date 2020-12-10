import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { PRIMARY } from '../Constants/Theme';
import Ionicons from "react-native-vector-icons/Ionicons";

const routes = [
    'home',
    'explore',
    'workout',
    'routine',
    'profile'
];

const iconMapping = {
    home: 'home',
    explore: 'search',
    workout: 'barbell',
    routine: 'reload',
    profile: 'person'
}

const NavBar = props => {
    const {current} = props;
    const handlePress = (r) => {
        if(r === current)
           return;

        props.navigation.navigate(r);
    }

    return (<View style={styles.navBar}>{
        routes.map(r => {
            let icon = iconMapping[r];
            if(r !== current)
                icon += '-outline';

            if(r === 'workout') {
                return (<TouchableOpacity style={styles.workoutButton} key={r} onPress={() => handlePress(r)}>
                    <Text>
                        <Ionicons name={icon} color={'white'} size={50} />
                    </Text>
                </TouchableOpacity>);
            }

            return (<TouchableOpacity style={styles.button} key={r} onPress={() => handlePress(r)}>
                <Text>
                    <Ionicons name={icon} color={'white'} size={40}/>
                </Text>
            </TouchableOpacity>); })
    }</View>);
}
const styles = StyleSheet.create({
    //kinda squishes the other buttons, but whatever
    workoutButton:{
        backgroundColor: 'red',
        height: 80,
        width: 80,
        bottom: 10,
        //this
        marginHorizontal: -10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2
    },
    button:{
    },
    navBar: {
        //borderWidth: 1,
        //borderColor: 'red',
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default NavBar;
