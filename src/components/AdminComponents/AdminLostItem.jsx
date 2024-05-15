import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import { deleteLostItem, getLostList } from "../../apis/axios.js";
import { useNavigate } from "react-router-dom";
import "./AdminLostItem.scss";

const AdminLostItem = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  // 데이터 리스트 get
  const dataList = async () => {
    try {
      await getLostList().then((res) => {
        const newTime = res.data.map((item) => {
          const formattedTime = new Date(item.upload_time).toLocaleString(
            "ko-KR",
            {
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }
          );
          return { ...item, upload_time: formattedTime };
        });

        setData(newTime);
        setLoad(true);
        console.log(res.data[0].upload_time);
      });
      console.log("데이터 수신");
    } catch (e) {
      console.error("데이터 에러", e);
    }
  };
  useEffect(() => {
    dataList();
  }, []);

  const clilckDeleteLostItem = async (id) => {
    try {
      setLoad(false);
      const response = await deleteLostItem(id);
      if (response) {
        console.log("삭제되었습니다.");
        await dataList(); // 삭제 후 데이터 새로고침
      }
    } catch (error) {
      console.log("삭제안됨!!!!!!!!!!!!", error);
      setLoad(true);
    }
  };

  const plusNewLostItem = () => {
    navigate("/plusitem");
  };
  return (
    <div className="lostItem">
      <Background />
      <AdminHeader headcenter="관리자 분실물" />
      {load ? (
        <div className="list_wrapper">
          {data.map((it, index) => (
            <div className="item_wrapper" key={index}>
              <img src={it.image_url} alt={it.name} />
              <div className="text">
                <div className="text-t1">
                  <div className="item_name">물품명: {it.name}</div>
                  <svg
                    onClick={() => clilckDeleteLostItem(it.id)}
                    className="trash"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </div>
                <div className="text-t2">발견위치: {it.location}</div>
                <div className="text-t3">{it.upload_time}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="loading">로딩중...</h2>
      )}
      <div className="modal_bnt_wrapper" onClick={() => plusNewLostItem()}>
        <div className="modal_bnt"></div>
      </div>
    </div>
  );
};

export default AdminLostItem;
