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

  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     //비동기 작업을 위해서 "Promise"를 통한 비동기 작업 정의
  //     Resizer.imageFileResizer(
  //       //Resizer의 "imageFileResize"메서드를 통해서 이미지 리사이징 및 인코딩 옵션 정의
  //       file,
  //       200, //이미지 너비
  //       200, //이미지 높이
  //       "JPEG", //파일 형식
  //       100, //이미지 퀄리티(100으로 해도 이미지 리사이징시 상당히 깨지긴 한다)
  //       0 /* rotation */,
  //       (uri) => {
  //         /* resize new image with url*/
  //         resolve(uri);
  //       },
  //       "base64" /* output Type */ //"blob"으로 정의할 수 있다.
  //     );
  //   });

  const handleImageChange = async (e) => {
    const img = await e.target.files[0];
    setImageFile(e.target.files[0]);

    const previews = [];
    previews.push(URL.createObjectURL(img));
    setPreImageURL(previews[0]);

    // const supporttedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
    // if (!supporttedFormats.includes(img.type)) {
    //   //업로드한 이미지가 정의된 형식에 맞지 않는다면 경고창 띄우기
    //   alert(
    //     "지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요."
    //   );
    //   return;
    // }
    // try {
    //   const compressedFile = await resizeFile(img);
    //   console.log("image incoding after:", compressedFile);
    //   setImageFile(compressedFile);
    // } catch (error) {
    //   console.log("file resizing faild");
    // }
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
                <div className="pre_img" style={{ display: "inline-block" }}>
                  <img
                    src={preImageURL}
                    style={{ width: "300px", height: "300px" }}
                  />
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
