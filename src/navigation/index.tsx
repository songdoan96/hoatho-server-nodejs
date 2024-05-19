import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import useAuthStore from '../store/AuthStore';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
const Navigation = () => {
  const {auth} = useAuthStore();
  return (
    <NavigationContainer>
      {auth ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
