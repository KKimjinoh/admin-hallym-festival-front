import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getNewRefreshToken } from "./refresh";

const access = localStorage.getItem("access");

const createInstance = axios.create({
  baseURL: "https://kim-sun-woo.com/api/admin", // 기본 URL 설정
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${access}`,
  },
  withCredentials: true,
});

createInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log("interceptors", error);
    if (
      error.response.status === 401 ||
      error.response.message === "토큰오류"
    ) {
      try {
        const accessToken = await getNewRefreshToken();
        console.log("재발급 실행");
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem("access", accessToken);

        // 원래 요청을 복제하고 다시 시도함
        return axios.request(error.config);
      } catch (tokenError) {
        console.error("토큰 재발급 실패", tokenError);
        return Promise.reject(tokenError);
      }
    }
    return Promise.reject(error);
  }
);

const axiosInstance = rateLimit(createInstance, {
  maxRequests: 10,
  perMilliseconds: 1000,
});
export default axiosInstance;
