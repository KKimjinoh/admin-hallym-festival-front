import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getNewRefreshToken } from "./refresh";

const access = localStorage.getItem("access");

const createInstance = axios.create({
  baseURL: "http://13.209.218.51/api/admin", // 기본 URL 설정
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
      const accessToken = await getNewRefreshToken();
      console.log("reisue 실행");
      error.config.headers.Authorization = accessToken;
      localStorage.setItem("access", accessToken);
      return (await axios.get(error.config.url, error.config)).data;
    }
  }
);

const axiosInstance = rateLimit(createInstance, {
  maxRequests: 10,
  perMilliseconds: 1000,
});
export default axiosInstance;
