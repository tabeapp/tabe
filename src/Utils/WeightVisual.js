import React from 'react';
import { View, Text } from 'react-native';

//adjustable?
const denoms = [
    {weight: 45, width: 20, height: '100%', color: 'blue'},
    {weight: 25, width: 10, height: '100%', color: 'green'},
    {weight: 10, width: 10, height: '50%', color: 'white'},
    {weight: 5, width: 10, height: '25%', color: 'blue'},
    {weight: 2.5, width: 10, height: '10%', color: 'green'},
];

const WeightVisual = props => {
    let {weight} = props;
    const info = [];
    //bar
    weight -= 45;
    for(let i = 0; i < denoms.length; i++) {
        while(weight > denoms[i].weight){
            weight -= denoms[i].weight;
            info.push(denoms[i]);
        }
    }

    return (<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {
            info.map((i,index) =>
                <View key={index} style={{ width: i.width, height: 10, backgroundColor: i.color}} />
            )
        }
    </View>);
};

export default WeightVisual;
