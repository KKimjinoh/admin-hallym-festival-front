import React from "react";
import "./CommuDelete.scss";
import { deleteCommunityDetail } from "../../../apis/axios";
const CommuDelete = ({ id, closeModal }) => {
  const deleteArticle = async () => {
    try {
      //delete메소드 성공 여부, test일 경우 undefined
      const result = await deleteCommunityDetail(id);
      console.log(result);
      //delete완료시 모달 닫음
      if (result) {
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delete" onClick={(e) => e.stopPropagation()}>
      <div className="delete-body">
        댓글을 삭제하시면 다시 되돌릴 수 없습니다.
      </div>
      <div className="delete-btn" onClick={() => deleteArticle()}>
        삭제하기
      </div>
    </div>
  );
};
//페스워드 입력받음 입력받은 패스워드랑 id 보내고 id에 해당하는 패스워드랑 같은지 확인
export default CommuDelete;
