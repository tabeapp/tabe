import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * Override styles that get passed from props
 **/
const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + (percent * 3.6);
    return {
        transform:[{rotateZ: `${rotateBy}deg`}]
    };
};

const renderThirdLayer = (percent) => {
    if(percent > 50){
        /**
         * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
         * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
         * before passing to the propStyle function
         **/
        return <View style={[styles.secondProgressLayer,propStyle((percent - 50), 45) ]}></View>
    }else{
        return <View style={styles.offsetLayer}></View>
    }
}

const colorA = 'red';
const colorB = 'black';

const ProgressCircle = props => {
    const {percent} = props;
    let firstProgressLayerStyle;
    if(percent > 50){
        firstProgressLayerStyle = propStyle(50, -135);
    }else {
        firstProgressLayerStyle = propStyle(percent, -135);
    }

    return(
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(percent)}
            {props.children}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'black',
        borderColor: colorB,
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstProgressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colorA,
        borderTopColor: colorA,
        transform:[{rotateZ: '-135deg'}]
    },
    secondProgressLayer:{
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colorA,
        borderTopColor: colorA,
        transform: [{rotateZ: '45deg'}]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colorB,
        borderTopColor: colorB,
        transform:[{rotateZ: '-135deg'}]
    }
});

export default ProgressCircle;
