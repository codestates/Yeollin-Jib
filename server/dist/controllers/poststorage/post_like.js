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
const storage_1 = __importDefault(require("../../models/storage"));
const post_like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.id;
    const { postId } = req.params;
    if (userId && postId) {
        try {
            const postInfo = yield post_1.default.findOne({
                where: {
                    id: postId,
                },
            });
            if (!postInfo) {
                return res.status(403).send({ message: "게시글이 존재하지 않습니다." });
            }
            const [createStorage, exist] = yield storage_1.default.findOrCreate({
                where: {
                    postId,
                    userId,
                },
                defaults: {
                    postId,
                    userId,
                },
            });
            if (!exist) {
                return res
                    .status(200)
                    .send({ message: "이미 찜하기 등록 되었습니다." });
            }
            return res
                .status(201)
                .send({ message: "게시물 찜하기가 성공적으로 등록 되었습니다." });
        }
        catch (err) {
            console.log(err);
            return res.status(501).json({ message: "서버 에러 입니다." });
        }
    }
    else {
        res
            .status(400)
            .send({ message: "회원 또는 포스트 아이디가 존재하지않습니다." });
    }
});
exports.default = post_like;
//# sourceMappingURL=post_like.js.map