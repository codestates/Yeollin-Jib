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
const comment_1 = __importDefault(require("../../models/comment"));
const post_c = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const { contents } = req.body;
    const userId = req.cookies.id;
    try {
        const userInfo = yield user_1.default.findOne({
            where: {
                id: userId,
            },
            attributes: ["nickname", "imagePath"],
        });
        const payload = {
            nickname: userInfo.nickname,
            imagePath: userInfo.imagePath,
        };
        yield comment_1.default
            .create({
            userId: userId,
            postId: parseInt(postId),
            contents, // 댓글 내용
        })
            .then((result) => {
            let data = Object.assign(Object.assign({}, result.dataValues), { user: { nickname: userInfo.nickname, imagePath: userInfo.imagePath } });
            res.status(200).json({
                data,
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = post_c;
//# sourceMappingURL=post_c.js.map