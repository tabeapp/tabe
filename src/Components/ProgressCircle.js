import React from 'react';
import {View, StyleSheet} from 'react-native';
/**
 * Override styles that get passed from props
 **/
const propStyle = (percent) => {
    const base_degrees = -135;
    const rotateBy = base_degrees + (percent * 3.6);
    return {
        transform:[{rotateZ: `${rotateBy}deg`}]
    };
};

const ProgressCircle = ({percent}) => {
    let stylesFromProps = propStyle(percent);
    return(
        <View style={styles.container}>
            <View style={[styles.progressLayer, stylesFromProps]}></View>
            <View style={styles.offsetLayer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
        transform:[{rotateZ: '-135deg'}]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'grey',
        borderTopColor: 'grey',
        transform:[{rotateZ: '-135deg'}]
    }
});

export default ProgressCircle;
