import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TrophyIcon = props => {
    const {rank} = props;

    let color = '#453519';
    if(rank === 0)
        color =  '#d9a952';
    else if(rank === 1)
        color =  '#9d9d9d';
    else if(rank === 2)
        color =  '#725626';

    const name = rank === 0 ? 'trophy': 'ribbon';

    return <Ionicons name={name} color={color} size={25}/>;
};
export default TrophyIcon;
