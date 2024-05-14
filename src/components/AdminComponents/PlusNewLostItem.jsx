import React from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import "./PlusNewLostItem.scss";
const PlusNewLostItem = () => {
  return (
    <div className="PlusItem">
      <Background />
      <AdminHeader headcenter="관리자 분실물 추가" />
      <div className="PlusItem-wrapper">
        <div className="PlusItem-wrapper-head"></div>
        <div className="PlusItem-wrapper-body">
          <div className="PlusItem-wrapper-body-title">
            <div></div>
            <div>등록하기</div>
            <div className="postBtn">등록</div>
          </div>
          <div className="PlusItem-wrapper-body-content"></div>
        </div>
      </div>
    </div>
  );
};

export default PlusNewLostItem;
