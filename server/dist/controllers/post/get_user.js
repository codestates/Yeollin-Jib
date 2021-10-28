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
const sequelize_1 = __importDefault(require("sequelize"));
const post_1 = __importDefault(require("../../models/post"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const category_1 = __importDefault(require("../../models/category"));
const { or, and, gt, lt } = sequelize_1.default.Op;
const get_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.cookies.id; //유저아이디
        const postGet = yield post_1.default.findAll({
            attributes: ["id", "userId", "title", "address"],
            where: { userId: id },
            include: [
                {
                    model: post_category_1.default,
                    required: false,
                    attributes: ["categoryId"],
                    include: [
                        {
                            model: category_1.default,
                            required: false,
                            attributes: ["category1", "category2"],
                        },
                    ],
                },
            ],
        });
        if (!postGet)
            return res.status(404).send({ message: "작성한 게시물이 없습니다." });
        res.status(200).send({ data: postGet });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get_user;
//# sourceMappingURL=get_user.js.map