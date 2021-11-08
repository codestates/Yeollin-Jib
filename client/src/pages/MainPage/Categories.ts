// 메인카테고리 type
export interface MainCategories {
  id: string;
  name: string;
  isSelect: boolean;
  subCategories: SubCategories[];
}

interface SubCategories {
  id: number;
  name: string;
  isSelect: boolean;
}
// 메인카테고리 별 서브카테고리 array
// 가구/침구류
const subCategory1: SubCategories[] = [
  { id: 1, name: "침대", isSelect: false },
  { id: 2, name: "티비선반", isSelect: false },
  { id: 3, name: "이불", isSelect: false },
  { id: 4, name: "책상", isSelect: false },
  { id: 5, name: "옷장", isSelect: false },
  { id: 6, name: "장식장", isSelect: false },
  { id: 7, name: "베개", isSelect: false },
  { id: 8, name: "의자", isSelect: false },
  { id: 9, name: "서랍장", isSelect: false },
  { id: 10, name: "소파", isSelect: false },
  { id: 11, name: "매트리스", isSelect: false },
  { id: 12, name: "책장", isSelect: false },
  { id: 13, name: "화장대", isSelect: false },
  { id: 14, name: "스탠드", isSelect: false },
  { id: 15, name: "인테리어소품", isSelect: false },
  { id: 16, name: "식탁", isSelect: false },
  { id: 17, name: "행거", isSelect: false },
  { id: 18, name: "거울", isSelect: false },
  { id: 19, name: "기타", isSelect: false },
];
// 디지털기기
const subCategory2: SubCategories[] = [
  { id: 20, name: "휴대폰", isSelect: false },
  { id: 21, name: "모니터", isSelect: false },
  { id: 22, name: "데스크탑", isSelect: false },
  { id: 23, name: "노트북", isSelect: false },
  { id: 24, name: "기타", isSelect: false },
];
// 생활가전
const subCategory3: SubCategories[] = [
  { id: 25, name: "티비", isSelect: false },
  { id: 26, name: "냉장고", isSelect: false },
  { id: 27, name: "세탁기", isSelect: false },
  { id: 28, name: "건조기", isSelect: false },
  { id: 29, name: "청소기", isSelect: false },
  { id: 30, name: "선풍기", isSelect: false },
  { id: 31, name: "에어컨", isSelect: false },
  { id: 32, name: "히터", isSelect: false },
  { id: 33, name: "전기밥솥", isSelect: false },
  { id: 34, name: "전자레인지", isSelect: false },
  { id: 35, name: "에어프라이어", isSelect: false },
  { id: 36, name: "기타", isSelect: false },
];
// 의류
const subCategory4: SubCategories[] = [
  { id: 37, name: "여성의류", isSelect: false },
  { id: 38, name: "남성의류", isSelect: false },
  { id: 39, name: "유아동의류", isSelect: false },
  { id: 40, name: "기타", isSelect: false },
];
// 잡화
const subCategory5: SubCategories[] = [
  { id: 41, name: "신발", isSelect: false },
  { id: 42, name: "가방", isSelect: false },
  { id: 43, name: "모자", isSelect: false },
  { id: 44, name: "기타", isSelect: false },
];
// 도서/음반
const subCategory6: SubCategories[] = [
  { id: 45, name: "책", isSelect: false },
  { id: 46, name: "LP", isSelect: false },
  { id: 47, name: "CD", isSelect: false },
  { id: 48, name: "DVD", isSelect: false },
  { id: 49, name: "기타", isSelect: false },
];
// 유아동
const subCategory7: SubCategories[] = [
  { id: 50, name: "유모차", isSelect: false },
  { id: 51, name: "장난감", isSelect: false },
  { id: 52, name: "카시트", isSelect: false },
  { id: 53, name: "욕조", isSelect: false },
  { id: 54, name: "기타", isSelect: false },
];
// 게임/취미
const subCategory8: SubCategories[] = [
  { id: 55, name: "닌텐도", isSelect: false },
  { id: 56, name: "플레이스테이션", isSelect: false },
  { id: 57, name: "XBOX", isSelect: false },
  { id: 58, name: "피규어/인형", isSelect: false },
  { id: 59, name: "기타", isSelect: false },
];
// 스포츠/레저
const subCategory9: SubCategories[] = [
  { id: 60, name: "골프", isSelect: false },
  { id: 61, name: "캠핑", isSelect: false },
  { id: 62, name: "홈트레이닝용품", isSelect: false },
  { id: 63, name: "낚시", isSelect: false },
  { id: 64, name: "구기용품", isSelect: false },
  { id: 65, name: "자전거", isSelect: false },
  { id: 66, name: "등산", isSelect: false },
  { id: 67, name: "기타", isSelect: false },
];
// 반려동물용품
const subCategory10: SubCategories[] = [
  { id: 68, name: "강아지", isSelect: false },
  { id: 69, name: "고양이", isSelect: false },
  { id: 70, name: "기타", isSelect: false },
];
// 기타
const subCategory11: SubCategories[] = [
  { id: 71, name: "기타", isSelect: false },
];

// 메인 카테고리 init
export const initMainCategories: MainCategories[] = [
  {
    id: "1",
    name: "가구/침구류",
    isSelect: true,
    subCategories: subCategory1,
  },
  {
    id: "2",
    name: "디지털기기",
    isSelect: false,
    subCategories: subCategory2,
  },
  { id: "3", name: "생활가전", isSelect: false, subCategories: subCategory3 },
  { id: "4", name: "의류", isSelect: false, subCategories: subCategory4 },
  { id: "5", name: "잡화", isSelect: false, subCategories: subCategory5 },
  { id: "6", name: "도서/음반", isSelect: false, subCategories: subCategory6 },
  { id: "7", name: "유아동", isSelect: true, subCategories: subCategory7 },
  { id: "8", name: "게임/취미", isSelect: false, subCategories: subCategory8 },
  {
    id: "9",
    name: "스포츠/레저",
    isSelect: false,
    subCategories: subCategory9,
  },
  {
    id: "10",
    name: "반려동물용품",
    isSelect: false,
    subCategories: subCategory10,
  },
  { id: "11", name: "기타", isSelect: false, subCategories: subCategory11 },
];

// export const MainCategoriesData: MainCategories[] = [
//   {
//     id: "1",
//     name: "가구/침구류",
//     isSelect: true,
//     subCategories: subCategory1,
//   },
//   {
//     id: "2",
//     name: "디지털기기",
//     isSelect: false,
//     subCategories: subCategory2,
//   },
//   { id: "3", name: "생활가전", isSelect: false, subCategories: subCategory3 },
//   { id: "4", name: "의류", isSelect: false, subCategories: subCategory4 },
//   { id: "5", name: "잡화", isSelect: false, subCategories: subCategory5 },
//   { id: "6", name: "도서/음반", isSelect: false, subCategories: subCategory6 },
//   { id: "7", name: "유아동", isSelect: true, subCategories: subCategory7 },
//   { id: "8", name: "게임/취미", isSelect: false, subCategories: subCategory8 },
//   {
//     id: "9",
//     name: "스포츠/레저",
//     isSelect: false,
//     subCategories: subCategory9,
//   },
//   {
//     id: "10",
//     name: "반려동물용품",
//     isSelect: false,
//     subCategories: subCategory10,
//   },
//   { id: "11", name: "기타", isSelect: false, subCategories: subCategory11 },
// ];
