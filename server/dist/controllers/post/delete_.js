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
const comment_1 = __importDefault(require("../../models/comment"));
const storage_1 = __importDefault(require("../../models/storage"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.cookies.id; //유저 아이디
        const postId = req.params.id; //게시물 아이디
        const postDelete = yield post_1.default.destroy({ where: { id: postId } });
        yield comment_1.default.destroy({ where: { postId } });
        yield storage_1.default.destroy({ where: { postId } });
        yield post_category_1.default.destroy({ where: { postId } });
        if (!postDelete)
            return res.status(404).json({ message: "삭제하려는 게시물이 없습니다." });
        res.status(201).json({ message: "게시물이 삭제되었습니다." });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = delete_;
//# sourceMappingURL=delete_.js.map