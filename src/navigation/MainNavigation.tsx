import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PermissionsAndroid} from 'react-native';
import NewsScreen from '../screens/News/NewsScreen';
import TabNavigation from './TabNavigation';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          title: 'Tin tức',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
