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
          <div className="PlusItem-wrapper-body-content">
            <div>
              <label>물품명을 입력하세요</label>
              <input type="text" placeholder="물품명을 상세히 입력해주세요" />
            </div>
            <div>
              <label>발견위치를 적어주세요</label>
              <input type="text" placeholder="상세하게 적어주면 더 좋습니다" />
            </div>
            <div>
              <label>사진을 등록해주세요</label>
              <div className="pre_img"></div>
              <input type="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusNewLostItem;
