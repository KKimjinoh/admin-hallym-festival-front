import React from "react";
import "./QR.scss";
import QRImage from "../../assets/admin0521.png";
import Logo2 from "../../assets/logo2.png";
const QR = () => {
  return (
    <div className="qr">
      <div className="qr-container">
        <div className="qr-container-logo">
          <img src={Logo2} alt="logo" />
        </div>
        <div className="qr-container-contants">
          <p>관리자페이지</p>
          <p>2024. 05. 21 ~ 2024.05.24</p>
          <p>-하단의 QR코드를 통해 모바일로 접속해주세요-</p>
        </div>
        <div className="qr-container-QRimage">
          <img src={QRImage} alt="QR" />
        </div>
      </div>
    </div>
  );
};

export default QR;
