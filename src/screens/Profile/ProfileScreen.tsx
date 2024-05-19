import React, {useState} from 'react';
import {View} from 'react-native';
import useAuthStore from '../../store/AuthStore';
import storage from '../../utils/storage';
import {Avatar, Button, Text} from 'react-native-paper';
import {getFirstCharacters} from '../../utils/helps';

const ProfileScreen = () => {
  const {auth, authLogout} = useAuthStore();
  console.log('🚀 ~ ProfileScreen ~ auth:', auth);
  // const {showToast} = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    storage.delete('@ht:token');
    storage.delete('@ht:auth');
    storage.clearAll();
    authLogout();
    // setIsLoading(true);
    // try {
    //   await CustomAxios.post('/auth/logout', {
    //     id: auth._id,
    //   });
    //   storage.delete('@ht:token');
    //   storage.delete('@ht:auth');
    //   authLogout();
    //   // showToast('Đăng xuất thành công');
    // } catch (error) {}
    // setIsLoading(false);
  }
  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    auth && (
      <View style={{paddingTop: '15%', paddingHorizontal: '2%'}}>
        <View style={{width: '100%', alignItems: 'center', gap: 5}}>
          <Avatar.Text size={24} label={getFirstCharacters(auth.name)} />
          <Text variant="bodyLarge">
            {auth.name}({auth.staff_id})
          </Text>
          {/* <Text h6>
            ({groups.find(group => group.value === auth.group)?.label})
          </Text> */}
        </View>
        <View style={{}}>
          <Text>Họ tên: {auth.name}</Text>
          {/* <Text>Ngày sinh: {moment(auth.birthday).format('DD-MM-YYYY')}</Text> */}
          <Text>Mã số nhân viên: {auth.staff_id}</Text>
          <Text>SĐT: {auth?.phone}</Text>
          {auth?.address && <Text>Địa chỉ: {auth?.address}</Text>}
        </View>
        <Button mode="contained" onPress={handleLogout}>
          Đăng xuất
        </Button>
      </View>
    )
  );
};
export default ProfileScreen;
