import React, { useEffect } from "react";
import styled from "styled-components";

const KakaoMapViewer = styled.div`
  width: 100%;
  height: 400px;
  div {
    width: 100%;
    height: 400px;
  }
`;

declare global {
  interface Window {
    kakao: any;
  }
}
function KakaoMap() {
  useEffect(() => {
    let mapContainer = document.getElementById("map"); // 지도를 표시할 div
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
      draggable: true,
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let map = new window.kakao.maps.Map(mapContainer, options);
  }, []);

  return (
    <>
      <KakaoMapViewer id={"map"}></KakaoMapViewer>
    </>
  );
}

export default KakaoMap;
