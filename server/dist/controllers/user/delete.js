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
const comment_1 = __importDefault(require("../../models/comment"));
const user_1 = __importDefault(require("../../models/user"));
const storage_1 = __importDefault(require("../../models/storage"));
const post_1 = __importDefault(require("../../models/post"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers;
        if (!header) {
            return res.status(403).json({ message: "잘못된 요청입니다." });
        }
        else {
            const userId = req.cookies.id;
            const findPostId = yield post_1.default.findAll({
                where: { userId },
                attributes: ["id"],
            });
            // 내가 쓴 게시글의 id를 받아서 하나씩 다 지워주기
            let postId;
            if (findPostId) {
                for (let i = 0; i < findPostId.length; i++) {
                    postId = findPostId[i].dataValues.id;
                    yield comment_1.default.destroy({ where: { postId } });
                    yield storage_1.default.destroy({ where: { postId } });
                    yield post_category_1.default.destroy({ where: { postId } });
                }
            }
            yield user_1.default.destroy({ where: { id: userId } });
            yield comment_1.default.destroy({ where: { userId } });
            yield storage_1.default.destroy({ where: { userId } });
            yield post_1.default.destroy({
                where: {
                    userId,
                },
            });
            return res
                .status(200)
                .cookie("refreshToken", "")
                .setHeader("authorization", "")
                .json({ message: "회원탈퇴가 완료 되었습니다." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = delete_;
//# sourceMappingURL=delete.js.map