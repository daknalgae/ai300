import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import GongsaMap from "../components/GongsaMap";
import GongsaStatus from "../components/GongsaStatus";
import GongsaTable from "../components/GonsaTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "../components/Nav";
import styled from "styled-components";
import sunny from "../images/sunny.png";
import cloud from "../images/cloud.png";
import rainy from "../images/downpour.png";
import snow from "../images/snowflake.png";
import storm from "../images/dark-and-stormy.png";

const SDatePicker = styled(DatePicker)`
  magin-top: 1.5rem;
  height: 36px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  border: 0.5px solid lightGray;
  font-size: 14px;
`;

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState("");
  const [jisa, setJisa] = useState("");

  useEffect(() => {
    setFinalDate(getFormatDate(startDate));
  }, [startDate]);

  const onChangeHandler = (e) => {
    setJisa(e.currentTarget.value);
  };

  return (
    <div className="App">
      <Nav />
      <div className="container">
        <section class="section">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">지사 </p>
              </div>
              <div class="level-item">
                <div className="select">
                  <select
                    value={jisa}
                    onChange={(e) => onChangeHandler(e)}
                    className="select"
                  >
                    <option>강남</option>
                    <option>강동</option>
                    <option>경광주</option>
                    <option>고덕</option>
                    <option>과천</option>
                    <option>남수원</option>
                    <option>남양</option>
                    <option>동수원</option>
                    <option>동탄</option>
                    <option>모란</option>
                    <option>반포</option>
                    <option>북수원</option>
                    <option>분당</option>
                    <option>서수원</option>
                    <option>서초</option>
                    <option>성남</option>
                    <option>송탄</option>
                    <option>송파</option>
                    <option>수내</option>
                    <option>수서</option>
                    <option>수원</option>
                    <option>수지</option>
                    <option>신갈</option>
                    <option>신사</option>
                    <option>안성</option>
                    <option>안중</option>
                    <option>양재</option>
                    <option>여주</option>
                    <option>영통</option>
                    <option>오산</option>
                    <option>용인</option>
                    <option>이천</option>
                    <option>장호원</option>
                    <option>조암</option>
                    <option>평택</option>
                    <option>하남</option>
                    <option>화성</option>
                  </select>
                </div>
              </div>
              <div class="level-item">
                <p class="subtitle is-5">날짜 </p>
              </div>
              <div class="level-item">
                <SDatePicker
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p class="subtitle is-5">날씨 </p>
              </div>
              <figure class="image is-64x64">
                <img class="is-rounded" src={sunny} />
              </figure>
            </div>
          </nav>
        </section>

        <GongsaStatus />
        <GongsaTable date={finalDate} jisa={jisa} />
        <GongsaMap />
        <Footer />
      </div>
    </div>
  );
};

function getFormatDate(date) {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
}

export default Home;
