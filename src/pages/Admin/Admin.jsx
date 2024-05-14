import React from "react";
import "./Admin.scss";
import { Background } from "../../components";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { LoginAtom } from "../../recoil/LoginAtom";
//렌더링 시 로그인 여부로 로
//로그인 httponly해보고 안되면 기존
const Admin = () => {
  const setLoginAtomState = useSetRecoilState(LoginAtom);

  const clickLogout = () => {
    const logoutTrue = confirm("로그아웃하시겠습니까?");
    console.log(logoutTrue);
    if (logoutTrue) {
      setLoginAtomState(false);
      localStorage.removeItem("access"); //access토큰 삭제}
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
