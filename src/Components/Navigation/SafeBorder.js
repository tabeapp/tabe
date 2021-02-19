import React from 'react';
import { SafeAreaView } from 'react-native';
import { PRIMARY } from '../../Style/Theme';
//not really sure what to call this but I use this a lot


const SafeBorder = props => {
    return <>
        <SafeAreaView style={{backgroundColor: PRIMARY, flex: 0}}/>
        <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>{
            props.children
        }</SafeAreaView>
    </>
};

export default SafeBorder;
