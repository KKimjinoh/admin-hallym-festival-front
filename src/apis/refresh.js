import axios from "axios";
/**refresh토큰 전달해 토큰을 갱신함, access는 헤더, refresh는 바디에 담음*/
export const getNewRefreshToken = async () => {
  console.log("재발급 로직");
  const result = await axios.post(
    "http://localhost:8080/api/admin/reissue", //리프레쉬 토큰 재발급하는 api
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      withCredentials: true,
    }
  );
  return result.data;
};
