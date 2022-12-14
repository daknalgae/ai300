import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SAMPLE_DATA from "../data/ai";
import { SAMPLE_GONGSA } from "./sampleGongsaData";

const GongsaMap = ({ date, jisa }) => {
  const [gongsa, setGongsa] = useState([]);
  const mapElement = useRef(null);

  useEffect(() => {
    // axios({
    //   method: "GET",
    //   url:
    //     "http://220.93.122.144:3000/ailine/list?date=" +
    //     date +
    //     "&kuksa=" +
    //     jisa,
    //   header: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json;charset=UTP-8",
    //   },
    //   responseType: "type",
    // })
    //   .then(function (response) {
    //     setGongsa(response.data);
    //   })
    //   .catch((Error) => {
    //     console.log(Error);
    //   });
    if (date !== "" && jisa !== "") {
      setGongsa(SAMPLE_DATA[jisa]);
    }
    // setGongsa(SAMPLE_DATA[jisa]);
  }, [date, jisa]);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(
      37.38198723416358,
      127.11889083734368
    );
    const mapOptions = {
      center: location,
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    // new naver.maps.Marker({
    //   position: location,
    //   map,
    // });

    let markers = new Array();
    let infoWindows = new Array();
    let count = 0;
    gongsa.forEach((element) => {
      naver.maps.Service.geocode(
        { address: element.site },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("Something wrong!");
          }
          const marker = new naver.maps.Marker({
            map,
            title: element.gongsa,
            position: new naver.maps.LatLng(
              response.result.items[0].point.y,
              response.result.items[0].point.x
            ),
          });
          const infoWindow = new naver.maps.InfoWindow({
            content:
              '<div style="width:300px; text-align:center;padding:10px;"><b>' +
              element.gongsa +
              "</b><br> - 주소 : " +
              element.site +
              " </div>",
          });

          markers.push(marker);
          infoWindows.push(infoWindow);
        }
      );
    });

    const getClickHandler = (seq) => {
      return (e) => {
        console.log(seq);
        // 마커를 클릭하는 부분
        var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
          infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker); // 표출
        }
      };
    };

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i)); // 클릭한 마커 핸들러
    }
  }, [gongsa]);

  return (
    <div className="box">
      <div className="content">
        <h3>사외공사 순회점검 우선순위 리스트</h3>
      </div>
      <div ref={mapElement} style={{ minHeight: "600px" }} />
    </div>
  );
};

export default GongsaMap;
