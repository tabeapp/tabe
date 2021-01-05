import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
//get custom icons eventually

import ProgressProvider from './src/Contexts/ProgressProvider';
import CustomWorkoutScreen from './src/Screens/CustomWorkoutScreen';
import HomeScreen from './src/Screens/HomeScreen';
import ExploreScreen from "./src/Screens/ExploreScreen";
import RoutineEditScreen from "./src/Screens/RoutineEditScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import WorkoutScreen from "./src/Screens/WorkoutScreen";
import ChooseRoutineScreen from "./src/Screens/ChooseRoutineScreen";
import RoutineSetupScreen from "./src/Screens/RoutineSetupSreen";
import ReportScreen from "./src/Screens/ReportScreen";
import PostScreen from "./src/Screens/PostScreen";
import RoutineScreen from "./src/Screens/RoutineScreen";
import RoutinesProvider from "./src/Contexts/RoutinesProvider";

const Stack = createStackNavigator();

const App = () => {

    return (
        <RoutinesProvider>
            <ProgressProvider>

                <NavigationContainer>
                    <Stack.Navigator initialRouteName="routine" screenOptions={{headerShown:false,
                        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
                    }}>
                        <Stack.Screen name="home" component={HomeScreen}/>
                        <Stack.Screen name="post" component={PostScreen}/>
                        <Stack.Screen name="explore" component={ExploreScreen}/>
                        <Stack.Screen name="chooseroutine" component={ChooseRoutineScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                        <Stack.Screen name="routinesetup" component={RoutineSetupScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                        <Stack.Screen name="workout" component={WorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                        <Stack.Screen name="report" component={ReportScreen}/>
                        <Stack.Screen name="customworkout" component={CustomWorkoutScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
                        <Stack.Screen name="routine" component={RoutineScreen}/>
                        <Stack.Screen name="routineedit" component={RoutineEditScreen}/>
                        <Stack.Screen name="profile" component={ProfileScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ProgressProvider>
        </RoutinesProvider>
    );
};

//export default withAuthenticator(App);
export default App;
