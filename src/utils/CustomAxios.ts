import CustomAxios from 'axios';
import {Alert, BackHandler} from 'react-native';
import {storage} from './storage';

// CustomAxios.defaults.baseURL = process.env.BASE_URL;
CustomAxios.defaults.baseURL = 'http://192.168.1.7:3000/';
CustomAxios.defaults.timeout = 5000;
CustomAxios.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: `Bearer ${storage.getString('@ht:token') ?? ''}`,
    Accept: 'application/json',
    ...config.headers,
  };
  return config;
});
CustomAxios.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    console.log('🚀 ~ error:', error);
    if (!error.response || error.response.status === 500) {
      Alert.alert('Lỗi mạng', 'Vui lòng kết nối mạng để tiếp tục', [
        {text: 'OK'},
      ]);
    }
    // if (!error.response || error.response.status === 500) {
    //   Alert.alert(
    //     'Lỗi mạng',
    //     'Ứng dụng chỉ dành cho nội bộ công ty, vui lòng kết nối wifi công ty để tiếp tục.',

    //     [
    //       {
    //         onPress: () => {
    //           BackHandler.exitApp();
    //         },
    //         text: 'Thoát',
    //       },
    //     ],
    //   );
    // }
    return Promise.reject(error);
  },
);
export default CustomAxios;
