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
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.cookies.id;
    try {
        const header = req.headers;
        if (!header) {
            return res.status(403).json({ message: "잘못된 요청입니다." });
        }
        else {
            const { nickname, password, userArea, imagePath } = req.body;
            const imagePathReq = req.file;
            const findUser = yield user_1.default.findOne({
                where: { id: userId },
            });
            console.log("req.file", req.file);
            if (findUser) {
                // 닉네임 변경
                if (nickname) {
                    yield user_1.default.update({
                        nickname: nickname,
                    }, { where: { id: userId } });
                }
                // 비밀번호 변경
                if (password) {
                    const salt = crypto.randomBytes(64).toString("hex");
                    const newEncryptedPassword = crypto
                        .pbkdf2Sync(password, salt, 256, 64, "sha512")
                        .toString("base64");
                    yield user_1.default.update({
                        salt: salt,
                        password: newEncryptedPassword,
                    }, { where: { id: userId } });
                }
                // 우리 동네 위치 정보 수정
                if (userArea) {
                    yield user_1.default.update({
                        userArea: userArea,
                    }, { where: { id: userId } });
                }
                // 프로필 사진 수정
                if (imagePathReq) {
                    // 기존 파일 삭제
                    fs.unlink(`${__dirname}/../../../public/uploads/${findUser.imagePath}`, (err) => {
                        if (err) {
                            console.log("기존 파일 삭제 에러 입니다.", err.message);
                        }
                    });
                    // 새 파일 업로드
                    yield user_1.default.update({ imagePath: `${imagePathReq.filename}` }, {
                        where: { id: userId },
                    });
                }
            }
            return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = put;
//# sourceMappingURL=put.js.map