import Row from '../Simple/Row';
import { TouchableOpacity } from 'react-native';
import { BACKGROUND, PRIMARY } from '../../Style/Colors';
import Words from '../Simple/Words';
import React from 'react';

const GenderSelector = props => {
    const {male, setMale} = props;

    return (
        <Row>
            <TouchableOpacity
                style={{backgroundColor: male? PRIMARY: BACKGROUND, borderColor: PRIMARY, borderWidth: 1, flex: 1, alignItems: 'center'}}
                onPress={() => setMale(true)}>
                <Words style={{fontSize: 20}}>Male</Words>
            </TouchableOpacity>
            <TouchableOpacity
                style={{backgroundColor: male? BACKGROUND: PRIMARY, borderColor: PRIMARY, borderWidth: 1, flex: 1, alignItems: 'center'}}
                onPress={() => setMale(false)}>
                <Words style={{fontSize: 20}}>Female</Words>
            </TouchableOpacity>
        </Row>
    );
};

export default GenderSelector;
