import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  MainComponent,
  NotificationBing,
  User,
} from 'iconsax-react-native';
import React from 'react';
import FunctionScreen from '../screens/Function/FunctionScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: '#242526',
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color, focused}) => (
            <Home
              size={size}
              color={color}
              variant={focused ? 'Bold' : 'Broken'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Function"
        component={FunctionScreen}
        options={{
          tabBarLabel: 'Chức năng',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color, focused}) => (
            <MainComponent
              size={size}
              color={color}
              variant={focused ? 'Bold' : 'Broken'}
            />
          ),
        }}
      />
      {/* {auth?.group.startsWith('chuyen') && (
        <Tab.Screen
          name="Support"
          component={SupportScreen}
          options={{
            tabBarLabel: 'Hỗ trợ',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({size, color, focused}) => (
              <Brodcast
                size={size}
                color={color}
                variant={focused ? 'Bold' : 'Broken'}
              />
            ),
          }}
        />
      )} */}

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color, focused}) => (
            <NotificationBing
              size={size}
              color={color}
              variant={focused ? 'Bold' : 'Broken'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color, focused}) => (
            <User
              size={size}
              color={color}
              variant={focused ? 'Bold' : 'Broken'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
