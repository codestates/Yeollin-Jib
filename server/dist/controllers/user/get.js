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
    const userId = req.body.id;
    try {
        const findUser = yield user_1.default.findOne({
            where: { id: userId },
        });
        if (!findUser) {
            return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
        }
        const userInfo = yield user_1.default.findAll({
            where: { id: userId },
            attributes: ["id", "email", "nickname", "userArea", "imagePath"],
        });
        const { id, email, nickname, userArea, imagePath } = userInfo[0].dataValues;
        const data = { id, email, nickname, userArea, imagePath };
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = get;
//# sourceMappingURL=get.js.map