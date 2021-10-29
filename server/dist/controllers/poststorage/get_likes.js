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
const storage_1 = __importDefault(require("../../models/storage"));
const post_1 = __importDefault(require("../../models/post"));
const user_1 = __importDefault(require("../../models/user"));
const get_likes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.id;
    try {
        yield storage_1.default
            .findAll({
            include: [
                {
                    model: post_1.default,
                    attributes: [
                        "userId",
                        "title",
                        "contents",
                        "imagePath",
                        "address",
                        "dueDate",
                    ],
                },
                {
                    model: user_1.default,
                    attributes: ["nickname"],
                },
            ],
            where: {
                userId,
            },
        })
            .then((data) => {
            res.status(200).json({
                data,
                message: "찜한 게시물이 성공적으로 조회되었습니다.",
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get_likes;
//# sourceMappingURL=get_likes.js.map