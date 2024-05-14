import "./AdminHeader.scss";
import { useNavigate } from "react-router-dom";
const AdminHeader = ({ headcenter }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (headcenter !== "관리자 분실물" || headcenter !== "관리자 커뮤니티") {
      navigate("/admin"); // -1을 넘겨 이전 페이지로 이동
    }
    // if (headcenter === "관리자 분실물") {
    //   console.log("관리자 분실물");
    //   navigate("/searchlostitem");
    // } else if (headcenter === "관리자 커뮤니티") {
    //   console.log("관리자 커뮤니티");
    //   navigate("/searchcommunity");
    // }
  };
  const clickSearch = () => {
    if (headcenter === "관리자 분실물") {
      console.log("관리자 분실물");
      navigate("/searchlostitem");
    } else if (headcenter === "관리자 커뮤니티") {
      console.log("관리자 커뮤니티");
      navigate("/searchcommunity");
    }
  };
  return (
    <header className="adminheader">
      <div className="goBack" onClick={handleGoBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </div>
      <div className="adminheader-center">{headcenter}</div>
      <div className="search_box" onClick={() => clickSearch()}>
        {(headcenter === "관리자 분실물" ||
          headcenter === "관리자 커뮤니티") && (
          <svg
            className="search"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
