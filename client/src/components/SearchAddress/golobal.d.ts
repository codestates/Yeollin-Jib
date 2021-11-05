declare module globalThis {
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
}
