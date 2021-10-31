// 메인카테고리 type
export interface MainCategories {
  id: string;
  name: string;
  isSelect: boolean;
  subCategories: SubCategories[];
}

interface SubCategories {
  name: string;
  isSelect: boolean;
}
// 메인카테고리 별 서브카테고리 array
// 가구/침구류
const mainCategory1: SubCategories[] = [
  { name: "침대", isSelect: false },
  { name: "티비선반", isSelect: false },
  { name: "이불", isSelect: false },
  { name: "책상", isSelect: false },
  { name: "옷장", isSelect: false },
  { name: "장식장", isSelect: false },
  { name: "베개", isSelect: false },
  { name: "의자", isSelect: false },
  { name: "서랍장", isSelect: false },
  { name: "소파", isSelect: false },
  { name: "매트리스", isSelect: false },
  { name: "책장", isSelect: false },
  { name: "화장대", isSelect: false },
  { name: "스탠드", isSelect: false },
  { name: "인테리어소품", isSelect: false },
  { name: "식탁", isSelect: false },
  { name: "행거", isSelect: false },
  { name: "거울", isSelect: false },
  { name: "기타", isSelect: false },
];
// 디지털기기
const mainCategory2: SubCategories[] = [
  { name: "휴대폰", isSelect: false },
  { name: "모니터", isSelect: false },
  { name: "데스크탑", isSelect: false },
  { name: "노트북", isSelect: false },
  { name: "기타", isSelect: false },
];
// 생활가전
const mainCategory3: SubCategories[] = [
  { name: "티비", isSelect: false },
  { name: "냉장고", isSelect: false },
  { name: "세탁기", isSelect: false },
  { name: "건조기", isSelect: false },
  { name: "청소기", isSelect: false },
  { name: "선풍기", isSelect: false },
  { name: "에어컨", isSelect: false },
  { name: "히터", isSelect: false },
  { name: "전기밥솥", isSelect: false },
  { name: "전자레인지", isSelect: false },
  { name: "에어프라이어", isSelect: false },
  { name: "기타", isSelect: false },
];
// 의류
const mainCategory4: SubCategories[] = [
  { name: "여성의류", isSelect: false },
  { name: "남성의류", isSelect: false },
  { name: "유아동의류", isSelect: false },
  { name: "기타", isSelect: false },
];
// 잡화
const mainCategory5: SubCategories[] = [
  { name: "신발", isSelect: false },
  { name: "가방", isSelect: false },
  { name: "모자", isSelect: false },
  { name: "기타", isSelect: false },
];
// 도서/음반
const mainCategory6: SubCategories[] = [
  { name: "책", isSelect: false },
  { name: "LP", isSelect: false },
  { name: "CD", isSelect: false },
  { name: "DVD", isSelect: false },
  { name: "기타", isSelect: false },
];
// 유아동
const mainCategory7: SubCategories[] = [
  { name: "유모차", isSelect: false },
  { name: "장난감", isSelect: false },
  { name: "카시트", isSelect: false },
  { name: "욕조", isSelect: false },
  { name: "기타", isSelect: false },
];
// 게임/취미
const mainCategory8: SubCategories[] = [
  { name: "닌텐도", isSelect: false },
  { name: "플레이스테이션", isSelect: false },
  { name: "XBOX", isSelect: false },
  { name: "피규어/인형", isSelect: false },
  { name: "기타", isSelect: false },
];
// 스포츠/레저
const mainCategory9: SubCategories[] = [
  { name: "골프", isSelect: false },
  { name: "캠핑", isSelect: false },
  { name: "홈트레이닝용품", isSelect: false },
  { name: "낚시", isSelect: false },
  { name: "구기용품", isSelect: false },
  { name: "자전거", isSelect: false },
  { name: "등산", isSelect: false },
  { name: "기타", isSelect: false },
];
// 반려동물용품
const mainCategory10: SubCategories[] = [
  { name: "강아지", isSelect: false },
  { name: "고양이", isSelect: false },
  { name: "기타", isSelect: false },
];
// 기타
const mainCategory11: SubCategories[] = [{ name: "기타", isSelect: false }];

// Create Post 카테고리 선택창 Left
export const initLeftMainCategories: MainCategories[] = [
  {
    id: "1",
    name: "가구/침구류",
    isSelect: false,
    subCategories: mainCategory1,
  },
  {
    id: "2",
    name: "디지털기기",
    isSelect: false,
    subCategories: mainCategory2,
  },
  { id: "3", name: "생활가전", isSelect: false, subCategories: mainCategory3 },
  { id: "4", name: "의류", isSelect: false, subCategories: mainCategory4 },
  { id: "5", name: "잡화", isSelect: false, subCategories: mainCategory5 },
  { id: "6", name: "도서/음반", isSelect: false, subCategories: mainCategory6 },
];

// Create Post 카테고리 선택창 Right
export const initRightMainCategories: MainCategories[] = [
  { id: "7", name: "유아동", isSelect: false, subCategories: mainCategory7 },
  { id: "8", name: "게임/취미", isSelect: false, subCategories: mainCategory8 },
  {
    id: "9",
    name: "스포츠/레저",
    isSelect: false,
    subCategories: mainCategory9,
  },
  {
    id: "10",
    name: "반려동물용품",
    isSelect: false,
    subCategories: mainCategory10,
  },
  { id: "11", name: "기타", isSelect: false, subCategories: mainCategory11 },
];
