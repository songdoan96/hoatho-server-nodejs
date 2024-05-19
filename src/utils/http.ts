import axios, {AxiosInstance} from 'axios';
import {BACKEND_API} from '../constants';
import {Alert} from 'react-native';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: BACKEND_API,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (!error.response || error.response.status === 500) {
          Alert.alert('Lỗi mạng', 'Vui lòng kết nối mạng để tiếp tục', [
            {text: 'OK'},
          ]);
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
