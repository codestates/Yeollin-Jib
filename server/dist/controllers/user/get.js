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
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const findUser = yield user_1.default.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
        }
        const userInfo = yield user_1.default.findAll({
            where: { id: userId },
            attributes: ["id", "email", "nickname"],
        });
        const { id, email, nickname } = userInfo[0].dataValues;
        const data = { id, email, nickname };
        res.status(200).json({ data: data });
        // 401 유효하지 않은 토큰
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: `서버에러`, error: err, location: "get.ts" });
    }
});
exports.default = get;
