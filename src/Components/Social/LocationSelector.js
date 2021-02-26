import React, {useState, useContext, useEffect} from 'react';
import {Alert, Picker, Modal, View, ScrollView, TouchableOpacity} from 'react-native';
import Row from '../Simple/Row';
import { UserContext } from '../../Contexts/UserProvider';
import Words from '../Simple/Words';
import { Location, UserLocation } from '../../../models';
import { DataStore } from 'aws-amplify';
import Chooser from '../Simple/Chooser';

//i have absolutely no idea how to best do this
const LocationSelector = props => {
    //const location = [...useContext(UserContext).location];
    const [location, setLocation] = useState(['','','','']);

    const [earthId, setEarthId] = useState('');

    const [countries, setCountries] = useState(['USA', 'France']);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        //make sure earth is there
        DataStore.query(Location, l => l.name('eq', 'Earth'))
            .then(results => {
                if(results.length === 0){
                    DataStore.save(new Location({
                        name: 'Earth'
                    }))
                        .then(result => setEarthId(result.id));
                }
                else
                    setEarthId(results[0].id);
            })
    }, []);

    //get countries
    useEffect(() => {
        if(!earthId)
            return;

        //user already has a country, no need to reload it
        if(location[0])
            return;

        DataStore.query(Location, l => l.superLocationID('eq', earthId))
            .then(results => console.log(results) );

    }, [earthId]);

    //get states
    useEffect(() => {
        if(location[1])
            return;

        DataStore.query(Location, l => l.superLocationID('eq', location[0]))
            .then(results => console.log(results) );
    }, [location])

    //get cities
    useEffect(() => {
        if(location[2])
            return;

        DataStore.query(Location, l => l.superLocationID('eq', location[1]))
            .then(results => console.log(results) );
    }, [location])

    //get gyms
    useEffect(() => {
        if(location[3])
            return;

        DataStore.query(Location, l => l.superLocationID('eq', location[2]))
            .then(results => console.log(results) );
    }, [location])


    return (
        <View style={{height: 300}}>
            <Row>

                <Chooser
                    style={{height: 100, width: 100}}
                    itemStyle={{height: 100, width: 100}}
                    selected={location[0]}
                    onChange={(value) => {
                        setLocation(prev => {
                            const next = [...prev];
                            next[0] = value;
                            return next;
                        })
                    }}
                    list={countries}
                />
                <TouchableOpacity onPress={() => {
                    //lol this cannot be the best way to do this, im just lazy
                    Alert.prompt(
                        "Enter Country",
                        "Enter New Country Name",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: name => setCountries([...countries, name])
                            }
                        ]
                    )
                }}>
                    <Words>+</Words>
                </TouchableOpacity>
            </Row>
            <Row style={{height: 50}}>
                {
                    location.map(l => <Words>{l}</Words>)
                }
            </Row>
        </View>
    );
};

export default LocationSelector;
