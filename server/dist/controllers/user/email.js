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
const email = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        console.log("email ==========================", email);
        // 로그인된 아이디 정보 찾기
        const result = yield user_1.default.findOne({ where: { email: email } });
        console.log("email_result ==========================", result);
        // email 중복코드
        if (result) {
            return res.status(200).json({ message: `이메일이 중복됩니다.` });
        }
        return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: `서버에러`, error: err, location: "email.ts" });
    }
});
exports.default = email;
