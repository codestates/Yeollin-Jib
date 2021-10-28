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
const user_1 = __importDefault(require("../../models/user"));
const nick_name = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname } = req.query;
        // 로그인된 아이디 정보 찾기
        const userByNick = yield user_1.default.findOne({
            where: { nickname: nickname || nickname.toUpperCase() },
        });
        // nickname 중복코드
        if (userByNick) {
            return res.status(200).json({ message: `닉네임이 중복됩니다.` });
        }
        return res.status(200).json({ message: `사용할 수 있는 닉네임입니다.` });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = nick_name;
//# sourceMappingURL=nickname.js.map