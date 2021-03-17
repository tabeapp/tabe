import React, { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { CATEGORIES, EX_INFO } from '../../Constants/DefaultExInfo';
import Words from '../Simple/Words';

//make it possible to cancel
//i think exercise picker should be able to clsoe itself
const ExercisePicker = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    //props.visible
    const {handleSelection} = props;

    const [category, setCategory] = useState('');

    let list;
    if(category === ''){
        list = CATEGORIES.map(cat =>
            <TouchableOpacity onPress={() => setCategory(cat)} key={cat} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>
                <Words>{cat}</Words>
            </TouchableOpacity>
        )
    } else {
        list = Object.entries(EX_INFO).filter(([,v]) => v.categories.includes(category))
            .map(([k]) =>
                <TouchableOpacity
                    onPress={() => {
                        setCategory('');
                        props.close();
                        handleSelection(k);
                    }}
                    key={k} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>

                    <Words>{k}</Words>
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
