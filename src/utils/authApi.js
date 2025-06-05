import axios from 'axios';
import { toast } from 'react-toastify';

// 토큰 포함된 Axios 인스턴스 생성
const authApi = axios.create({
  baseURL: 'http://localhost:3500',
});

// 요청 인터셉터 - 토큰 자동 추가
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 토큰 만료 시 로그아웃 처리
let isLogout = false;

authApi.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || '';

    const isTokenExpired =
      message.includes('만료') || message.toLowerCase().includes('expired');

    if ((status === 401 || status === 403) && isTokenExpired && !isLogout) {
      isLogout = true;
      toast.info('⏰ 로그인 시간이 만료되어 로그아웃됩니다.');

      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default authApi;
