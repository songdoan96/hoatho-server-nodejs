import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Toast from './src/components/Toast';
import Navigation from './src/navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(process.env.NODE_ENV);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.dark : Colors.light}
      />
      <Navigation />
      <Toast />
    </>
  );
};

export default App;
