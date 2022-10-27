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
import JISA from "../data/jisa";
import KUKSA from "../data/kuksa";

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
  const [kuksa, setKuksa] = useState("");
  const [finalKuksa, setFinalKuksa] = useState("");
  const [jisa, setJisa] = useState("");
  let tempJisa = "";
  let tempKuksa = KUKSA["용인"];
  // useEffect(() => {
  //   setFinalDate(getFormatDate(startDate));
  // }, [startDate]);

  const onChangeHandler = (e) => {
    setKuksa(e.currentTarget.value);
  };

  const onChangeJisaHandler = (e) => {
    setJisa(e.currentTarget.value);
  };

  useEffect(() => {
    tempJisa = jisa;
    tempKuksa = KUKSA[tempJisa];
    console.log(tempKuksa);
  }, [jisa]);
  const handleClick = () => {
    setFinalDate(getFormatDate(startDate));
    setFinalKuksa(kuksa);
  };

  return (
    <div>
      <div className="container is-mobile">
        <Nav />
        <section class="section">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">지사 </p>
              </div>
              <div class="level-item">
                <div className="select">
                  <select
                    className="select"
                    value={jisa}
                    onChange={(e) => onChangeJisaHandler(e)}
                  >
                    {JISA.map((item, index) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="level-item">
                <p class="subtitle is-5">국사</p>
              </div>
              <div class="level-item">
                <div className="select">
                  <select
                    className="select"
                    value={kuksa}
                    onChange={(e) => onChangeHandler(e)}
                  >
                    {KUKSA[jisa].map((item, index) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
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
              <div class="level-item">
                <button className="button is-primary" onClick={handleClick}>
                  조회하기
                </button>
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
        <GongsaTable date={finalDate} jisa={finalKuksa} />
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
