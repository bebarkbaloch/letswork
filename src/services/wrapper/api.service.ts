import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { constants } from '../../utils/constants';
import { GetToken } from '../../utils/helpers';


axios.defaults.baseURL = constants.BASE_URL;

axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error(error);
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export const axiosService = axios;

export const api = axios.create({
    timeout: 60 * 1000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token: string | null = GetToken();
        config.headers = config.headers || {};
        config.headers['x-access-token'] = token || '';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
