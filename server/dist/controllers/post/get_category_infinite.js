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
const category_1 = __importDefault(require("../../models/category"));
const storage_1 = __importDefault(require("../../models/storage"));
const sequelize_1 = __importDefault(require("sequelize"));
const { or, and, gt, lt, overlap } = sequelize_1.default.Op;
const get_category_infinite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNum = req.query.page; // page Number
        const categoryNumber = req.query.code;
        let categoryNumbers = [];
        // 무한스크롤 offset 설정
        let offset = 0;
        if (pageNum > 1) {
            offset = 8 * (pageNum - 1);
        }
        // 대분류 해당 코드 categoryNumbers 배열에 나눔
        const categoryGet = yield category_1.default.findAll({
            where: { category1: categoryNumber },
        });
        for (let i = 0; i < categoryGet.length; i++) {
            categoryNumbers.push(categoryGet[i].id);
        }
        // 카테고리 대분류
        const postGet = yield post_1.default.findAndCountAll({
            attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
            order: [["id", "DESC"]],
            limit: 8,
            offset: offset,
            distinct: true,
            include: [
                {
                    model: post_category_1.default,
                    attributes: ["postId", "categoryId", "Boolean"],
                    where: { categoryId: { [or]: categoryNumbers } },
                },
                {
                    model: user_1.default,
                    attributes: ["nickname", "imagePath"],
                },
                {
                    model: storage_1.default,
                    attributes: ["userId"],
                },
            ],
        });
        if (postGet.rows.length === 0) {
            return res
                .status(200)
                .send({ message: "더이상 조회할 게시물이 없습니다." });
        }
        res.status(200).send({ postGet });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get_category_infinite;
//# sourceMappingURL=get_category_infinite.js.map