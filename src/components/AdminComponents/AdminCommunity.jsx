import React from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import CommuBoard from "../CommunityComponents/CommuBoard.jsx";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./AdminCommunity.scss";
const AdminCommunity = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);
  return (
    <div className="AdminCommunity">
      <Background />
      <AdminHeader headcenter="관리자 커뮤니티" />
      <div className="AdminCommunity-container">
        <div className="AdminCommunity-container-wrapper">
          <div className="AdminCommunity-container-wrapper-notice">
            <div>
              해당 커뮤니티는 축제 관련 커뮤니티입니다.<br></br>축제 커뮤니티에
              부적절한 내용은 <br></br>필터링 및 법적 조치가 진행될 수 있습니다.
            </div>
          </div>

          <div className="AdminCommunity-container-wrapper-board">
            <CommuBoard />
          </div>
          <div className="post_bnt_wrapper">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunity;
