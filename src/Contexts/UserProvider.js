import React, {useState} from 'react';
import { useEffect }  from 'react';
import { Auth } from "aws-amplify";

export const UserContext = React.createContext();

const UserProvider = props => {
    //is this legal
    const [username, setUsername] = useState('');

    useEffect(() => {
        //hopefully this doesn't take long lol
        Auth.currentAuthenticatedUser().then(user => {
            setUsername(user.username);
        })
    }, []);

    return (
        <UserContext.Provider value={{
            username: username
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;
