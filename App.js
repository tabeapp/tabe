import React, {useState} from 'react';
import {Text, TextInput, FlatList, View, Button, StyleSheet, Alert, SafeAreaView} from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';

const App = () => {
    const [message, setMessage] = useState('');

    const data = ['pee pee', 'poo poo', 'oooooh'];
    const sendMessageToAppleWatch = () => {
        Alert.alert(`the message "${message}" has been sent`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList data={data} keyExtractor={item => item} renderItem={({item}) => <Text>{item}</Text>}>

                </FlatList>




            </View>
            <View>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default App;
