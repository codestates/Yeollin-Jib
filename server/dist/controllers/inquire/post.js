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
Object.defineProperty(exports, "__esModule", { value: true });
const { inquire } = require("../../models");
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hihiihi");
    const { email, title, contents } = req.body;
    try {
        yield inquire
            .create({
            email: email,
            title: title,
            contents: contents,
        })
            .then((data) => {
            res.status(200).json({
                data,
                message: "문의 작성이 성공적으로 완료되었습니다.",
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = post;
//# sourceMappingURL=post.js.map