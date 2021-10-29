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
const delete_like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const userId = req.cookies.id;
    if (userId) {
        try {
            const storageInfo = yield storage_1.default.findOne({
                where: { userId, postId },
            });
            yield storageInfo.destroy({});
            return res
                .status(200)
                .json({ message: "게시물 찜하기가 성공적으로 삭제되었습니다." });
        }
        catch (err) {
            console.log(err);
            return res.status(501).json({ message: "서버 에러 입니다." });
        }
    }
    else {
        return res.status(403).json({ message: "삭제할 권한이 없습니다." });
    }
});
exports.default = delete_like;
//# sourceMappingURL=delete_like.js.map