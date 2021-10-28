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
const category_1 = __importDefault(require("../../models/category"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const post_1 = __importDefault(require("../../models/post"));
const category_find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category1 = req.query.code1;
        const category2 = req.query.code2;
        const find = yield category_1.default.findOne({ where: { category1: category1, category2: category2 } });
        const categoryId = find.id;
        const type = yield post_1.default.findAll({
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: post_category_1.default,
                    where: { categoryId: categoryId },
                    required: true,
                    attributes: ["categoryId"],
                },
            ],
            limit: 4,
        });
        if (!type)
            return res.status(404).send("조회하려는 게시물이 없습니다.");
        res.status(200).send(type);
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = category_find;
//# sourceMappingURL=category.js.map