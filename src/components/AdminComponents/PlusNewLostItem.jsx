import { React, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import "./PlusNewLostItem.scss";
import axios from "axios";
const PlusNewLostItem = () => {
  const [stringData, setStringData] = useState({
    name: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preImageURL, setPreImageURL] = useState("");
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    const previews = [];
    previews.push(URL.createObjectURL(e.target.files[0]));
    setPreImageURL(previews[0]);
  };

  const clickPostData = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", stringData.name);
    formData.append("location", stringData.location);

    try {
      const response = await axios.post(
        "http://13.209.218.51/api/find",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("전송선공");
      }
    } catch (error) {
      console.log("전송실패");
    }
  };

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
            <div className="postBtn" onClick={() => clickPostData()}>
              등록
            </div>
          </div>
          <div className="PlusItem-wrapper-body-content">
            <div>
              <label>물품명을 입력하세요</label>
              <input
                type="text"
                placeholder="물품명을 상세히 입력해주세요"
                value={stringData.name}
                onChange={(e) =>
                  setStringData({ ...stringData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>발견위치를 적어주세요</label>
              <input
                type="text"
                placeholder="상세하게 적어주면 더 좋습니다"
                value={stringData.location}
                onChange={(e) =>
                  setStringData({ ...stringData, location: e.target.value })
                }
              />
            </div>
            <div>
              <label>사진을 등록해주세요</label>
              <div className="pre_img" style={{ display: "inline-block" }}>
                <img
                  src={preImageURL}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusNewLostItem;
