import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const KakaoMapViewer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 430px;
  padding-top: 25px;
  margin-top: 40px;

  @media screen and (max-width: 37.5rem) {
    height: 300px;
    width: 100%;
  }
`;

declare global {
  interface Window {
    kakao: any;
  }
}
interface AddressName {
  addressInput?: string;
}

const KakaoMap = ({ addressInput }: AddressName) => {
  const [mapCenter, setMapCenter] = useState<number[]>([]);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center:
        mapCenter[0] === undefined
          ? new window.kakao.maps.LatLng(33.450701, 126.570667)
          : new window.kakao.maps.LatLng(mapCenter[0], mapCenter[1]),
      level: 3,
    };
    console.log(mapCenter);

    let map = new window.kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다 주소값이 없으면 실행하지 않는다.
    if (addressInput !== "") {
      geocoder.addressSearch(addressInput, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          let searchCenter = [];
          searchCenter.push(result[0].y);
          searchCenter.push(result[0].x);
          setMapCenter(searchCenter);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          let infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">열린집</div>',
          });

          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    }
  }, [addressInput]);

  return (
    <div className="KakaoMap">
      <KakaoMapViewer id="map" />
    </div>
  );
};

export default KakaoMap;
