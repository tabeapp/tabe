import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import RoutinesProvider from './src/Contexts/RoutinesProvider';
import WorkoutProvider from './src/Contexts/WorkoutProvider';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from "aws-amplify-react-native";
import UserProvider from "./src/Contexts/UserProvider";
import GymMapScreen from './src/Screens/GymMapScreen';
import {
    ChooseRoutineScreen,
    ExploreScreen,
    HomeScreen,
    PostScreen, ProfileScreen, ReportScreen, RoutineEditScreen, RoutineScreen,
    RoutineSetupScreen,
    WorkoutScreen,
} from './src/Screens';
import GymScreen from './src/Screens/GymScreen';
import LeaderboardScreen from './src/Screens/LeaderboardScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import RoutineEditProvider from './src/Contexts/RoutineEditProvider';

//this might help
//https://medium.com/javascript-in-plain-english/the-ultimate-guide-for-integrate-aws-amplify-authentication-for-react-native-15a8eec10890
//get custom icons eventually

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true
    }
});

const Stack = createStackNavigator();

//consider using headershown and just editing it
const App = () => {

    return (
        <UserProvider>

            <RoutinesProvider>
                <RoutineEditProvider>

                    <WorkoutProvider>

                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="explore" screenOptions={{headerShown:false}}>
                                <Stack.Screen name="home" component={HomeScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forNoAnimation}}/>
                                <Stack.Screen name="post" component={PostScreen}/>
                                <Stack.Screen name="explore" component={ExploreScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forNoAnimation}}/>
                                <Stack.Screen name="chooseroutine" component={ChooseRoutineScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                                <Stack.Screen name="routinesetup" component={RoutineSetupScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                                <Stack.Screen name="workout" component={WorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                                <Stack.Screen name="report" component={ReportScreen}/>
                                <Stack.Screen name="routine" component={RoutineScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forNoAnimation}}/>
                                <Stack.Screen name="routineedit" component={RoutineEditScreen}/>
                                <Stack.Screen name="profile" component={ProfileScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forNoAnimation}}/>
                                <Stack.Screen name="settings" component={SettingsScreen}/>
                                <Stack.Screen name="gymmap" component={GymMapScreen}/>
                                <Stack.Screen name="gym" component={GymScreen}/>
                                <Stack.Screen name="leaderboard" component={LeaderboardScreen}/>
                            </Stack.Navigator>
                        </NavigationContainer>

                    </WorkoutProvider>
                </RoutineEditProvider>
            </RoutinesProvider>
        </UserProvider>
    );
};

//export default withAuthenticator(App);
export default withAuthenticator(App, {
    signUpConfig:{
        hiddenDefaults: ['phone_number']
    }
});
