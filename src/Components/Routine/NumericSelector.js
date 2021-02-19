import React from 'react';
import Chooser from '../Simple/Chooser';

//im making my own, screw the libs
//min reps is 0, max reps is lets say 50 width __ is good
//min weight is 0, max weight is... 1000, width __ is good
const NumericSelector = props => {
    const {numInfo} = props;
    const {onChange} = props;

    //is this really the best idea?
    //cuz it gives a false sense of having chosen a value when it really hasn't
    //const [selected, setSelected] = useState(numInfo.def);
    const selected = numInfo.def;

    //const temp = Array.from({length: 200}, (_,i) => i*5);
    const temp = [];
    for(let i = numInfo.min; i <= numInfo.max; i += numInfo.increment)
        temp.push(i);

    //this has a weird gray box
    return (
        <Chooser
            selected={selected}
            style={{width: 100, ...props.style}}
            itemStyle={{fontSize: 40, borderRadius: 5, height: 70, ...props.itemStyle}}
            onChange={onChange}
            list={temp}
        />
    );
};

export default NumericSelector;
