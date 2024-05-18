import React, { useEffect } from "react";
import "./Admin.scss";
import { Background } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginAtom } from "../../recoil/LoginAtom";
import { useSetRecoilState } from "recoil";
import { logout } from "../../apis/logout";
//렌더링 시 로그인 여부로
//로그인 httponly해보고 안되면 기존
const Admin = () => {
  const isLogin = useRecoilValue(LoginAtom); // Recoil 상태를 가져옴
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate("/");
  }, []);

  const setLoginAtomState = useSetRecoilState(LoginAtom);

  const clickLogout = async () => {
    const logoutTrue = confirm("로그아웃하시겠습니까?");

    console.log(logoutTrue);
    if (logoutTrue) {
      try {
        const result = await logout();
        console.log(result);
        setLoginAtomState(false);
        localStorage.removeItem("access"); //access토큰 삭제
      } catch (error) {
        console.log(error);
        console.log("로그아웃 실패");
      }
    }
  };
  return (
    <div className="Admin">
      <Background hasLogo={true} />

      <div className="Admin-container">
        <div className="Admin-container-wrapper2">
          <div className="Admin-container-wrapper2-left">
            <Link
              to="/notice"
              className="Admin-container-wrapper2-left-schedule"
            >
              <p>공지사항</p>
            </Link>
            <Link
              to="/community"
              className="Admin-container-wrapper2-left-community"
            >
              <p>커뮤니티</p>
            </Link>
          </div>

          <Link to="/lostItem" className="Admin-container-wrapper2-reservation">
            <p>분실물</p>
          </Link>
        </div>
        <div className="Admin-container-wrapper3">
          <div
            className="Admin-container-wrapper3-lostItem"
            onClick={() => clickLogout()}
          >
            <p>로그아웃</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
