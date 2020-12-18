import React, { useContext, useState } from "react";
import { TouchableOpacity, Modal, Text, View } from 'react-native';
import { EXERCISES } from '../Constants/Exercises';
import ProgressContext from "../Contexts/ProgressContext";

//make it possible to cancel
const ExercisePicker = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    let {addExercise} = useContext(ProgressContext);
    //props.visible
    const {handleSelection} = props;

    const [category, setCategory] = useState('');

    let list;
    if(category === ''){
        list = Object.keys(EXERCISES).map(cat =>
                <TouchableOpacity onPress={() => setCategory(cat)} key={cat} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>
                    <Text>{cat}</Text>
                </TouchableOpacity>
        )
    } else {
        list = EXERCISES[category].map(ex =>
            <TouchableOpacity
                onPress={() => {
                    setCategory('');
                    props.close();
                    //addExercise(ex);
                    handleSelection(ex);
                }}
                key={ex} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>

                <Text>{ex}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible} onRequest={() => {console.log('idk')}}>
            <TouchableOpacity onPress={props.close} style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                {list}
            </TouchableOpacity>
        </Modal>
    );
}

export default ExercisePicker;
