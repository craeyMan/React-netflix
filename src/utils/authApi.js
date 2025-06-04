import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:3500',
});

// ✅ 요청 전에 토큰 잘 붙는지 로그 확인
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('[authApi] 요청 URL:', config.url);
  console.log('[authApi] 첨부된 토큰:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('[authApi] 요청 인터셉터 오류:', error);
  return Promise.reject(error);
});

// ✅ 응답 에러 로그도 확인
authApi.interceptors.response.use(
  response => response,
  error => {
    console.error('[authApi] 응답 오류:', error?.response?.status, error?.response?.data);
    return Promise.reject(error);
  }
);

export default authApi;
