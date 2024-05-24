// import RNDateTimePicker, {
//   DateTimePickerEvent,
// } from '@react-native-community/datetimepicker';
// import {useNavigation} from '@react-navigation/native';
// import {useMutation} from '@tanstack/react-query';
// import {AxiosError} from 'axios';
// import moment from 'moment';
// import React, {useState} from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {Button, Text, TextInput} from 'react-native-paper';
// import TextError from '../../components/TextError';
// import {RegisterFormType} from '../../interfaces/AuthForm';
// import http from '../../utils/http';

// const RegisterScreen = () => {
//   const navigation = useNavigation();
// const [isPassword, setIsPassword] = useState<boolean>(true);
//   const [openDatePicker, setOpenDatePicker] = useState(false);
//   const [formData, setFormData] = useState<RegisterFormType>({
//     staff_id: '',
//     password: '',
//     name: '',
//     phone: '',
//     birthday: new Date(),
//   });
//   const [errors, setErrors] = useState<any>(null);
//   async function handleRegister() {
//     setErrors(null);
//     const errorValidate = RegisterValidateForm(formData);
//     if (errorValidate) {
//       return setErrors(errorValidate);
//     }
//     mutate();
//   }
//   const {mutate, isPending} = useMutation({
//     mutationFn: () => {
//       return http.post('/auth/register', {
//         ...formData,
//         staff_id: formData.staff_id?.toUpperCase(),
//       });
//     },
//     onSuccess(response) {
//       // const {user, token} = response.data.data;
//       // const message = response.data.message;
//       // storage.set('@ht:auth', JSON.stringify(user));
//       // storage.set('@ht:token', token);
//       // authLogin(user);
//       // console.log(message);
//       navigation.navigate('Login');
//     },
//     onError(error: AxiosError | any) {
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
//           Đăng ký
//         </Text>
//         <TextInput
//           autoCapitalize="characters"
//           id="staff_id"
//           value={formData.staff_id}
//           mode="outlined"
//           label="Mã số nhân viên"
//           placeholder="TP001, TP002,..."
//           onChangeText={text => setFormData({...formData, staff_id: text})}
//           left={<TextInput.Icon icon={'account-outline'} size={20} />}
//         />
//         {errors?.staff_id && <TextError>{errors.staff_id}</TextError>}
//         <TextInput
//           autoCapitalize="words"
//           id="name"
//           style={styles.formInput}
//           value={formData.name}
//           mode="outlined"
//           label="Họ tên"
//           placeholder="Nguyễn Văn A, Đoàn Quang B,..."
//           onChangeText={text => setFormData({...formData, name: text})}
//           left={<TextInput.Icon icon={'text-account'} size={20} />}
//         />
//         {errors?.name && <TextError>{errors.name}</TextError>}
//         <TextInput
//           style={styles.formInput}
//           value={formData.phone}
//           mode="outlined"
//           label="SĐT"
//           keyboardType="phone-pad"
//           onChangeText={text => setFormData({...formData, phone: text})}
//           left={<TextInput.Icon icon={'cellphone'} size={20} />}
//         />
//         {errors?.phone && <TextError>{errors.phone}</TextError>}

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
//         <TextInput
//           style={styles.formInput}
//           mode="outlined"
//           label="Ngày sinh"
//           value={moment(formData.birthday).format('DD/MM/YYYY')}
//           editable={false}
//           left={
//             <TextInput.Icon
//               icon={'cake-variant-outline'}
//               size={20}
//               onPress={() => setOpenDatePicker(true)}
//             />
//           }
//           right={
//             <TextInput.Icon
//               icon={'calendar-month'}
//               size={20}
//               onPress={() => setOpenDatePicker(true)}
//             />
//           }
//         />
//         {openDatePicker && (
//           <RNDateTimePicker
//             testID="registerDatePicker"
//             value={new Date()}
//             mode="date"
//             is24Hour={true}
//             onChange={(event: DateTimePickerEvent, date?: Date): void => {
//               setOpenDatePicker(false);
//               setFormData({
//                 ...formData,
//                 birthday: date,
//               });
//             }}
//           />
//         )}
//         <Button
//           icon="account-plus-outline"
//           mode="contained"
//           onPress={handleRegister}
//           loading={isPending}
//           style={{marginVertical: 20}}>
//           Đăng ký
//         </Button>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           gap: 4,
//           justifyContent: 'center',
//         }}>
//         <Text>Đã có tài khoản?</Text>
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={() => navigation.navigate('Login')}>
//           <Text
//             style={{
//               textDecorationLine: 'underline',
//             }}>
//             Đăng nhập
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
// export default RegisterScreen;
import {zodResolver} from '@hookform/resolvers/zod';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import moment from 'moment';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import TextError from '../../components/TextError';
import http from '../../utils/http';
import {RegisterSchema} from '../../validation/AuthSchema';
import useToastStore from '../../store/ToastStore';

type FormData = {
  staff_id: string;
  name: string;
  phone: string;
  password: string;
  birthday: Date;
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {setMessageToast} = useToastStore();
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [birthdayValue, setBirthdayValue] = useState(new Date());
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      staff_id: '',
      name: '',
      phone: '',
      password: '',
      birthday: new Date(),
    },
    resolver: zodResolver(RegisterSchema),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (data: FormData) => {
      return http.post('/auth/register', data);
    },
    onSuccess(response) {
      const message = response.data.message;
      setMessageToast(message);
      navigation.navigate('Login');
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
      name: getValues('name'),
      phone: getValues('phone'),
      password: getValues('password'),
      birthday: birthdayValue,
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
              style={styles.formInput}
              autoCapitalize="words"
              id="name"
              mode="outlined"
              label="Họ tên"
              placeholder="Nguyễn Văn A, Đoàn Quang B,..."
              left={<TextInput.Icon icon={'text-account'} size={20} />}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <TextError>{errors.name.message}</TextError>}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.formInput}
              id="phone"
              mode="outlined"
              label="SĐT"
              keyboardType="phone-pad"
              left={<TextInput.Icon icon={'cellphone'} size={20} />}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="phone"
        />
        {errors.phone && <TextError>{errors.phone.message}</TextError>}

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

        <TextInput
          style={styles.formInput}
          mode="outlined"
          label="Ngày sinh"
          value={moment(birthdayValue).format('DD/MM/YYYY')}
          editable={false}
          left={
            <TextInput.Icon
              icon={'cake-variant-outline'}
              size={20}
              onPress={() => setOpenDatePicker(true)}
            />
          }
          right={
            <TextInput.Icon
              icon={'calendar-month'}
              size={20}
              onPress={() => setOpenDatePicker(true)}
            />
          }
        />
        {openDatePicker && (
          <RNDateTimePicker
            testID="registerDatePicker"
            value={birthdayValue}
            mode="date"
            is24Hour={true}
            onChange={(event, date) => {
              setOpenDatePicker(false);
              if (date) {
                setBirthdayValue(date);
              }
            }}
          />
        )}
        <Button
          icon="account-plus-outline"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          style={{marginVertical: 20}}
          disabled={isPending}>
          Đăng ký
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}>
        <Text>Đã có tài khoản?</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textDecorationLine: 'underline',
            }}>
            Đăng nhập
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
export default RegisterScreen;
