import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { BACKGROUND, PRIMARY } from '../../Style/Colors';
import NavBar from './NavBar';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const GRADIENT_HEIGHT = 70;

const SafeBorderNav = props => {
    return <>
        <SafeAreaView style={{backgroundColor: BACKGROUND, flex: 1}}>
            <Svg width={'100%'} height={GRADIENT_HEIGHT} style={{zIndex: 1, position: 'absolute'}}>
                <Defs>
                    <LinearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
                        <Stop offset='0' stopColor={PRIMARY} stopOpacity={1}/>
                        <Stop offset='1' stopColor={BACKGROUND} stopOpacity={1}/>
                    </LinearGradient>
                </Defs>
                <Rect x={0} y={0} width={'100%'} height={GRADIENT_HEIGHT} fill={'url(#grad)'}/>
            </Svg>
            <View style={{flex: 1, zIndex: 3}}>{
                props.children
            }<NavBar current={props.screen}/>
            </View>
        </SafeAreaView>
    </>;
};

export default SafeBorderNav;
