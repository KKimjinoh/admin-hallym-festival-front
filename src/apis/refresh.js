import axios from "axios";
/**refresh토큰 전달해 토큰을 갱신함, access는 헤더, refresh는 바디에 담음*/
export const getNewRefreshToken = async () => {
  const result = await axios.post(
    "http://13.209.218.51/api/admin/reissue", //리프레쉬 토큰 재발급하는 api
    // {
    //   refreshToken, //body에 refresh토큰 넣음,header에 accesstoken을 넣음
    // },
    {
      headers: {
        Authorization: `Bearer:${localStorage.getItem("access")}`,
      },
    }
  );
  return result.data;
};
