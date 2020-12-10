import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { PRIMARY } from '../Constants/Theme';
import Ionicons from "react-native-vector-icons/Ionicons";

const routes = [
    'home',
    'explore',
    'workout',
    'routines',
    'profile'
];

const iconMapping = {
    home: 'home',
    explore: 'search',
    workout: 'barbell',
    routines: 'reload',
    profile: 'person'
}

const NavBar = props => {
    const {current} = props;
    return (<View style={styles.navBar}>{
        routes.map(r => {
            let icon = iconMapping[r];
            if(r !== current)
                icon += '-outline';

            if(r === 'workout') {
                return (<TouchableOpacity key={r} onPress={() => props.navigation.navigate(r)}>
                    <Text>
                        <Ionicons name={icon} color={'red'} size={50} />
                    </Text>
                </TouchableOpacity>);
            }


            return (<TouchableOpacity key={r} onPress={() => props.navigation.navigate(r)}>
                <Text>
                    <Ionicons name={icon} color={'white'} size={40}/>
                </Text>
            </TouchableOpacity>);
        })
    }</View>);
}
const styles = StyleSheet.create({
    navBar: {
        height: 100,
        bottom: -40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
});

export default NavBar;
