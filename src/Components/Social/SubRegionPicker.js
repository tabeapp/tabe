import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Words from '../Simple/Words';
import { API, graphqlOperation } from 'aws-amplify';
import { listGymsByCity, listRegionsBySuperRegions } from '../../../graphql/queries';

//so this will always be given a region id
//but sometimes the 'sub region' will be a gym
const SubRegionPicker = props => {
    //just remember to fix this in CustomExerciseCard, just pass onSelect = {addExercise}
    //props.visible
    const {handleSelection, regionID} = props;

    //load subregions, or gyms
    useEffect(() => {
        if(!regionID)
            return;

        let operation;

        console.log(regionID);
        if(regionID.startsWith('place'))
            operation = graphqlOperation(listGymsByCity, { cityID: regionID });
        else
            operation = graphqlOperation(listRegionsBySuperRegions, { superRegionID: regionID });

        API.graphql(operation)
            .then(result => setList(Object.values(result.data)[0].items));


    }, [regionID]);

    const [list, setList] = useState([]);

    return (
        <Modal animationType={'slide'} transparent={true} visible={props.visible} onRequest={() => {console.log('idk')}}>
            <TouchableOpacity onPress={() => props.close()} style={{alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>{
                list.map(sub =>
                    <TouchableOpacity
                        key={sub.id}
                        style={{width: '50%', height: 30, padding: 5, backgroundColor: 'gray'}}
                        onPress={() => {
                            handleSelection(sub.id);
                            setList([]);
                            props.close();
                        }}
                    >
                        <Words>{sub.name}</Words>
                    </TouchableOpacity>
                )
            }</TouchableOpacity>
        </Modal>
    );
}

export default SubRegionPicker;
