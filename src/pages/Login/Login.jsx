import { React, useState } from "react";
import { loginApi } from "../../apis/loginApi";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components";
import "./Login.scss";
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  // const isLogin = useRecoilValue(LoginAtom); // Recoil 상태를 가져옴

  const navigate = useNavigate();

  // const setLoginAtom = useSetRecoilState(LoginAtom);

  const submitLogin = async () => {
    // e.preventDefault(); //submit시 기본 브라우저 동작인 새로고침을 막음

    try {
      const accessToken = await loginApi(
        loginForm.username,
        loginForm.password
      );
      localStorage.setItem("access", accessToken.data.accessToken); // 추후 해시 암호화 하기
      console.log("localstorage에 저장");
      navigate("/admin");
    } catch (error) {
      console.log("로그인 실패, recoil: login state= ");
    }
  };

  return (
    <div className="login">
      <Background hasLogo={true} />
      <div className="login-container">
        <div className="login-container-empty">관리자</div>
        <div className="login-container-login">
          <div className="login-container-login-form">
            <div className="login-container-login-form-div">
              <label className="login_label" htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                name="id"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="login-container-login-form">
            <div className="login-container-login-form-div">
              <label className="login_label" htmlFor="pw">
                패스워드
              </label>
              <input
                type="password"
                id="pw"
                name="pw"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div></div>
        </div>
        <div className="login-container-btn">
          <div className="inbtn" onClick={() => submitLogin()}>
            로그인
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
