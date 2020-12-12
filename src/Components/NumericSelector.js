import React, {useState} from 'react';
import { PRIMARY } from '../Constants/Theme';
import { Picker } from '@react-native-picker/picker';

//im making my own, screw the libs
//notes:
//min reps is 0, max reps is lets say 50 width __ is good
//min weight is 0, max weight is... 1000, width __ is good
const NumericSelector = () => {

    const [selected, setSelected] = useState(0);

    //props will include a onchnage, which will updated teh reps or wahtever
    //props should also include min, max, increment

    //const temp = Array.from({length: 200}, (_,i) => i*5);
    const temp = [];
    for(let i = 0; i < 1000; i += 5)
        temp.push(i);

    const renderNumber = ({item}) =>
        <Text style={{textAlign: 'center', fontSize: 40}}>{
            item
        }</Text>;

    //this has a weird gray box
    return (
        <Picker
            selectedValue={selected}
            style={{width: 100}}
            itemStyle={{fontSize: 40, borderRadius: 5, height: 70, backgroundColor:'white'}}
            onValueChange={(value) => {
                setSelected(value)
            }}
        >
            {
                temp.map(item =>
                    <Picker.Item color={selected===item?PRIMARY:'black'} label={''+item} value={item} style={{}}/>
                )
            }
        </Picker>
    );
};

export default NumericSelector;
