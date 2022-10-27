import React from "react";
import no from "../images/no.png";
import ongoing from "../images/ongoing.png";
import complete from "../images/complete.png";
import MyResponsiveBar from "./MyResponsiveBar";

const GongsaStatus = () => {
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
              <p className="title">123</p>
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
              <p className="title">50</p>
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
                <p className="title">13</p>
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
