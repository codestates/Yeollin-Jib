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
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const id = req.cookies.id; //유저아이디
        const post_id = req.params.id;
        const postGet = yield post_1.default.findOne({ where: { id: post_id, userId: id } });
        if (!postGet)
            return res.status(404).json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });
        res.status(200).json({ postGet });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = get;
//# sourceMappingURL=get.js.map