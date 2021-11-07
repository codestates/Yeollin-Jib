import { useEffect, useRef } from "react";
import styled from "styled-components";

const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

interface AddressSearch {
  searchAddressHandle: (address: string) => void;
}

const AddressBtn = styled.button`
  outline: none;
  border: 1px solid #2d2d2d;
  background: #2d2d2d;
  border-radius: 0.313rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: white;
  height: 3rem;
  width: 115px;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: 0.5s font-size, height, width;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s font-size, height, width;
    height: 2.6rem;
    width: 115px;
  }
`;

export default function SearchAddress({ searchAddressHandle }: AddressSearch) {
  const postcodeRef = useRef<HTMLDivElement | null>(null);

  const loadLayout = () => {
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data) {
          searchAddressHandle(data.address);
        },
      });
      postcode.open();
    });
  };

  useEffect(() => {
    const isAlready = document.getElementById(id);

    if (!isAlready) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      document.body.append(script);
    }
  }, []);

  return (
    <>
      <AddressBtn onClick={loadLayout}>주소 검색</AddressBtn>
      <div ref={postcodeRef}></div>
    </>
  );
}
