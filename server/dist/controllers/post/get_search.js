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
const post_1 = __importDefault(require("../../models/post"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const storage_1 = __importDefault(require("../../models/storage"));
const sequelize_1 = __importDefault(require("sequelize"));
const { or, and, gt, lt, like, iLike } = sequelize_1.default.Op;
const get_search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNum = req.query.page; // page Number
        const code = req.query.code;
        const search = req.query.search;
        let offset = 0;
        if (pageNum > 1) {
            offset = 8 * (pageNum - 1);
        }
        // 제목 검색
        if (code === "title") {
            const postGet = yield post_1.default.findAndCountAll({
                attributes: [
                    "id",
                    "userId",
                    "title",
                    "address",
                    "dueDate",
                    "imagePath",
                ],
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                where: {
                    title: {
                        [like]: "%" + search + "%",
                    },
                },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
            if (postGet.rows.length === 0) {
                return res
                    .status(200)
                    .send({ message: "더이상 조회할 게시물이 없습니다." });
            }
            return res.status(200).send({ postGet });
        }
        // 주소 검색
        if (code === "address") {
            const postGet = yield post_1.default.findAndCountAll({
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                where: {
                    address: {
                        [like]: "%" + search + "%",
                    },
                },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
            if (postGet.rows.length === 0) {
                return res
                    .status(200)
                    .send({ message: "더이상 조회할 게시물이 없습니다." });
            }
            return res.status(200).send({ postGet });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get_search;
//# sourceMappingURL=get_search.js.map