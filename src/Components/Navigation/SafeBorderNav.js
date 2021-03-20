import React from 'react';
import { SafeAreaView } from 'react-native';
import { BACKGROUND, PRIMARY } from '../../Style/Colors';
import NavBar from './NavBar';
//not really sure what to call this but I use this a lot


const SafeBorderNav = props => {
    return <>
        <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
        <SafeAreaView style={{backgroundColor: BACKGROUND, flex: 1}}>{
            props.children
        }
            <NavBar current={props.screen}/>
        </SafeAreaView>
    </>
};

export default SafeBorderNav;
