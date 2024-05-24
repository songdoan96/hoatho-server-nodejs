// import {useNavigation} from '@react-navigation/native';
// import {useMutation} from '@tanstack/react-query';
// import {AxiosError} from 'axios';
// import React, {useState} from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {Button, Text, TextInput} from 'react-native-paper';
// import TextError from '../../components/TextError';
// import LoginFormType from '../../interfaces/LoginForm';
// import useAuthStore from '../../store/AuthStore';
// import http from '../../utils/http';
// import storage from '../../utils/storage';
// import LoginValidateForm from '../../validation/LoginValidate';
// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const {authLogin} = useAuthStore();
//   const [isPassword, setIsPassword] = useState<boolean>(true);
//   const [formData, setFormData] = useState<LoginFormType>({
//     password: '',
//     staff_id: '',
//   });
//   const [errors, setErrors] = useState<any>(null);

//   async function handleLogin() {
//     setErrors(null);
//     const errorValidate = LoginValidateForm(formData);
//     if (errorValidate) {
//       return setErrors(errorValidate);
//     }
//     mutate();
//   }
//   const {mutate, isPending} = useMutation({
//     mutationFn: () => {
//       return http.post('/auth/login', formData);
//     },
//     onSuccess(response) {
//       const {user, token} = response.data.data;
//       const message = response.data.message;
//       storage.set('@ht:auth', JSON.stringify(user));
//       storage.set('@ht:token', token);
//       authLogin(user);
//       // console.log(message);
//     },
//     onError(error: AxiosError | any) {
//       // setErrorMessage(error.response?.data.message);
//       setErrors({...error.response.data.message});
//     },
//   });
//   return (
//     <View
//       style={{
//         paddingHorizontal: '5%',
//         flex: 1,
//         justifyContent: 'center',
//         // alignItems: 'center',
//       }}>
//       <View style={{width: '100%'}}>
//         <Text
//           variant="displaySmall"
//           style={{textAlign: 'center', textTransform: 'uppercase'}}>
//           Đăng nhập
//         </Text>

//         <TextInput
//           autoCapitalize="characters"
//           style={styles.formInput}
//           value={formData.staff_id}
//           mode="outlined"
//           label="Mã số nhân viên"
//           placeholder="TP001, TP002,..."
//           onChangeText={text => setFormData({...formData, staff_id: text})}
//           left={<TextInput.Icon icon={'account-outline'} size={20} />}
//         />
//         {errors?.staff_id && <TextError>{errors.staff_id}</TextError>}

//         <TextInput
//           style={styles.formInput}
//           value={formData.password}
//           secureTextEntry={isPassword}
//           mode="outlined"
//           label="Mật khẩu"
//           onChangeText={text => setFormData({...formData, password: text})}
//           left={<TextInput.Icon icon={'lock-outline'} size={20} />}
//           right={
//             formData.password && (
//               <TextInput.Icon
//                 icon={isPassword ? 'eye' : 'eye-off'}
//                 color="#000"
//                 size={20}
//                 onPress={() => setIsPassword(!isPassword)}
//               />
//             )
//           }
//         />
//         {errors?.password && <TextError>{errors.password}</TextError>}

//         <Button
//           icon="login"
//           mode="contained"
//           onPress={handleLogin}
//           loading={isPending}
//           style={{marginVertical: 20}}>
//           Đăng nhập
//         </Button>
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           flexDirection: 'row',
//           gap: 4,
//           justifyContent: 'center',
//         }}>
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
// const styles = StyleSheet.create({
//   formInput: {
//     marginTop: 10,
//   },
// });
// export default LoginScreen;

import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import TextError from '../../components/TextError';
import http from '../../utils/http';
import {LoginSchema} from '../../validation/AuthSchema';
import storage from '../../utils/storage';
import useAuthStore from '../../store/AuthStore';
import useToastStore from '../../store/ToastStore';

type FormData = {
  staff_id: string;
  password: string;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const {authLogin} = useAuthStore();
  const {setMessageToast} = useToastStore();
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      staff_id: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data: FormData) => {
      return http.post('/auth/login', data);
    },
    onSuccess(response) {
      const {user, token} = response.data.data;
      const message = response.data.message;
      storage.set('@ht:auth', JSON.stringify(user));
      storage.set('@ht:token', token);
      setMessageToast(message);
      authLogin(user);
    },
    onError(mutateErr) {
      setError(Object.keys(mutateErr.response.data.message)[0], {
        message: Object.values(mutateErr.response.data.message)[0],
      });
    },
  });

  const onSubmit = () =>
    mutate({
      staff_id: getValues('staff_id'),
      password: getValues('password'),
    });

  return (
    <View
      style={{
        paddingHorizontal: '5%',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={{width: '100%'}}>
        <Text
          variant="displaySmall"
          style={{textAlign: 'center', textTransform: 'uppercase'}}>
          Đăng ký
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextInput
              autoCapitalize="characters"
              id="staff_id"
              mode="outlined"
              label="Mã số nhân viên"
              placeholder="TP001, TP002,..."
              left={<TextInput.Icon icon={'account-outline'} size={20} />}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="staff_id"
        />
        {errors.staff_id && <TextError>{errors.staff_id.message}</TextError>}

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextInput
              id="phone"
              style={styles.formInput}
              mode="outlined"
              label="Mật khẩu"
              secureTextEntry={isPassword}
              left={<TextInput.Icon icon={'lock-outline'} size={20} />}
              onChangeText={onChange}
              value={value}
              right={
                <TextInput.Icon
                  icon={isPassword ? 'eye' : 'eye-off'}
                  color="#000"
                  size={20}
                  onPress={() => setIsPassword(!isPassword)}
                />
              }
            />
          )}
          name="password"
        />
        {errors.password && <TextError>{errors.password.message}</TextError>}

        <Button
          icon="login"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          style={{marginVertical: 20}}
          disabled={isPending}>
          Đăng nhập
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}>
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
const styles = StyleSheet.create({
  formInput: {
    marginTop: 10,
  },
});
export default LoginScreen;
