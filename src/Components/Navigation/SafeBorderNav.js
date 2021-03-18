import React from 'react';
import { SafeAreaView } from 'react-native';
import { PRIMARY } from '../../Style/Theme';
import NavBar from './NavBar';
//not really sure what to call this but I use this a lot


const SafeBorderNav = props => {
    return <>
        <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>{
            props.children
        }
            <NavBar current={props.screen}/>
        </SafeAreaView>
    </>
};

export default SafeBorderNav;
