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
const post_category_1 = __importDefault(require("../../models/post_category"));
const sequelize_1 = __importDefault(require("sequelize"));
const { or, and, gt, lt } = sequelize_1.default.Op;
const patch_category = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, categoryId } = req.body;
        if (!postId)
            return res.status(400).send({ message: "게시물 ID가 없습니다." });
        if (!categoryId)
            return res.status(400).send({ message: "카테고리 ID가 없습니다." });
        const gory = categoryId.split(",");
        for (let i = 0; i < gory.length; i++) {
            const find = yield post_category_1.default.findOne({
                where: { postId: postId, categoryId: gory[i] },
            });
            if (find.Boolean === true)
                yield post_category_1.default.update({ Boolean: false }, { where: { postId: postId, categoryId: gory[i] } });
            else {
                yield post_category_1.default.update({ Boolean: true }, { where: { postId: postId, categoryId: gory[i] } });
            }
        }
        res.status(200).send({ message: "정보 수정이 완료되었습니다" });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = patch_category;
//# sourceMappingURL=patch_category.js.map