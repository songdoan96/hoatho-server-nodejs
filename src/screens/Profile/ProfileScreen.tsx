import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import useAuthStore from '../../store/AuthStore';
import {getFirstCharacters} from '../../utils/helps';
import storage from '../../utils/storage';

const ProfileScreen = () => {
  const {auth, authLogout} = useAuthStore();

  async function handleLogout() {
    storage.delete('@ht:token');
    storage.delete('@ht:auth');
    storage.clearAll();
    authLogout();
  }
  return (
    <View style={{padding: 10, flex: 1}}>
      <View style={{width: '100%'}}>
        <Avatar.Text
          size={100}
          label={getFirstCharacters(auth?.name)}
          style={{alignItems: 'center', justifyContent: 'center'}}
        />
      </View>
      <Text>{auth?.name}</Text>
      <Text>{auth?.staff_id}</Text>
      <Text>{moment(auth?.birthday).format('DD-MM-yyyy')}</Text>
      <Text>{auth?.phone}</Text>
      <Button mode="contained" onPress={handleLogout}>
        Đăng xuất
      </Button>
    </View>
  );
};

export default ProfileScreen;
