import { cookieUtils } from '@/utils/cookie';
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://service-orifine.codealign.co';
const _signature = process.env.NEXT_PUBLIC_SIGN || '';
const prefix = '/api';


const $axios = axios.create({
    baseURL: `${BASE_URL}${prefix}`,
    timeout: 30000,
});


$axios.interceptors.request.use((config) => {
    const token = cookieUtils.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$axios.defaults.headers.common['x-client-sign'] = _signature

export default $axios;
