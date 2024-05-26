import React, {useEffect} from 'react';
import Main from './src';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return <Main />;
};

export default App;
