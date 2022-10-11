import React, { useEffect, useRef } from "react";
import { SAMPLE_GONGSA } from "./sampleGongsaData";

const GongsaMap = () => {
  const mapElement = useRef(null);

  const testMarkers = [
    {
      title: "하수관 정비공사",
      latitude: "37.490681",
      longitude: "127.012871",
    },
    {
      title: "도시관 배관공사",
      latitude: "37.510563",
      longitude: "127.097397",
    },
    {
      title: "상수도 공사",
      latitude: "37.496899",
      longitude: "127.045631",
    },
    {
      title: "지하철 굴착공사",
      latitude: "37.505203",
      longitude: "127.046959",
    },
  ];
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
      zoom: 12,
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
    SAMPLE_GONGSA.forEach((element) => {
      const marker = new naver.maps.Marker({
        map,
        title: element.gongsa,
        position: new naver.maps.LatLng(element.longitude, element.latitude),
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
    });

    const getClickHandler = (seq) => {
      return (e) => {
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
  }, []);

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
