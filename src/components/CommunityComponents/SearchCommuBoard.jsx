import React, { useState, useEffect } from "react";
import "./CommuBoard.scss";
import CommuDelete from "../Modal/Community/CommuDelete.jsx";
import { getCommunity } from "../../apis/axios.js";

// Function to parse date and time string
function parseDateTime(dateTimeStr) {
  const [date, time] = dateTimeStr.split(" ");
  const [month, day] = date.split(".").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return { month, day, hour, minute };
}

const SearchCommuBoard = ({ searchText }) => {
  const [clickDot, setClickDot] = useState(false);
  const [articleID, setArticleID] = useState(-1);
  const [article, setArticle] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await getCommunity();
        const reversedArticles = response.data.reverse();
        setArticle(reversedArticles);
        printDate();
      } catch (error) {
        console.log("Failed to fetch community data");
      }
    };
    fetchCommunityData();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = article.filter(
        (article) =>
          article.content.includes(searchText) ||
          Number(searchText) === article.id
      );

      setFilteredArticles(filtered);
      console.log(filteredArticles);
    } else {
      setFilteredArticles(article);
    }
  }, [searchText, article]);

  const printDate = () => {
    article.map((item) => {
      /**서버로 받은 시간 파싱하여 사용가능 형태로 가공*/
      const fromServerDate = parseDateTime(item.date); //시간 가공,month, day, hour, minute 4개의 값

      //여기서 article배열을 순회하면서 보드에 넣을 시간을 로직에 따라 추가로 넣어줌
      const now = new Date();
      const nowDate = now.getDate(); //일
      const nowHour = now.getHours(); //시
      const nowMin = now.getMinutes(); //분
      if (nowDate !== fromServerDate.day) {
        nowDate - fromServerDate.day;
        item.showDate = `${nowDate - fromServerDate.day}일전`;
      } else {
        if (fromServerDate.hour < nowHour) {
          item.showDate = `${-1 * (fromServerDate.hour - nowHour)}시간 전`;
        } else {
          if (fromServerDate.minute < nowMin) {
            item.showDate = `${-1 * (fromServerDate.minute - nowMin)}분 전`;
          } else {
            item.showDate = "지금";
          }
        }
      }
    });
  };
  const clickCloseModal = () => {
    if (clickDot) {
      setClickDot(false);
    }
  };

  return (
    <div className="commuBoard_root">
      {filteredArticles && (
        <div
          className="commuBoard_under_root"
          onClick={() => clickCloseModal()}
        >
          <div className="commuBoard_under_root_under">
            {filteredArticles.map((item, key) => (
              <div className="communComponent" key={key}>
                <div className="communComponent-bundle">
                  <div className="communComponent-box">
                    <div className="communComponent-box-left">
                      <div className="noName">{item.nickname}</div>
                      <div>{item.showDate}</div>
                    </div>
                    <svg
                      className="dot"
                      onClick={() => {
                        setClickDot(true);
                        setArticleID(item.id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </div>
                  <div className="communComponent-body">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
          {clickDot && (
            <CommuDelete id={articleID} closeModal={() => setClickDot(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCommuBoard;
