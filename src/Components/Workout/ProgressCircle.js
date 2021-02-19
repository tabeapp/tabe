import React from 'react';
import {View, StyleSheet} from 'react-native';

/**
 * Override styles that get passed from props
 **/
const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + (percent *100 * 3.6);
    return {
        transform:[{rotateZ: `${rotateBy}deg`}]
    };
};

const renderThirdLayer = (percent) => {
    const hue =((percent)*120).toString(10);
    const colorC = ["hsl(",hue,",100%,50%)"].join("");
    if(percent > 0.5){
        /**
         * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
         * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
         * before passing to the propStyle function
         **/
        return <View style={[styles.secondProgressLayer,propStyle((percent - 0.5), 45), {borderTopColor: colorC, borderRightColor: colorC} ]}/>
    }else{
        return <View style={styles.offsetLayer}/>
    }
}

const colorB = 'black';

const width = 10;

//consider using svg
const ProgressCircle = props => {
    const percent = props.ratio

    const hue = ((percent)*120).toString(10);
    const colorC = ["hsl(",hue,",100%,50%)"].join("");

    let firstProgressLayerStyle;
    if(percent > 0.5){
        firstProgressLayerStyle = propStyle(0.5, -135);
    }else {
        firstProgressLayerStyle = propStyle(percent, -135);
    }

    return(
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle, {borderTopColor: colorC, borderRightColor: colorC}]}/>
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
        borderWidth: width,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        transform:[{rotateZ: '-135deg'}]
    },
    secondProgressLayer:{
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: width,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        transform: [{rotateZ: '45deg'}]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: width+5,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colorB,
        borderTopColor: colorB,
        transform:[{rotateZ: '-135deg'}]
    }
});

export default ProgressCircle;
