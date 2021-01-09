import React, { useState } from 'react';
import { TouchableOpacity, Modal, Text} from 'react-native';
import { CATEGORIES, EX_INFO } from '../Constants/DefaultExInfo';

//make it possible to cancel
const ExercisePicker = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    //props.visible
    const {handleSelection} = props;

    const [category, setCategory] = useState('');

    let list;
    if(category === ''){
        list = CATEGORIES.map(cat =>
            <TouchableOpacity onPress={() => setCategory(cat)} key={cat} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>
                <Text>{cat}</Text>
            </TouchableOpacity>
        )
    } else {
        list = Object.entries(EX_INFO).filter(([k,v]) => v.categories.includes(category))
            .map(([k]) =>
                <TouchableOpacity
                    onPress={() => {
                        setCategory('');
                        props.close();
                        //addExercise(ex);
                        handleSelection(k);
                    }}
                    key={k} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>

                    <Text>{k}</Text>
                </TouchableOpacity>
            )
    }

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible} onRequest={() => {console.log('idk')}}>
            <TouchableOpacity onPress={() => {props.close();setCategory('')}} style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                {list}
            </TouchableOpacity>
        </Modal>
    );
}

export default ExercisePicker;
