import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//get custom icons eventually

import Ionicons from 'react-native-vector-icons/Ionicons';

import {withAuthenticator} from 'aws-amplify-react-native';
import WorkoutScreen from './src/Screens/WorkoutScreen';
import ProgressProvider from './src/Contexts/ProgressProvider';
import CustomWorkoutScreen from './src/Screens/CustomWorkoutScreen';
import HomeScreen from './src/Screens/HomeScreen';

const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

/*const AppNavigator = createStackNavigator({
    Home:{
        screen: HomeScreen
    },
    Workout:{
        screen:CustomWorkoutScreen
    }


});*/
const Stack = createStackNavigator();

const App = () => {
    const [message, setMessage] = useState('');

    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    //const Tab = createBottomTabNavigator();

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

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor},
    top: {height: 40, width: '100%', backgroundColor: primaryColor, alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    box: {flex: 1, width: '100%', backgroundColor: 'black', alignItems: 'center', borderStyle: 'solid', borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    bottom: {height: 40, width: '100%', backgroundColor: 'orange', alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default App;
