import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import NoticeModal from "../AdminModal/NoticeModal.jsx";
import "./AdminNotice.scss";
import { getNoticeList } from "../../apis/axios.js";
import { useNavigate } from "react-router-dom";
const AdminNotice = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  const [notices, setNotices] = useState([]);
  const [clickRewrite, setClickRewrite] = useState(false);
  const [clickWrite, setClickWrite] = useState(false);
  const [clickItem, setClickItem] = useState("");
  const [noticeID, setNoticeID] = useState(-1);
  const [putDate, setPutDate] = useState({
    title: "",
    content: "",
  });
  const closeModal = () => {
    setClickRewrite(false);
    setClickWrite(false);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await getNoticeList();
      setNotices(response.data);
    };
    fetchNotices();
  }, []);
  const handleCloseModal = () => {
    if (clickRewrite || clickWrite) {
      closeModal();
    }
  };
  return (
    <div className="admin_notice" onClick={handleCloseModal}>
      <Background />
      <AdminHeader headcenter="관리자 공지사항" />
      <div className="admin_notice-container">
        <div className="admin_notice-container-wrapper">
          {(!clickRewrite || !clickWrite) && (
            <>
              <div className="admin_notice-container-wrapper-list">
                {notices.map((notice) => (
                  <div key={notice.id} className="items">
                    <div className="items_head">
                      <div className="title">
                        <p>{notice.title}</p>
                      </div>
                      <div
                        className="rewrite"
                        onClick={() => {
                          setNoticeID(notice.id);
                          setClickItem("put");
                          setPutDate({
                            title: notice.title,
                            content: notice.content,
                          });
                          setClickRewrite(true);
                        }}
                      >
                        수정
                      </div>
                    </div>

                    <div className="content">
                      <p>{notice.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="admin_notice-container-wrapper-btn">
                <div //svg 쓰기로 바꾸기
                  className="modal_bnt"
                  onClick={() => {
                    setClickItem("post");
                    setClickWrite(true);
                  }}
                ></div>
              </div>
            </>
          )}
        </div>

        {(clickRewrite || clickWrite) && (
          <NoticeModal
            id={noticeID}
            putOrPost={clickItem}
            onClose={() => closeModal()}
            originData={putDate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminNotice;
