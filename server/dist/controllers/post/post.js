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
const ost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 유저아이디 받아와야함
        const title = req.body.title;
        const contents = req.body.contents;
        const address = req.body.address;
        const dueDate = req.body.dueDate;
        const latitude = req.body.latitude;
        const longtitude = req.body.longtitude;
        if (!title)
            return res.status(400).send({ message: "제목이 없습니다." });
        if (!contents)
            return res.status(400).send({ message: "내용이 없습니다." });
        if (!address)
            return res.status(400).send({ message: "주소가 없습니다." });
        if (!dueDate)
            return res.status(400).send({ message: "만료기한이 없습니다." });
        if (!longtitude || !latitude)
            return res.status(400).send({ message: "좌표가 없습니다." });
        const where = yield post_1.default.create({
            title: title,
            contents: contents,
            address: address,
            dueDate: dueDate,
            latitude: latitude,
            longtitude: longtitude,
        });
        if (where)
            return res.status(201).send({ message: "게시글이 생성되었습니다." });
    }
    catch (err) {
        console.log("err");
    }
});
exports.default = post_1.default;
