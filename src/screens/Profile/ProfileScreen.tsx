import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Text from '../../components/Text';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';
import theme from '../../themes';
import CustomAxios from '../../utils/CustomAxios';
import {getLastName} from '../../utils/helps';
import {storage} from '../../utils/storage';
import {groups} from '../../utils/groups';

const ProfileScreen = () => {
  const {user, authLogout} = useAuthStore();
  const {showToast} = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    // storage.delete('@ht:token');
    // storage.delete('@ht:user');
    // authLogout();
    setIsLoading(true);
    try {
      await CustomAxios.post('/auth/logout', {
        id: user._id,
      });
      storage.delete('@ht:token');
      storage.delete('@ht:user');
      authLogout();
      showToast('Đăng xuất thành công');
    } catch (error) {}
    setIsLoading(false);
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    user && (
      <View style={{paddingTop: '15%'}}>
        <View style={{width: '100%', alignItems: 'center', gap: 5}}>
          <View
            style={{
              width: theme.SIZES.WIDTH * 0.2,
              height: theme.SIZES.WIDTH * 0.2,
              borderRadius: theme.SIZES.WIDTH * 0.2,
              backgroundColor: theme.COLORS.PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text h2 color="white">
              {getLastName(user.name)}
            </Text>
          </View>
          <Text h5 style={{fontWeight: 700}}>
            {user.name}({user.staff_id})
          </Text>
          <Text h6>
            ({groups.find(group => group.value === user.group)?.label})
          </Text>
        </View>
        <View style={{}}>
          <Text>Họ tên: {user.name}</Text>
          <Text>Ngày sinh: {moment(user.birthday).format('DD-MM-YYYY')}</Text>
          <Text>Mã số nhân viên: {user.staff_id}</Text>
          <Text>SĐT: {user.phone}</Text>
          {user.address && <Text>Địa chỉ: {user.address}</Text>}
        </View>
        <Button onPress={handleLogout}>Đăng xuất</Button>
      </View>
    )
  );
};
export default ProfileScreen;
