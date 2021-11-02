import { useEffect, useRef } from "react";

const id = "daum-postcode"; // script가 이미 rending 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

interface AddressSearch {
  searchAddressHandle: (address: string) => void;
}

export default function SearchAddress({ searchAddressHandle }: AddressSearch) {
  type DaumPostcodeData = {
    zonecode: number;
    address: string;
    addressEnglish: string;
    addressType: "R" | "J";
    userSelectedType: "R" | "J";
    noSelected: "Y" | "N";
    userLanguageType: "K" | "E";
    roadAddress: string;
  };

  type DaumPostcodeSearchData = {
    q?: string;
    count?: boolean;
  };

  type DaumPostcodeOption = {
    oncomplete?: (data: DaumPostcodeData) => void;
    onclose?: () => void;
    onresize?: () => void;
    onsearch?: (data: DaumPostcodeSearchData) => void;
    width?: number | string;
    height?: number | string;
    animation?: boolean;
    focusInput?: boolean;
    autoMapping?: boolean;
  };

  type PostcodeOperator = {
    open: () => void;
    embed: (wrap: Element, options: { q: string; autoClose: boolean }) => void;
  };

  interface Window {
    daum: {
      Postcode: new (options?: DaumPostcodeOption) => PostcodeOperator;
      postcode: {
        load: (fn: () => void) => void;
      };
    };
  }

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
      <button onClick={loadLayout}>주소검색</button>
      <div ref={postcodeRef}></div>
    </>
  );
}
