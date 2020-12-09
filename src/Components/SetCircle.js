import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SetCircle = (props) => {
    return (<View style={{
        ...styles.circle,
        ...props.style
    }}>
        <Text style={{ color: 'white' }}>{
            props.text
        }</Text>
    </View>);
};

const styles = StyleSheet.create({
    circle: {
        width:50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid'
    },
});

export default SetCircle;
