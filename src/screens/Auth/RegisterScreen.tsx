import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'iconsax-react-native';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../components/Text';
import useToastStore from '../../store/toastStore';
import {globalStyles} from '../../styles/globalStyles';
import theme from '../../themes';
import CustomAxios from '../../utils/CustomAxios';
import {groups} from '../../utils/groups';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {showToast} = useToastStore();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [userGroup, setUserGroup] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [formData, setFormData] = useState({
    staff_id: '',
    name: '',
    phone: '',
    birthday: new Date(),
    password: '',
    userGroup: '',
  });

  async function handleSubmit() {
    setLoading(true);
    setErrorMessage('');

    if (
      !formData.staff_id ||
      !formData.password ||
      !formData.name ||
      !formData.phone ||
      !formData.userGroup
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
        {flex: 1, width: '100%', paddingHorizontal: '5%'},
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
          keyboardType="phone-pad"
          id="phone"
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
            bottom: 10,
          }}>
          <Calendar
            size={30}
            color={theme.COLORS.PRIMARY}
            variant="Bulk"
            onPress={() => setOpenDatePicker(true)}
          />
        </Pressable>
      </View>
      <View style={{width: '100%', marginBottom: 20, position: 'relative'}}>
        <Text style={globalStyles.formLabel}>Tổ</Text>
        <TextInput
          id="birthday"
          style={[globalStyles.formControl]}
          editable={false}
        />

        <Picker
          style={{position: 'absolute', bottom: 0, zIndex: 10, width: '100%'}}
          selectedValue={formData.userGroup}
          onValueChange={(itemValue, itemIndex) => {
            // setUserGroup(itemValue);
            setFormData({
              ...formData,
              userGroup: itemValue,
            });
          }}>
          {groups &&
            groups?.map(line => (
              <Picker.Item
                key={line.value}
                label={line.label}
                value={line.value}
              />
            ))}
        </Picker>
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
