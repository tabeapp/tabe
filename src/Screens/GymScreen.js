import { useEffect, useState } from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const GymScreen = props => {
    const { gymID, exercise } = props.route.params;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //load gym and exercise
    }, [gymID, exercise]);

    return (
        <SafeBorder>
            <TopBar title='Gym Leaderboard'/>
            {
                loaded &&
                <Words>{exercise}</Words>
            }
        </SafeBorder>
    );
};
export default GymScreen;
