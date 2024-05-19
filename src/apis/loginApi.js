import axios from "axios";

export const loginApi = async (id, pw) => {
  try {
    const response = await axios.post(
      "https://kim-sun-woo.com/api/admin/login",
      {
        username: id,
        password: pw,
      },
      {
        withCredentials: true,
        //http only cookie 허용 ->refresh토큰 가져옴, 클라이언트 측에서 확인 불가
      }
    );
    return response;
  } catch (error) {
    alert("로그인 실패");
    console.log("loginApi 함수: 로그인 실패!", error);
  }
};
