import React from 'react';
import Words from './Words';

//easier to use
//honestly could just use a file full of wrods
const BigWords = props => <Words style={{ fontSize: 40, fontWeight: 'bold' }} {...props}/>

export default BigWords;
