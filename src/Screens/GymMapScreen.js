import React from 'react';
import TopBar from '../Components/Navigation/TopBar';
import SafeBorder from '../Components/Navigation/SafeBorder';
import GymMap from '../Components/Map/GymMap';


//https://amplify-sns.workshop.aws/en/30_mock/30_post_front_end.html
const GymMapScreen = props => {

    return (
        <>
            <GymMap/>
            <SafeBorder {...props} >
                <TopBar title="Gym Map"/>
            </SafeBorder>
        </>
    );
};


export default GymMapScreen;
