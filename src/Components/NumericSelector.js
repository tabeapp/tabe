import React from 'react';
import View, {FlatList, Text} from 'react-native';

const NumericSelector = () => {
    const temp = ['penis', 'peni', 'pen', 'pe', 'p'];

    const renderNumber = ({item}) => <Text style={{color:'white'}}>{
        item
    }</Text>;

    return (
        <FlatList
            data={temp}
            keyExtractor={item => item}
            renderItem={renderNumber}
        />
    );
};

export default NumericSelector;
