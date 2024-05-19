import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
// import DetailScreen from '../screens/Detail/DetailScreen';
// import AddNewScreen from '../screens/Function/News/AddNewScreen';
// import NewsScreen from '../screens/Function/News/NewsScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen
        name="AddNew"
        component={AddNewScreen}
        options={{title: 'Thêm tin tức'}}
      /> */}
    </Stack.Navigator>
  );
};

export default MainNavigation;
