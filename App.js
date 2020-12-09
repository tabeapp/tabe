import React, {useState} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//get custom icons eventually

import Ionicons from 'react-native-vector-icons/Ionicons';

import {withAuthenticator} from 'aws-amplify-react-native';
import WorkoutScreen from './src/Screens/WorkoutScreen';
import ProgressProvider from './src/Contexts/ProgressProvider';

function HomeScreen(){
    const data = ['pee pee', 'poo poo', 'oooooh'];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.box}>
                <FlatList data={data} keyExtractor={item => item} renderItem={({item}) => <Text style={{color:'white'}}>{item}</Text>}>
                </FlatList>
            </View>
        </SafeAreaView>
    );
}

const primaryColor = '#66d6f8';
const secondaryColor = '#356b7e';

const App = () => {
    const [message, setMessage] = useState('');

    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    const Tab = createBottomTabNavigator();

    return (
        <ProgressProvider>

            <NavigationContainer theme={{
                dark: true,
                colors: {
                    background: 'black',
                    primary: primaryColor,
                    text: 'white',
                    card: 'gray',
                },
            }}>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === 'home')
                                iconName = 'home';
                            else if(route.name === 'explore')
                                iconName = 'search';
                            else if(route.name === 'workout'){
                                iconName = 'barbell';
                                color = 'red';
                                size *= 2.0;
                            }
                            else if(route.name === 'routines')
                                iconName = 'reload';
                            else if(route.name === 'profile')
                                iconName = 'person';

                            if(!focused)
                                iconName += '-outline';

                            return <Ionicons name={iconName} color={color} size={size}/>;
                        },
                    })}
                    tabBarOptions={{
                        style: {
                            backgroundColor:'black',
                        },
                        showLabel: false,
                        activeTintColor: primaryColor,
                        //activeBackgroundColor: '#222',
                        inactiveTintColor: secondaryColor,
                        //inactiveBackgroundColor: 'black',

                    }}
                >
                    <Tab.Screen name="home" component={HomeScreen}/>
                    <Tab.Screen name="explore" component={HomeScreen}/>
                    <Tab.Screen name="workout" component={WorkoutScreen}/>
                    <Tab.Screen name="routines" component={HomeScreen}/>
                    <Tab.Screen name="profile" component={HomeScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </ProgressProvider>
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
