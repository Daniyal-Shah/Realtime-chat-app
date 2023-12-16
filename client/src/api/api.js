import axios from 'axios';
import { store } from '../redux/store/store';
import { cleanStore } from '../redux/slices/userSlice';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = store.getState().loggedInUser.token;

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      store.dispatch(cleanStore());
    }

    return Promise.reject(error);
  },
);
