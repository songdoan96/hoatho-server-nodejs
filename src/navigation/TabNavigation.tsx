import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
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
            <Ionicons
              name={focused ? 'wallet' : 'wallet-outline'}
              size={size}
              color={color}
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
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
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
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
// import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Tab = createMaterialBottomTabNavigator();

// export default function TabNavigation() {
//   return (
//     <Tab.Navigator barStyle={{height: 65, backgroundColor: 'red'}}>
//       <Tab.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, focused}) => (
//             <Ionicons
//               name={focused ? 'home' : 'home-outline'}
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="FunctionScreen"
//         component={FunctionScreen}
//         options={{
//           tabBarLabel: 'Chức năng',
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, focused}) => (
//             <Ionicons
//               name={focused ? 'wallet' : 'wallet-outline'}
//               size={26}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="NotificationScreen"
//         component={NotificationScreen}
//         options={{
//           tabBarLabel: 'Thông báo',
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, focused}) => (
//             <Ionicons
//               name={focused ? 'notifications' : 'notifications-outline'}
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="ProfileScreen"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Tài khoản',
//           // eslint-disable-next-line react/no-unstable-nested-components
//           tabBarIcon: ({color, focused}) => (
//             <Ionicons
//               name={focused ? 'person' : 'person-outline'}
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
