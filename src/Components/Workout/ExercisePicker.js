import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { CATEGORIES, EX_INFO } from '../../Constants/DefaultExInfo';
import Words from '../Simple/Words';
import { BACKGROUND, DARK_GRAY, PRIMARY_DARKER } from '../../Style/Colors';
import Write from '../Simple/Write';

//make it possible to cancel
//i think exercise picker should be able to clsoe itself
const ExercisePicker = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    //props.visible
    const {handleSelection} = props;

    const [category, setCategory] = useState('');

    const [search, setSearch] = useState('');

    let list;
    if(search !== ''){
        //of course this could be a bit more complex with scoring and such but for now this is ok
        list = Object.entries(EX_INFO).filter(([k,v]) => k.toLowerCase().trim().includes(search.toLowerCase().trim()))
            .map(([k]) =>
                <TouchableOpacity
                    onPress={() => {
                        setSearch('');
                        props.close();
                        handleSelection(k);
                    }}
                    key={k} style={{height: 30, padding: 5, backgroundColor: DARK_GRAY}}>

                    <Words>{k}</Words>
                </TouchableOpacity>
            )

    } else if(category === ''){
        list = CATEGORIES.map(cat =>
            <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={{height: 30, padding: 5, backgroundColor: DARK_GRAY}}
            >
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
                    key={k} style={{height: 30, padding: 5, backgroundColor: DARK_GRAY}}>

                    <Words>{k}</Words>
                </TouchableOpacity>
            )
    }

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible}>
            <TouchableOpacity
                onPress={() => {props.close();setCategory('')}}
                style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}
            >
                <View style={{width: '50%', borderWidth: 1, borderColor: PRIMARY_DARKER}}>
                    <Write
                        value={search}
                        onChange={setSearch}
                        style={{backgroundColor: BACKGROUND}}
                        placeholder='search'
                        autoFocus={true}
                    />
                    {list}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

export default ExercisePicker;
