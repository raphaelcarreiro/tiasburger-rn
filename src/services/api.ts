import axios, { CancelTokenSource } from 'axios';
import storage from '@react-native-community/async-storage';
import { API_URL } from '../constants/constants';
import { RESTAURANT_ID } from '../../restaurantConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    RestaurantId: RESTAURANT_ID,
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
