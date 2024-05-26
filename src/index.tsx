import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {PaperProvider, Portal, Snackbar} from 'react-native-paper';
import Splash from './components/Splash';
import Navigation from './navigation';
import useAuthStore from './store/AuthStore';
import useToastStore from './store/ToastStore';
import storage from './utils/storage';
const queryClient = new QueryClient();
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Main() {
  const {authLogin} = useAuthStore();
  const {show, message, showToast, hideToast} = useToastStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authState = storage.getString('@ht:auth');
    if (authState) {
      authLogin(JSON.parse(authState));
    }
    setLoading(false);
  }, [authLogin]);
  if (loading) {
    return <Splash />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Navigation />
        <Portal>
          <Snackbar
            visible={show}
            duration={3000}
            onDismiss={hideToast}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
            icon={'close'}
            iconAccessibilityLabel="Ẩn"
            onIconPress={hideToast}
            elevation={5}>
            {message}
          </Snackbar>
        </Portal>
      </PaperProvider>
    </QueryClientProvider>
  );
}
