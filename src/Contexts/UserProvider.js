import React, { useEffect, useState } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUserLocation } from '../../graphql/queries';

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
        API.graphql(graphqlOperation(getUserLocation, {
            userID: username
        })).then(result => {
            console.log('userlocaiton load', result);
            //what if its null?
            if(!result.data.getUserLocation)
                return;
            if(!result.data.getUserLocation.gym.country)
                return;
            const gym = result.data.getUserLocation.gym;
            //maybe we need the region ids, but who cares
            //just names for now
            setLocation([gym.country.name, gym.state.name, gym.city.name, gym.name]);
        })
    }, [username]);

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
