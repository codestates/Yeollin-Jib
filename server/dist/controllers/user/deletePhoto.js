"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const deletePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.id;
    try {
        const header = req.headers;
        if (!header) {
            return res.status(403).json({ message: "잘못된 요청입니다." });
        }
        else {
            const { imagePath } = req.body;
            const findUser = yield user_1.default.findOne({
                where: { id: userId },
            });
            if (findUser) {
                // body로 imagePath라는 키값이 들어오면 db값을 null로 바꾸는 방식
                if (imagePath) {
                    // null값이 아닌 사진이 존재할 경우
                    if (findUser.imagePath !== null) {
                        // 기존 파일 삭제
                        fs.unlink(`${__dirname}/../../../public/uploads/${findUser.imagePath}`, (err) => {
                            if (err) {
                                console.log("기존 파일 삭제 에러 입니다.", err.message);
                            }
                        });
                    }
                    // db에 있는 유저 테이블의 imagePath를 null로 변경
                    yield user_1.default.update({ imagePath: null }, {
                        where: { id: userId },
                    });
                }
            }
            return res.status(200).json({ message: "사진 삭제가 완료되었습니다." });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = deletePhoto;
//# sourceMappingURL=deletePhoto.js.map