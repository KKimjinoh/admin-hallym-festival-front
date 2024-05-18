import { React, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import Background from "../Layout/Background.jsx";
import SearchCommuBoard from "../CommunityComponents/SearchCommuBoard.jsx";
import "./SearchCommunity.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SearchCommunity = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, []);

  const [searchText, setSearchText] = useState("");
  return (
    <div className="SearchCommunity">
      <Background />
      <AdminHeader headcenter="관리자 커뮤니티 검색" />
      <div className="SearchCommunity-container">
        <div className="SearchCommunity-container-wrapper">
          <div className="SearchCommunity-container-wrapper-search">
            <label>글 찾기</label>
            <input
              type="text"
              placeholder="여기에 입력해주세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="SearchCommunity-container-wrapper-board">
            <SearchCommuBoard searchText={searchText} />
          </div>
          <div className="SearchCommunity-container-wrapper-board"></div>
          <div className="post_bnt_wrapper">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCommunity;
