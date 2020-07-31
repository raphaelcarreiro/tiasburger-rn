import axios from 'axios';

// const baseURL = 'https://api2.topnfe.com.br/api/client/';
const baseURL = 'http://10.0.2.2:8000/api/client/';

const api = axios.create({
  baseURL,
  headers: {
    RestaurantId: 1,
  },
});

export default api;
