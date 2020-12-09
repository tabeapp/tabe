import React from 'react';
import { View, Text } from 'react-native';

//adjustable?
const denoms = [
    {weight: 45, style: {width: 20, height: '100%', backgroundColor: 'blue'}},
    {weight: 25, style: {width: 10, height: '100%', backgroundColor: 'green'}},
    {weight: 10, style: {width: 10, height: '50%', backgroundColor: 'white'}},
    {weight: 5, style: {width: 10, height: '25%', backgroundColor: 'blue'}},
    {weight: 2.5, style: {width: 10, height: '10%', backgroundColor: 'green'}},
];

const WeightVisual = props => {
    let {weight, reverse} = props;
    let info = [];
    //bar
    weight -= 45;
    for(let i = 0; i < denoms.length; i++) {
        while(weight > denoms[i].weight){
            weight -= denoms[i].weight;
            info.push(denoms[i]);
        }
    }
    if(reverse)
        info = info.reverse();

    return (<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {
            info.map((i,index) =>
                <View key={index} style={{...i.style, borderStyle: 'solid', borderWidth: 1, borderColor: 'white'}} />
            )
        }
    </View>);
};

export default WeightVisual;
