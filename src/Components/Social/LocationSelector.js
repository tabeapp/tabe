import React, {useState, useContext, useEffect} from 'react';
import {Alert, Picker, Modal, View, ScrollView, TouchableOpacity} from 'react-native';
import Row from '../Simple/Row';
import { UserContext } from '../../Contexts/UserProvider';
import Words from '../Simple/Words';
import { Location, UserLocation } from '../../../models';
import { DataStore } from 'aws-amplify';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

import Chooser from '../Simple/Chooser';

const COUNTRY = 0;
const STATE = 1;
const CITY = 2;
const GYM = 3;

//i have absolutely no idea how to best do this
//this is retarded, what if we just used user location to determine
//country/state/city

//ok so heres the plan
//get user coordinates using react native packages
//get list of closests gyms using this tutorial
//https://gerard-sans.medium.com/finding-the-nearest-locations-around-you-using-aws-amplify-part-1-ee4d6a14eec9
//allow user to choose a gym

//also, let the user add their own gyms, (Locations)
//they pick a long lat location using a map or whatever, then use google api to get country/state/city
/*fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
    })*/
//if the city isn't already there, add it as a location
//if the staet isn't already there, add it as a location
//if the country isn't already there, add it as a lcoation
//thus the gym gets linked to the country and state and city
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

    const addLocationAtLevel = (level, name) => {
        if(level === 0)
            setCountries([...countries, name]);
        else if(level === 1)
            setStates([...states, name]);
        else if(level === 2)
            setCities([...cities, name]);
        else if(level === 3)
            setGyms([...gyms, name]);

        //also need to remember
        if(level !== 0){
            const superLocationID = location[level-1];
            DataStore.save(new Location({
                name: name,
                superLocationID: superLocationID
            }))
        }
    }


    /*return (
        <View style={{height: 500}}>
            {
                [countries, states, cities, gyms].map((l, index) =>
                    <Row>
                        <Chooser
                            style={{height: 100, width: 100}}
                            itemStyle={{height: 100, width: 100}}
                            selected={location[index]}
                            onChange={(value) => {
                                setLocation(prev => {
                                    const next = [...prev];
                                    next[index] = value;
                                    return next;
                                })
                            }}
                            list={l}
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
                                        onPress: name => addLocationAtLevel(index, name)
                                    }
                                ]
                            )
                        }}>
                            <Words>+</Words>
                        </TouchableOpacity>
                    </Row>
                )

            }
            <Row style={{height: 50}}>
                {
                    location.map(l => <Words>{l}</Words>)
                }
            </Row>
        </View>
    );*/

    const [coordinates, setCoordinates] = useState({latitude: 45, longitude: 70});

    useEffect(() => {

        Geolocation.getCurrentPosition(info => {
            setCoordinates({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        });
        //navigator.geolocation.getCurrentPosition(position => {
            //const location = JSON.stringify(position)
            //console.log(location);
        //})
    }, []);

    const addGym = () => {
        //see this for idea
        //https://github.com/afshintalebi/react-native-map-picker/blob/master/src/LocationPicker.js

    };

    return (
        <View>
            <Words>{JSON.stringify(coordinates)}</Words>
            <TouchableOpacity onPress={addGym}>
                <Words>Add Gym</Words>
            </TouchableOpacity>
            <MapView
                ></MapView>
        </View>
    );
};

export default LocationSelector;
