import React from 'react';
import Svg, { Rect } from 'react-native-svg';

//adjustable?
//this is based on rouge plates
const denoms = [
    //{weight: 55, style: {width: 15, height: 100, fill: 'red'}},
    {weight: 45, style: {width: 12, height: 100, fill: 'blue'}},
    {weight: 25, style: {width: 7, height: 100, fill: 'green'}},
    {weight: 10, style: {width: 5, height: 50, fill: 'white'}},
    {weight: 5, style: {width: 4, height: 42, fill: 'blue'}},
    {weight: 2.5, style: {width: 3, height: 36, fill: 'green'}},
];

//consider just saying how many plates there are for very large values...
const WeightVisual = props => {
    let {weight, reverse} = props;
    let info = [];
    //bar
    weight -= 45;

    const gap = 2;

    let x = gap;

    //stroke width?

    for(let i = 0; i < denoms.length; i++) {
        while(weight >= denoms[i].weight*2){
            weight -= denoms[i].weight*2;
            info.push({
                x: x,
                y: gap + (denoms[0].style.height - denoms[i].style.height) / 2,
                height: denoms[i].style.height,
                width: denoms[i].style.width,
                fill: denoms[i].style.fill,
            });
            x += gap + denoms[i].style.width;
        }
    }
    x += gap;

    //time to make this an svg
    //more complex but worth
    return <Svg width={x} height={100 + 2*gap} style={reverse&&{transform: [{rotate: '180deg'}]}}>
        {
            info.map((i, index) =>
                <Rect key={index} x={i.x} y={i.y} width={i.width} height={i.height} fill={i.fill}/>
            )
        }
    </Svg>;
};

export default WeightVisual;
