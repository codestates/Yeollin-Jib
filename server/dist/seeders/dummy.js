"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../models/category"));
const user_1 = __importDefault(require("../models/user"));
const userCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.create({
        nickname: "codemon",
        email: "codemon@gmail.com",
        password: "1234",
        salt: "1234",
    });
});
const categoryCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < gory.length; i++) {
        const category1 = gory[i][0];
        const category2 = gory[i][1];
        yield category_1.default.create({ category1: category1, category2: category2 });
    }
});
const gory = [
    ["1", "침대"],
    ["1", "티비선반"],
    ["1", "이불"],
    ["1", "책상"],
    ["1", "옷장"],
    ["1", "장식장"],
    ["1", "베개"],
    ["1", "의자"],
    ["1", "서랍장"],
    ["1", "소파"],
    ["1", "매트리스"],
    ["1", "책장"],
    ["1", "화장대"],
    ["1", "스탠드"],
    ["1", "인테리어소품"],
    ["1", "식탁"],
    ["1", "행거"],
    ["1", "거울"],
    ["1", "기타"],
    ["2", "휴대폰"],
    ["2", "모니터"],
    ["2", "데스크탑"],
    ["2", "노트북"],
    ["2", "기타"],
    ["3", "티비"],
    ["3", "냉장고"],
    ["3", "세탁기"],
    ["3", "건조기"],
    ["3", "청소기"],
    ["3", "선풍기"],
    ["3", "에어컨"],
    ["3", "히터"],
    ["3", "전기밥솥"],
    ["3", "전자레인지"],
    ["3", "에어프라이어"],
    ["3", "기타"],
    ["4", "여성의류"],
    ["4", "남성의류"],
    ["4", "유아동의류"],
    ["4", "기타"],
    ["5", "신발"],
    ["5", "가방"],
    ["5", "모자"],
    ["5", "기타"],
    ["6", "책"],
    ["6", "LP"],
    ["6", "CD"],
    ["6", "DVD"],
    ["6", "기타"],
    ["7", "유모차"],
    ["7", "장난감"],
    ["7", "카시트"],
    ["7", "욕조"],
    ["7", "기타"],
    ["8", "닌텐도"],
    ["8", "플레이스테이션"],
    ["8", "XBOX"],
    ["8", "피규어/인형"],
    ["8", "기타"],
    ["9", "골프"],
    ["9", "캠핑"],
    ["9", "홈트레이닝용품"],
    ["9", "낚시"],
    ["9", "구기용품"],
    ["9", "자전거"],
    ["9", "등산"],
    ["9", "기타"],
    ["10", "강아지"],
    ["10", "고양이"],
    ["10", "기타"],
    ["11", "기타"],
];
categoryCreate();
userCreate();
//# sourceMappingURL=dummy.js.map