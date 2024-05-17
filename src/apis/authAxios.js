import axios from "axios";
import { getNewRefreshToken } from "./refresh";

//해당 로직은 마이페이지에서 사용, 로그인 시에는 필요하지 않음
export const getAuthAxios = (token) => {
  const accessToken = token;
  const authAxios = axios.create({
    baseURL: "https://kim-sun-woo.com/api/admin",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  authAxios.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response.status === 401) {
        const accessToken = await getNewRefreshToken();
        error.config.headers.Authorization = accessToken;
        localStorage.setItem("access", accessToken.accessToken);
        return (await axios.get(error.config.url, error.config)).data;
      }
    }
  );
  return authAxios;
};
