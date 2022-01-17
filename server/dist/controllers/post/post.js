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
const category_1 = __importDefault(require("../../models/category"));
const post_category_1 = __importDefault(require("../../models/post_category"));
const post_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.cookies.id;
        const image = req.files;
        const images = image.map((value) => {
            return String(value.path);
        });
        const imagePath = images.join(",");
        const { title, contents, address, dueDate, latitude, longitude, category1, category2, } = req.body;
        if (!title)
            return res.status(400).send({ message: "제목이 없습니다." });
        if (!contents)
            return res.status(400).send({ message: "내용이 없습니다." });
        if (!address)
            return res.status(400).send({ message: "주소가 없습니다." });
        if (!dueDate) {
            return res.status(400).send({ message: "만료기한이 없습니다." });
        }
        if (!longitude || !latitude) {
            return res.status(400).send({ message: "좌표가 없습니다." });
        }
        if (!category1 || !category2) {
            return res.status(400).send({ message: "선택한 카테고리가 없습니다." });
        }
        const postCreate = yield post_1.default.create({
            userId: id,
            title: title,
            contents: contents,
            imagePath: imagePath,
            address: address,
            dueDate: dueDate,
            latitude: latitude,
            longitude: longitude,
        });
        const postId = postCreate.id;
        const gory1 = category1.split(",");
        const gory2 = category2.split(",");
        for (let i = 0; i < gory1.length; i++) {
            const find = yield category_1.default.findOne({
                where: { category1: gory1[i], category2: gory2[i] },
            });
            console.log("----------", find);
            yield post_category_1.default.create({ postId: postId, categoryId: find.id });
        }
        if (!postCreate)
            return res.status(400).send({ message: "게시글이 생성되지 않았습니다." });
        return res
            .status(201)
            .json({ postId: postId, message: "게시글이 생성되었습니다." });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = post_user;
//# sourceMappingURL=post.js.map