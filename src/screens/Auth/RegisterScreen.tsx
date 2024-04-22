// import RNDateTimePicker from '@react-native-community/datetimepicker';
// import {useNavigation} from '@react-navigation/native';
// import {Calendar} from 'iconsax-react-native';
// import React, {useState} from 'react';
// import {Controller, SubmitHandler, useForm} from 'react-hook-form';
// import {Pressable, TouchableOpacity, View} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import Button from '../../components/Button';
// import Input from '../../components/Input';
// import Text from '../../components/Text';
// import useToastStore from '../../store/toastStore';
// import {globalStyles} from '../../styles/globalStyles';
// import theme from '../../themes';
// import CustomAxios from '../../utils/CustomAxios';
// import {RulesRegister} from '../../utils/rules';
import moment from 'moment';
// interface FormRegisterInit {
//   staff_id: string;
//   password: string;
//   name: string;
//   phone: string;
// }

// const RegisterScreen = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors, isSubmitting},
//   } = useForm<FormRegisterInit>();
//   const navigation = useNavigation();
//   const {showToast} = useToastStore();
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
//   const [datePickerValue, setDatePickerValue] = useState();

//   const handleRegister: SubmitHandler<FormRegisterInit> = async formData => {
//     let data = {
//       ...formData,
//       birthday: moment(datePickerValue).format('YYYY-MM-DD'),
//     };
//     setErrorMessage('');
//     try {
//       await CustomAxios.post('/auth/register', data);
//       showToast('Đăng ký thành công');
//       navigation.navigate('Login');
//     } catch (error: any) {
//       setErrorMessage(error.response.data.message);
//     }
//   };
//   return (
//     <View
//       style={[
//         globalStyles.container,
//         globalStyles.center,
//         {padding: theme.SIZES.PADDING_HORIZONTAL},
//       ]}>
//       <Text h3 textTransform="uppercase">
//         Đăng ký
//       </Text>

//       {errorMessage && (
//         <Text color="red" size={14}>
//           {errorMessage}
//         </Text>
//       )}
//       <KeyboardAwareScrollView style={{width: '100%'}}>
//         <Controller
//           control={control}
//           rules={RulesRegister.staff_id()}
//           render={({field: {onChange, value}}) => (
//             <Input
//               label="Mã số nhân viên"
//               onChangeText={onChange}
//               value={value?.toUpperCase()}
//               error={errors.staff_id && errors.staff_id.message}
//             />
//           )}
//           name="staff_id"
//         />
//         <Controller
//           control={control}
//           rules={RulesRegister.name()}
//           render={({field: {onChange, value}}) => (
//             <Input
//               label="Họ tên"
//               onChangeText={onChange}
//               value={value}
//               error={errors.name && errors.name.message}
//             />
//           )}
//           name="name"
//         />
//         <Controller
//           control={control}
//           rules={RulesRegister.phone()}
//           render={({field: {onChange, value}}) => (
//             <Input
//               label="Số điện thoại"
//               onChangeText={onChange}
//               value={value}
//               error={errors.phone && errors.phone.message}
//             />
//           )}
//           name="phone"
//         />
//         {openDatePicker && (
//           <RNDateTimePicker
//             testID="registerDatePicker"
//             value={new Date()}
//             mode="date"
//             is24Hour={true}
//             onChange={(event, date: any) => {
//               setOpenDatePicker(false);
//               setDatePickerValue(date);
//               //   setFormData({
//               //     ...formData,
//               //     birthday: new Date(date),
//               //   });
//             }}
//           />
//         )}
//         <View style={{justifyContent: 'flex-end'}}>
//           <Input
//             disable
//             label="Ngày sinh"
//             value={moment(datePickerValue).format('DD-MM-YYYY')}
//             // error={errors.birthday && errors.birthday.message}
//           />
//           <Pressable
//             style={{
//               position: 'absolute',
//               zIndex: 9,
//               right: 10,
//               bottom: '10%',
//             }}>
//             <Calendar
//               size={30}
//               color={theme.COLORS.PRIMARY}
//               variant="Bulk"
//               onPress={() => setOpenDatePicker(true)}
//             />
//           </Pressable>
//         </View>
//         <Controller
//           control={control}
//           rules={RulesRegister.password()}
//           render={({field: {onChange, value}}) => (
//             <Input
//               label="Mật khẩu"
//               password
//               onChangeText={onChange}
//               value={value}
//               error={errors.password && errors.password.message}
//             />
//           )}
//           name="password"
//         />
//       </KeyboardAwareScrollView>

