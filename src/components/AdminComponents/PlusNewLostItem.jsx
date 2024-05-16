import { React, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlusNewLostItem.scss";
// import Resizer from "react-image-file-resizer";
import { useRecoilValue } from "recoil";
import { LoginAtom } from "../../recoil/LoginAtom.js";
import { useEffect } from "react";
const PlusNewLostItem = () => {
  const isLogin = useRecoilValue(LoginAtom); // Recoil 상태를 가져옴
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate("/");
  }, []);

  const [stringData, setStringData] = useState({
    name: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preImageURL, setPreImageURL] = useState("");

  const handleImageChange = async (e) => {
    const img = await e.target.files[0];
    setImageFile(e.target.files[0]);

    const previews = [];
    previews.push(URL.createObjectURL(img));
    setPreImageURL(previews[0]);
  };

  const clickPostData = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", stringData.name);
    formData.append("location", stringData.location);

    try {
      const response = await axios.post(
        "http://13.209.218.51/api/admin/find",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("전송선공");
        navigate(-1);
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
            <div className="box1"></div>
            <div className="box2">등록하기</div>
            <div className="postBtn" onClick={() => clickPostData()}>
              등록
            </div>
          </div>
          <div className="PlusItem-wrapper-body-content">
            <div className="input-box">
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
            <div className="input-box">
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
            <div className="image_box">
              <div className="image_box_wrapper">
                <div className="pre_img">
                  <img src={preImageURL} />
                </div>
                <label htmlFor="file">
                  <div className="btn-upload">파일 업로드하기</div>
                </label>
                <input
                  accept="image/*"
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlusNewLostItem;
