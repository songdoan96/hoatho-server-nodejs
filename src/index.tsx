import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import useAuthStore from './store/AuthStore';
import storage from './utils/storage';
import Navigation from './navigation';
const queryClient = new QueryClient();
export default function Main() {
  const {authLogin} = useAuthStore();
  useEffect(() => {
    const authState = storage.getString('@ht:auth');
    if (authState) {
      authLogin(JSON.parse(authState));
    }
  }, [authLogin]);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </QueryClientProvider>
  );
}
