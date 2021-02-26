import React, { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { CurrentWorkout, UserLocation } from '../../models';

export const UserContext = React.createContext();

const UserProvider = props => {
    //is this legal
    const [username, setUsername] = useState('');

    const [location, setLocation] = useState([null, null, null, null]);

    useEffect(() => {
        //hopefully this doesn't take long lol
        Auth.currentAuthenticatedUser().then(user => {
            console.log(user.username);
            setUsername(user.username);

        })
    }, []);

    useEffect(() => {
        if(!username)
            return;
        DataStore.query(UserLocation, ul => ul.userID('eq', username))
            .then(result => {
                if(!result[0])
                    return;
                setLocation([
                    result[0].data.countryID,
                    result[0].data.stateID,
                    result[0].data.cityID,
                    result[0].data.gymID,
                ]);
            });
    }, [username]);

    //let the user update location, and make their own for fun
    const updateLocation = (level, id) => {
        setLocation(prev => {
            const next = [...prev];
            next[level] = id;
            return id;
        });


    };

    return (
        <UserContext.Provider value={{
            username: username,
            location: location
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;
