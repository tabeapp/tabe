import React, { useContext, useState } from "react";
import { TouchableOpacity, Modal, Text, View } from 'react-native';
import { EXERCISES } from '../Constants/Exercises';
import ProgressContext from "../Contexts/ProgressContext";

const ExercisePicker = props => {
    let {addExercise} = useContext(ProgressContext);
    //props.visible

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
                    addExercise(ex);
                }}
                key={ex} style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}>

                <Text>{ex}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible} onRequest={() => {console.log('idk')}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {list}
            </View>
        </Modal>
    );
}

export default ExercisePicker;
