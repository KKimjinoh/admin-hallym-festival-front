import { getAuthAxios } from "./authAxios";
/**특정 api에서 토큰을 세팅해서 get요청: 토큰 기반 get이 필요한 곳에서 사용한다*/
export const getAdminBoard = async () => {
  const access = localStorage.getItem("access");
  const authAxios = getAuthAxios(access); //axios객체 생성
  const result = await authAxios.get("/board");
  console.log("adminBoard실행, get호출");
  return result.data;
};
