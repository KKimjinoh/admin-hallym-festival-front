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
      <Background hasPub={true} />
      <AdminHeader headcenter="관리자 공지사항" />
      <div className="admin_notice-container">
        <div className="admin_notice-container-wrapper">
          {(!clickRewrite || !clickWrite) && (
            <>
              <div className="admin_notice-container-wrapper-list">
                {notices.map((notice) => {
                  const content = notice.content || notice.title;
                  const isTitleAsContent = !notice.content;
                  return (
                    <div key={notice.id} className="items">
                      {notice.content && (
                        <div className="items_head">
                          <div className="title">
                            <p>{notice.title}</p>
                          </div>
                        </div>
                      )}
                      <div
                        className={`content ${isTitleAsContent ? "bold" : ""}`}
                      >
                        <p>{content}</p>
                        <svg
                          className="rewrite"
                          onClick={() => {
                            setNoticeID(notice.id);
                            setClickItem("put");
                            setPutDate({
                              title: notice.title,
                              content: content,
                            });
                            setClickRewrite(true);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M36.4 360.9L13.4 439 1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1L73 498.6l78.1-23c12.4-3.6 23.7-9.9 33.4-18.4c1.4-1.2 2.7-2.5 4-3.8L492.7 149.3c21.9-21.9 24.6-55.6 8.2-80.5c-2.3-3.5-5.1-6.9-8.2-10L453.3 19.3c-25-25-65.5-25-90.5 0L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4zm46 13.5c1.7-5.6 4.5-10.8 8.4-15.2c.6-.6 1.1-1.2 1.7-1.8L321 129 383 191 154.6 419.5c-4.7 4.7-10.6 8.2-17 10.1l-23.4 6.9L59.4 452.6l16.1-54.8 6.9-23.4z" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
                <div className="items_head">
                  <div className="title_under">
                    <div id="under_item">※공지사항은 삭제가 불가합니다.※</div>
                  </div>
                  <div className="rewrite"></div>
                </div>
              </div>
              <div className="admin_notice-container-wrapper-btn">
                <div
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
