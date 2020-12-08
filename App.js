import React, {useState} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {withAuthenticator} from 'aws-amplify-react-native';

function HomeScreen(){
    const data = ['pee pee', 'poo poo', 'oooooh'];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.box}>
                <FlatList data={data} keyExtractor={item => item} renderItem={({item}) => <Text style={{color:'white'}}>{item}</Text>}>
                </FlatList>
            </View>
            <View style={styles.bottom}>
            </View>
        </SafeAreaView>
    );
}

const App = () => {
    const [message, setMessage] = useState('');

    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    const Tab = createBottomTabNavigator();


    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Settings" component={HomeScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange'},
    top: {height: 40, width: '100%', backgroundColor: 'orange', alignItems: 'center', borderStyle: 'solid', borderRightWidth: 0, borderLeftWidth: 0, borderTopWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    box: {flex: 1, width: '100%', backgroundColor: 'black', alignItems: 'center', borderStyle: 'solid', borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
    bottom: {height: 40, width: '100%', backgroundColor: 'orange', alignItems: 'center', borderStyle: 'solid', borderBottomWidth: 0, borderColor: 'black', borderWidth: 1, justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default App;
