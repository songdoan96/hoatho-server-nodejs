import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, MD3LightTheme, Text, TextInput} from 'react-native-paper';
import LoginFormType from '../../interfaces/LoginForm';
import useAuthStore from '../../store/AuthStore';
import http from '../../utils/http';
import storage from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import LoginValidateForm from '../../validation/LoginValidate';
import TextError from '../../components/TextError';
const LoginScreen = () => {
  const navigation = useNavigation();
  const {authLogin} = useAuthStore();
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginFormType>({
    password: '',
    staff_id: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<any>(null);

  async function handleLogin() {
    setErrors(null);
    const errorValidate = LoginValidateForm(formData);
    if (errorValidate) {
      return setErrors(errorValidate);
    }
    mutate();
  }
  const {mutate, isPending} = useMutation({
    mutationFn: () => {
      return http.post('/auth/login', formData);
    },
    onSuccess(response) {
      const {user, token} = response.data.data;
      const message = response.data.message;
      storage.set('@ht:auth', JSON.stringify(user));
      storage.set('@ht:token', token);
      authLogin(user);
      console.log(message);
    },
    onError(error: AxiosError | any) {
      // setErrorMessage(error.response?.data.message);
      setErrors({...error.response.data.message});
    },
  });
  return (
    <View
      style={{
        padding: '2%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{width: '100%'}}>
        <Text
          variant="displaySmall"
          style={{textAlign: 'center', textTransform: 'uppercase'}}>
          Đăng nhập
        </Text>

        <TextInput
          style={styles.formInput}
          value={formData.staff_id}
          mode="outlined"
          label="Mã số nhân viên"
          placeholder="TP001, TP002,..."
          onChangeText={text =>
            setFormData({...formData, staff_id: text.toUpperCase()})
          }
          left={<TextInput.Icon icon={'account-outline'} size={20} />}
        />
        {errors?.staff_id && <TextError>{errors.staff_id}</TextError>}

        <TextInput
          style={styles.formInput}
          value={formData.password}
          secureTextEntry={isPassword}
          mode="outlined"
          label="Mật khẩu"
          onChangeText={text => setFormData({...formData, password: text})}
          left={<TextInput.Icon icon={'lock-outline'} size={20} />}
          right={
            formData.password && (
              <TextInput.Icon
                icon={isPassword ? 'eye' : 'eye-off'}
                color="#000"
                size={20}
                onPress={() => setIsPassword(!isPassword)}
              />
            )
          }
        />
        {errors?.password && <TextError>{errors.password}</TextError>}

        <Button
          icon="login"
          mode="contained"
          onPress={handleLogin}
          loading={isPending}
          style={{marginVertical: 20}}>
          Đăng nhập
        </Button>
      </View>
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
const styles = StyleSheet.create({
  formInput: {
    marginTop: 10,
  },
});
export default LoginScreen;
