import React, { useEffect, useState } from "react";
import "./NoticeModal.scss";
import { postNoticeList, putNoticeList } from "../../apis/axios";
const NoticeModal = ({ id, putOrPost, onClose, originData }) => {
  const mode = putOrPost; //http method결정
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    if (mode === "put") {
      setInputData({ title: originData.title, content: originData.content });
    }
  }, []);

  // const{originTitle,originContent}=originData
  const clickPutOrPost = async () => {
    try {
      mode === "post"
        ? await postNoticeList(inputData)
        : await putNoticeList(id, inputData);
      onClose(); //성공하면 모달 닫기
    } catch (error) {
      console.log(".");
    }
  };
  return (
    <div className="NoticeModal">
      <div className="NoticeModal-body" onClick={(e) => e.stopPropagation()}>
        <div className="NoticeModal-body-title">
          <div className="NoticeModal-body-title-item"></div>
          <div className="NoticeModal-body-title-item mid">
            글쓰기{mode === "post" ? " 등록" : " 수정"}
          </div>

          <div
            className="NoticeModal-body-title-item closeBtn"
            onClick={() => clickPutOrPost()}
          >
            완료
          </div>
        </div>
        <div className="NoticeModal-body-article">
          <div className="NoticeModal-body-article-form">
            <div className="NoticeModal-body-article-form-in">
              <label>제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                value={inputData.title}
                onChange={(e) => {
                  setInputData({ ...inputData, title: e.target.value });
                }}
              />
              <div className="errMessage"></div>
            </div>
            <div className="NoticeModal-body-article-form-in">
              <label>남기고 싶은 말을 자세히 적어주세요.</label>
              <textarea
                type="text"
                placeholder="본문을 작성해 주세요"
                value={inputData.content}
                onChange={(e) =>
                  setInputData({ ...inputData, content: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