//       <Button onPress={handleSubmit(handleRegister)} loading={isSubmitting}>
//         Đăng ký
//       </Button>
//       <View style={{marginTop: 10, flexDirection: 'row', gap: 4}}>
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

// export default RegisterScreen;
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../../components/Text';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Calendar} from 'iconsax-react-native';
import theme from '../../themes';
import CustomAxios from '../../utils/CustomAxios';
import useToastStore from '../../store/toastStore';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {showToast} = useToastStore();
  // const {authLogin} = useAuthStore();
  // const {showToast} = useToastStore();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    staff_id: '',
    name: '',
    phone: '',
    birthday: new Date(),
    password: '',
  });
  const [loading, setLoading] = useState<boolean>();

  const [errorMessage, setErrorMessage] = useState<string>();
  async function handleSubmit() {
    setLoading(true);
    setErrorMessage('');

    if (
      !formData.staff_id ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin');
    } else if (!/^tp\d+$/gi.test(formData.staff_id)) {
      setErrorMessage('Mã số nhân viên chưa đúng định dạng');
    } else if (formData.name.length < 5) {
      setErrorMessage('Vui lòng nhập đầy đủ họ tên');
    } else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone)) {
      setErrorMessage('SĐT không hợp lệ');
    } else if (formData.password.length < 3) {
      setErrorMessage('Mật khẩu tối thiểu 3 ký tự');
    } else {
      try {
        await CustomAxios.post('/auth/register', formData);
        showToast('Đăng ký thành công');
        navigation.navigate('Login');
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
        Đăng ký
      </Text>
      {errorMessage && (
        <Text error style={{paddingVertical: 10}}>
          {errorMessage}
        </Text>
      )}
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>Mã số nhân viên</Text>
        <TextInput
          id="staff_id"
          style={[globalStyles.formControl]}
          value={formData.staff_id}
          onChangeText={text => setFormData({...formData, staff_id: text})}
          placeholder="TP001, TP002, ..."
        />
      </View>
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>Họ tên</Text>
        <TextInput
          id="staff_id"
          style={[globalStyles.formControl]}
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
        />
      </View>
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>SĐT</Text>
        <TextInput
          id="staff_id"
          style={[globalStyles.formControl]}
          value={formData.phone}
          onChangeText={text => setFormData({...formData, phone: text})}
        />
      </View>
      {openDatePicker && (
        <RNDateTimePicker
          testID="registerDatePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          onChange={(event: DateTimePickerEvent, date: Date) => {
            setOpenDatePicker(false);
            setFormData({
              ...formData,
              birthday: date,
            });
          }}
        />
      )}
      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={globalStyles.formLabel}>Ngày sinh</Text>
        <TextInput
          id="birthday"
          style={[globalStyles.formControl]}
          value={moment(formData.birthday).format('DD/MM/YYYY')}
          editable={false}
        />
        <Pressable
          style={{
            position: 'absolute',
            zIndex: 9,
            right: 10,
            bottom: '10%',
          }}>
          <Calendar
            size={30}
            color={theme.COLORS.PRIMARY}
            variant="Bulk"
            onPress={() => setOpenDatePicker(true)}
          />
        </Pressable>
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
          <Text style={globalStyles.btnText}>Đăng ký</Text>
        )}
      </TouchableOpacity>

      <View style={{marginTop: 10, flexDirection: 'row', gap: 4}}>
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

export default RegisterScreen;
