import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api2.topnfe.com.br/api/client/',
  headers: {
    RestaurantId: 1,
  },
});

export default api;
