import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
//get custom icons eventually

import ProgressProvider from './src/Contexts/ProgressProvider';
import CustomWorkoutScreen from './src/Screens/CustomWorkoutScreen';
import HomeScreen from './src/Screens/HomeScreen';
import ExploreScreen from "./src/Screens/ExploreScreen";
import RoutineScreen from "./src/Screens/RoutineScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import WorkoutScreen from "./src/Screens/WorkoutScreen";
import RoutineSetupScreen from "./src/Screens/RoutineSetupScreen";

const Stack = createStackNavigator();

const App = () => {

    return (
        <ProgressProvider>

            <NavigationContainer>
                <Stack.Navigator initialRouteName="routinesetup" screenOptions={{headerShown:false,
                    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
                }}>
                    <Stack.Screen name="home" component={HomeScreen}/>
                    <Stack.Screen name="explore" component={ExploreScreen}/>
                    <Stack.Screen name="routinesetup" component={RoutineSetupScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                    <Stack.Screen name="workout" component={WorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                    <Stack.Screen name="customworkout" component={CustomWorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                    <Stack.Screen name="routine" component={RoutineScreen}/>
                    <Stack.Screen name="profile" component={ProfileScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ProgressProvider>
        //temprorray set home to workout, it's just being annoying
    );
};

//export default withAuthenticator(App);
export default App;
