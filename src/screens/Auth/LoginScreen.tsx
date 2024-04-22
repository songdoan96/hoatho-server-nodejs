import messaging from '@react-native-firebase/messaging';
// import {useNavigation} from '@react-navigation/native';
// import React, {useState} from 'react';
// import {Controller, SubmitHandler, useForm} from 'react-hook-form';
// import {TouchableOpacity, View} from 'react-native';
// import Button from '../../components/Button';
// import Input from '../../components/Input';
import Text from '../../components/Text';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';
// import {globalStyles} from '../../styles/globalStyles';
// import theme from '../../themes';
import CustomAxios from '../../utils/CustomAxios';
// import {RulesLogin} from '../../utils/rules';
import {storage} from '../../utils/storage';

// interface FormLoginInit {
//   staff_id: string;
//   password: string;
// }

// const LoginScreen = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors, isSubmitting},
//   } = useForm<FormLoginInit>();
//   const navigation = useNavigation();

//   const [errorMessage, setErrorMessage] = useState<string>();

//   const handleLogin: SubmitHandler<FormLoginInit> = async formData => {
//     setErrorMessage('');
//     const fcmToken = await messaging().getToken();
//     try {
//       const response = await CustomAxios.post('/auth/login', {
//         ...formData,
//         fcm_token: fcmToken,
//       });
//       let {
//         data: {user, token},
//         message,
//       } = response.data;
//       delete user.password;

//       storage.set('@ht:user', JSON.stringify(user));
//       storage.set('@ht:token', token);
//       authLogin(user);
//       showToast(message);
//     } catch (error: any) {
//       setErrorMessage(error.response.data.message);
//     }
//   };
//   return (
//     <View
//       style={[
//         globalStyles.container,
//         globalStyles.center,
//         {paddingHorizontal: theme.SIZES.PADDING_HORIZONTAL},
//       ]}>
//       <Text h3 textTransform="uppercase">
//         Đăng nhập
//       </Text>

//       {errorMessage && (
//         <Text color="red" size={14}>
//           {errorMessage}
//         </Text>
//       )}
//       <Controller
//         control={control}
//         rules={RulesLogin.staff_id()}
//         render={({field: {onChange, value}}) => (
//           <Input
//             label="Mã số nhân viên"
//             onChangeText={onChange}
//             value={value?.toUpperCase()}
//             error={errors.staff_id && errors.staff_id.message}
//           />
//         )}
//         name="staff_id"
//       />
//       <Controller
//         control={control}
//         rules={RulesLogin.password()}
//         render={({field: {onChange, value}}) => (
//           <Input
//             label="Mật khẩu"
//             password
//             onChangeText={onChange}
//             value={value}
//             error={errors.password && errors.password.message}
//           />
//         )}
//         name="password"
//       />

//       <Button onPress={handleSubmit(handleLogin)} loading={isSubmitting}>
//         Đăng nhập
//       </Button>
//       <View style={{marginTop: 10, flexDirection: 'row', gap: 4}}>
//         <Text>Chưa có tài khoản?</Text>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={() => navigation.navigate('Register')}>
//           <Text
//             style={{
//               textDecorationLine: 'underline',
//             }}>
//             Đăng ký
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default LoginScreen;
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import Loading from '../../components/Loading';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {authLogin} = useAuthStore();
  const {showToast} = useToastStore();

  const [formData, setFormData] = useState({
    staff_id: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  async function handleSubmit() {
    setLoading(true);
    setErrorMessage('');
    if (!formData.staff_id || !formData.password) {
      setErrorMessage('Tài khoản, mật khẩu không được trống');
    } else {
      const fcmToken = await messaging().getToken();
      try {
        const response = await CustomAxios.post('/auth/login', {
          ...formData,
          fcm_token: fcmToken,
        });
        let {
          data: {user, token},
          message,
        } = response.data;
        delete user.password;

        storage.set('@ht:user', JSON.stringify(user));
        storage.set('@ht:token', token);
        authLogin(user);
        showToast(message);
      } catch (error: any) {
        setErrorMessage(error.response?.data.message);
      }
    }

    setLoading(false);
  }
  return (
    <View
      style={[
        globalStyles.center,
        {flex: 1, width: '100%', paddingHorizontal: 10},
      ]}>
      <Text h3 textTransform="uppercase" bold style={{marginBottom: 10}}>
        Đăng nhập
      </Text>
      {errorMessage && (
        <Text error style={{paddingVertical: 10}}>
          {errorMessage}
        </Text>
      )}
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>Tài khoản</Text>
        <TextInput
          id="staff_id"
          style={[globalStyles.formControl]}
          value={formData.staff_id}
          onChangeText={text => setFormData({...formData, staff_id: text})}
        />
      </View>
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>Mật khẩu</Text>
        <TextInput
          style={[globalStyles.formControl]}
          value={formData.password}
          onChangeText={text => setFormData({...formData, password: text})}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={handleSubmit}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'#fff'} />
        ) : (
          <Text style={globalStyles.btnText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>
      <View style={{marginTop: 10, flexDirection: 'row', gap: 4}}>
        <Text>Chưa có tài khoản?</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              textDecorationLine: 'underline',
            }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
