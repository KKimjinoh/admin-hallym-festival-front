import React from "react";
import "./CommuDelete.scss";
import { deleteCommunityDetail } from "../../../apis/axios";

const CommuDelete = ({ id, closeModal }) => {
  const deleteArticle = async () => {
    try {
      //delete 메소드 성공 여부, test일 경우 undefined
      const result = await deleteCommunityDetail(id);
      console.log(result);
      //delete 완료시 모달 닫음
      if (result) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delete-overlay" onClick={closeModal}>
      <div className="delete" onClick={(e) => e.stopPropagation()}>
        <div className="delete-body">
          <div className="delete-body-title">삭제하시겠습니까?</div>
          <p>삭제하시면 다시 되돌릴 수 없습니다.</p>
        </div>
        <div className="delete-btn" onClick={() => deleteArticle()}>
          삭제하기
        </div>
      </div>
    </div>
  );
};

export default CommuDelete;
