import axios, { CancelTokenSource } from 'axios';
import storage from '@react-native-community/async-storage';

const baseURL = 'https://api2.topnfe.com.br/api/client/';
// const baseURL = 'http://10.0.2.2:8000/api/client/';

const api = axios.create({
  baseURL,
  headers: {
    RestaurantId: 20,
  },
});

api.interceptors.request.use(
  async config => {
    const token = await storage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  async err => {
    if (err.response && err.response.status === 401) {
      await storage.removeItem('token');
    }
    return Promise.reject(err);
  },
);

export function getCancelTokenSource(): CancelTokenSource {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
}

export default api;
