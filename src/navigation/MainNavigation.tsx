import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import TabNavigation from './TabNavigation';
import DetailScreen from '../screens/Detail/DetailScreen';
import NewsScreen from '../screens/Function/News/NewsScreen';
import AddNewScreen from '../screens/Function/News/AddNewScreen';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen
        name="AddNew"
        component={AddNewScreen}
        options={{title: 'Thêm tin tức'}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
