import React, {useEffect, useState} from 'react';
import Splash from '../components/Splash';
import useAuthStore from '../store/authStore';
import CustomAxios from '../utils/CustomAxios';
import {storage} from '../utils/storage';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/Detail/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import MainNavigation from './MainNavigation';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const {user, authRestore} = useAuthStore();

  useEffect(() => {
    async function getUser() {
      const userStorage = storage.getString('@ht:user');
      if (userStorage) {
        authRestore(userStorage);
      }
      try {
        // const {data} = await CustomAxios.get('/auth/me', {
        //   headers: {
        //     Authorization: `Bearer ${storage.getString('@ht:token')}`,
        //   },
        // });
        // authRestore(JSON.stringify(data.user));
      } catch (error) {}
      setShowSplash(false);
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (showSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
