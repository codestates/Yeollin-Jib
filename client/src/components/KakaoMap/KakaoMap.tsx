import { useEffect } from "react";
import styled from "styled-components";

const KakaoMapViewer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 430px;
  padding-top: 25px;

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
  addressInput?: string | undefined;
  searchCoordinateHandle?: (lat: number, lon: number) => void;
  latitude?: string | undefined;
  longitude?: string | undefined;
}

const KakaoMap = ({
  addressInput,
  searchCoordinateHandle,
  latitude,
  longitude,
}: AddressName) => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성
    let geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색 : 주소값이 없으면 실행하지 않음
    if (addressInput !== "") {
      geocoder.addressSearch(addressInput, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          let coords;
          if (latitude !== undefined) {
            coords = { La: longitude, Ma: latitude };
          } else {
            coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          }
          if (searchCoordinateHandle) {
            searchCoordinateHandle(result[0].y, result[0].x);
          }

          // 지도 우측에 확대 축소 컨트롤을 생성
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          const imageSrc = "images/mapMarker.png"; // 마커 이미지 주소
          const imageSize = new window.kakao.maps.Size(60, 72); // 마커 이미지 크기
          const imageOption = {
            offset: new window.kakao.maps.Point(20, 69), // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
          };

          const markerImage = new window.window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 결과값으로 받은 위치를 마커로 표시
          let marker = new window.kakao.maps.Marker({
            image: markerImage,
            position: coords,
          });

          // 마커가 지도 위에 표시되도록 설정
          marker.setMap(map);

          // 카카오맵에서 검색되도록 주소에서 공백을 지워줌
          const searchAddress = addressInput?.replace(/ /g, "");

          // customOverlay CSS
          var content = `<a style="text-decoration: none;" href=https://map.kakao.com/link/search/${searchAddress} target="_blank">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #fff; border: 1px solid #e0dde1; border-radius: 0.313rem; width: 100%; height: 100%; padding: 10px; margin-bottom: 200px; cursor: pointer;">
          <span style="font-family: Gmarket Sans TTF; color: #2d2d2d; font-weight: 300; font-size: 1rem; margin-bottom: 5px;">열린집 위치</span>
          <span style="font-family: Gmarket Sans TTF; color: #2d2d2d; font-weight: 100; font-size: 0.9rem;">${addressInput}</span>
          </div>
          </a>`;

          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: marker.getPosition(),
            content: content,
            map: map,
          });

          // 커스텀 오버레이를 지도에 표시
          customOverlay.setMap(map);

          // 지도의 중심을 결과값으로 받은 위치로 이동
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
