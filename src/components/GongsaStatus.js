import React, { useEffect, useState } from "react";
import no from "../images/no.png";
import ongoing from "../images/ongoing.png";
import complete from "../images/complete.png";
import MyResponsiveBar from "./MyResponsiveBar";
import STATUS from "../data/status";

const GongsaStatus = ({ date, jisa, kuksa }) => {
  const [not, setNot] = useState(0);
  const [going, setGoing] = useState(0);
  const [completeGongsa, setCompleteGongsa] = useState(0);
  const [jisaNot, setJisaNot] = useState(0);
  const [jisaGoing, setJisaGoing] = useState(0);
  const [jisaCompleteGongsa, setJisaCompleteGongsa] = useState(0);
  useEffect(() => {
    console.log(kuksa);
    // STATUS.find((obj) => {
    //   // return obj.kuksa === jisa;
    //   if (obj.kuksa === jisa) {
    //     console.log(obj.status);
    //   }
    // });
    console.log(STATUS);
    STATUS.map((item) => {
      if (item.kuksa === kuksa) {
        if (item.status === "진행중") {
          setGoing(item.cnt);
        } else if (item.status === "미진행") {
          setNot(item.cnt);
        } else if (item.status === "공사완료") {
          setCompleteGongsa(item.cnt);
        }
      }
    });

    STATUS.map((item) => {
      if (item.jisa === jisa + "지사") {
        if (item.status === "진행중") {
          setJisaGoing((prev) => prev + item.cnt);
        } else if (item.status === "미진행") {
          setJisaNot((prev) => prev + item.cnt);
        } else if (item.status === "공사완료") {
          setJisaCompleteGongsa((prev) => prev + item.cnt);
        }
      }
    });
    console.log(jisaNot, jisaGoing, jisaCompleteGongsa);
  }, [jisa, kuksa]);
  return (
    <div className="box">
      <div className="content">
        <h3>사외공사 진행현황</h3>
      </div>
      <nav className="level is-mobile">
        <div className="level-left">
          <div
            className="level-item has-text-centered"
            style={{ padding: "30px" }}
          >
            <div>
              <figure className="image is-64x64">
                <img className="is-rounded" src={no} />
              </figure>
              <p className="heading">미진행</p>
              <p className="title">{not}</p>
            </div>
          </div>
          <div
            className="level-item has-text-centered"
            style={{ padding: "30px" }}
          >
            <div>
              <figure className="image is-64x64">
                <img className="is-rounded" src={ongoing} />
              </figure>
              <p className="heading">진행중</p>
              <p className="title">{going}</p>
            </div>
          </div>
          <div className="level-right">
            <div
              className="level-item has-text-centered"
              style={{ padding: "30px" }}
            >
              <div>
                <figure className="image is-64x64">
                  <img className="is-rounded" src={complete} />
                </figure>
                <p className="heading">공사완료</p>
                <p className="title">{completeGongsa}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="level-item has-text-centered"
          style={{ height: "400px" }}
        >
          <MyResponsiveBar />
        </div>
      </nav>
    </div>
  );
};

export default GongsaStatus;
