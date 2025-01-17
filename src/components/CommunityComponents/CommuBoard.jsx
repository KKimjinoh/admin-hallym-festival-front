import React, { useState, useEffect } from "react";
import "./CommuBoard.scss";
import CommuDelete from "../Modal/Community/CommuDelete.jsx";
import { getCommunity } from "../../apis/axios.js";
import { useNavigate } from "react-router-dom";

// 라펙토링 시 함수 api분리 및 커스텀 훅 분리하여 선언적 상태 만들기

/**서버로 부터 들어와서 변수로 저장한 시간의 데이터 타입과 로컬시간 변수 타입 확인 하기*/
function parseDateTime(dateTimeStr) {
  const [date, time] = dateTimeStr.split(" ");
  const [month, day] = date.split(".").map(Number); // 문자열을 숫자로 변환
  const [hour, minute] = time.split(":").map(Number); // 문자열을 숫자로 변환
  return { month, day, hour, minute };
}

const CommuBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/");
  }, [navigate]);

  const [clickDot, setClickDot] = useState(false);
  const [articleID, setArticleID] = useState(-1);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await getCommunity();
        const reversedArticle = response.data.reverse(); //얘는 article 잘안찍힘
        setArticle(reversedArticle);
        printDate();
      } catch (error) {
        console.log("커뮤니티 불러오기 안됨");
      }
    };
    fetchCommunityData();
  }, []);

  /**시간 계산하여 각 요소에 띄울 문자열 계산 로직 */
  const printDate = () => {
    article.forEach((item) => {
      /**서버로 받은 시간 파싱하여 사용가능 형태로 가공*/
      const fromServerDate = parseDateTime(item.date); //시간 가공, month, day, hour, minute 4개의 값

      // 여기서 article 배열을 순회하면서 보드에 넣을 시간을 로직에 따라 추가로 넣어줌
      const now = new Date();
      const nowDate = now.getDate(); //일
      const nowHour = now.getHours(); //시
      const nowMin = now.getMinutes(); //분
      if (nowDate !== fromServerDate.day) {
        item.showDate = `${nowDate - fromServerDate.day}일전`;
      } else {
        if (fromServerDate.hour < nowHour) {
          item.showDate = `${nowHour - fromServerDate.hour}시간 전`;
        } else {
          if (fromServerDate.minute < nowMin) {
            item.showDate = `${nowMin - fromServerDate.minute}분 전`;
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
      {article && (
        <div
          className="commuBoard_under_root"
          onClick={() => clickCloseModal()}
        >
          <div className="commuBoard_under_root_under">
            {article.map((item, key) => (
              <div className="communComponent" key={key}>
                <div className="communComponent-bundle">
                  <div className="communComponent-box">
                    <div className="communComponent-box-left">
                      <div className="noName">{item.nickname}</div>
                      <div>{item.showDate}</div>
                    </div>
                    <div
                      className="dot-wrapper"
                      onClick={() => {
                        setClickDot(true);
                        setArticleID(item.id);
                      }}
                    >
                      <svg
                        className="dot"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </div>
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

export default CommuBoard;
