import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
//get custom icons eventually


import RoutinesProvider from './src/Contexts/RoutinesProvider';
import WorkoutProvider from './src/Contexts/WorkoutProvider';

//this might help
//https://medium.com/javascript-in-plain-english/the-ultimate-guide-for-integrate-aws-amplify-authentication-for-react-native-15a8eec10890
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
                <WorkoutProvider>

                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="profile" screenOptions={{headerShown:false,
                            //cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
                        }}>
                            <Stack.Screen name="home" component={HomeScreen}/>
                            <Stack.Screen name="post" component={PostScreen}/>
                            <Stack.Screen name="explore" component={ExploreScreen}/>
                            <Stack.Screen name="chooseroutine" component={ChooseRoutineScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                            <Stack.Screen name="routinesetup" component={RoutineSetupScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                            <Stack.Screen name="workout" component={WorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                            <Stack.Screen name="report" component={ReportScreen}/>
                            <Stack.Screen name="routine" component={RoutineScreen}/>
                            <Stack.Screen name="routineedit" component={RoutineEditScreen}/>
                            <Stack.Screen name="profile" component={ProfileScreen}/>
                            <Stack.Screen name="gymmap" component={GymMapScreen}/>
                            <Stack.Screen name="gym" component={GymScreen}/>
                            <Stack.Screen name="leaderboard" component={LeaderboardScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>

                </WorkoutProvider>
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
