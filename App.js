/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import { TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';


const App = () => {
  const [message, setMessage] = useState('');
  const sendMessageToAppleWatch = () => {
    Alert.alert(`the message "${message}" has been sent`)
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setMessage}
        value={message}
        placeholder="Name"
      />
      <Button title="SEND" onPress={sendMessageToAppleWatch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

//export default withAuthenticator(App);
export default App;
