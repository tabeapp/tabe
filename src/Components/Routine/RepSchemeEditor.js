import React, { useContext } from 'react';
import Words from '../Simple/Words';
import { TouchableOpacity, View } from 'react-native';
import { FULL_COPY } from '../../Utils/UtilFunctions';
import { NEW_PR } from '../../Constants/Symbols';
import { STYLES } from '../../Style/Values';
import { DARK_GRAY } from '../../Style/Colors';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { RoutineEditContext } from '../../Contexts/RoutineEditProvider';
import RepSchemeIteration from './RepSchemeIteration';

const reps = [];
for(let i = 0; i <= 50; i++)
    reps.push(i)

//yeah maybe I should make another compoenent for htis
const percents = [];
for(let i = 0; i <= 100; i++)
    percents.push(i)
//
percents.push(NEW_PR);

const RepSchemeEditor = props => {
    //eventually you'll need to pass down the name of the rep scheme for multiple

    const {routineEditDispatch} = useContext(RoutineEditContext);
    const {name} = props;//need to use name
    //i guess only one custom scheme per routine
    //otherwise how fucking complex is your workout?
    const width = useWindowDimensions().width;

    //this is kinda going to resemble customexercise card
    return(
        <View style={{width: width, backgroundColor: DARK_GRAY}}>
            <Words style={{fontWeight: 'bold', fontSize: 30}}>Rep Scheme {name}</Words>
            {
                props.sets.map((week, weekIndex) =>
                    <RepSchemeIteration key={weekIndex} week={week} weekIndex={weekIndex} name={name}/>
                )

            }
            <TouchableOpacity style={STYLES.textButton} onPress={() => {
                routineEditDispatch(prev => {
                    const x = prev.customSets[name];
                    if(x.length === 0)
                        x.push([]);
                    else
                        x.push(FULL_COPY(x[x.length-1]));
                    return prev;
                });
                //append a new obj
            }}>
                <Words style={{fontSize: 30}}>Add iteration</Words>
            </TouchableOpacity>
        </View>
    )

}

export default RepSchemeEditor;
