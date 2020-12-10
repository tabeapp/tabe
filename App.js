import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//get custom icons eventually

import ProgressProvider from './src/Contexts/ProgressProvider';
import CustomWorkoutScreen from './src/Screens/CustomWorkoutScreen';
import HomeScreen from './src/Screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {

    return (
        <ProgressProvider>

            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name="home" component={HomeScreen}/>
                    <Stack.Screen name="explore" component={HomeScreen}/>
                    <Stack.Screen name="workout" component={CustomWorkoutScreen}/>
                    <Stack.Screen name="routines" component={HomeScreen}/>
                    <Stack.Screen name="profile" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ProgressProvider>
        //temprorray set home to workout, it's just being annoying
    );
};

//export default withAuthenticator(App);
export default App;
