import React from 'react';
import { View } from 'react-native';
import Row from '../Components/Simple/Row';

//adjustable?
//this is based on rouge plates
const denoms = [
    //{weight: 55, style: {width: 15, height: 100, backgroundColor: 'red'}},
    {weight: 45, style: {width: 12, height: 100, backgroundColor: 'blue'}},
    {weight: 25, style: {width: 7, height: 100, backgroundColor: 'green'}},
    {weight: 10, style: {width: 5, height: 50, backgroundColor: 'white'}},
    {weight: 5, style: {width: 4, height: 42, backgroundColor: 'blue'}},
    {weight: 2.5, style: {width: 3, height: 36, backgroundColor: 'green'}},
];

const WeightVisual = props => {
    let {weight, reverse} = props;
    let info = [];
    //bar
    weight -= 45;
    for(let i = 0; i < denoms.length; i++) {
        while(weight >= denoms[i].weight*2){
            weight -= denoms[i].weight*2;
            info.push(denoms[i]);
        }
    }
    if(reverse)
        info = info.reverse();

    return (<Row style={{display: 'flex'}}>
        {
            info.map((i,index) =>
                <View key={index} style={{...i.style, margin: 1}} />
            )
        }
    </Row>);
}

export default WeightVisual;
