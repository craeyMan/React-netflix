import axios from "axios";

const API_TOKEN = process.env.REACT_APP_TMDB_BEARER;  // v4 읽기 액세스 토큰

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,  // ✅ 반드시 Bearer + 공백
  },
});

// 요청, 응답 인터셉터는 api 인스턴스에 붙여야 함!
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
