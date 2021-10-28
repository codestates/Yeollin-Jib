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
const post_1 = __importDefault(require("../../models/post"));
const sequelize_1 = __importDefault(require("sequelize"));
const { or, and, gt, lt } = sequelize_1.default.Op;
const get_infinite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // 게시물 ID
        console.log("----------", id);
        const postGet = yield post_1.default.findAll({
            where: { id: { [lt]: id } },
            order: [["createdAt", "DESC"]],
            attributes: ["id", "userId", "title", "address"],
            limit: 4,
        });
        const data = postGet.length;
        if (data !== 4) {
            if (data === 0) {
                return res.status(200).send({ message: "더이상 조회할 게시물이 없습니다." });
            }
            return res.status(200).send({ postGet, message: "더이상 조회할 게시물이 없습니다." });
        }
        res.status(200).send({ postGet });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get_infinite;
//# sourceMappingURL=get_infinite.js.map