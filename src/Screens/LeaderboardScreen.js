import {useState, useEffect} from 'react';
import SafeBorder from '../Components/Navigation/SafeBorder';
import TopBar from '../Components/Navigation/TopBar';
import Words from '../Components/Simple/Words';

//maybe this should be a leader board screen?
//and actual gym screen would be something different, more simliar to profile?
const LeaderboardScreen = props => {
    const { gymID, regionID, exercise } = props.route.params;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //finally, user records comes into play
        //load gym/region and exercise

        if(!regionID && !gymID)
            return;

        if(regionID){

        }
        else if(gymID){

        }

    }, [regionID, gymID, exercise]);

    return (
        <SafeBorder>
            <TopBar title='Leaderboard'/>
            {
                loaded &&
                <Words>{exercise}</Words>
            }
        </SafeBorder>
    );
};
export default LeaderboardScreen;
