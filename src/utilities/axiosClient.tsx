import axios, { AxiosError, AxiosResponse } from 'axios';

export const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

clientAxios.interceptors.request.use(
  (request) => {
    const token: any = localStorage.getItem('token');
    request.headers['Authorization'] = 'Bearer ' + token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
