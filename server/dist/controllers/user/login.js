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
const crypto = __importStar(require("crypto"));
const user_1 = __importDefault(require("../../models/user"));
const jwt = require("jsonwebtoken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // 이메일, 비밀번호 중 하나라도 입력하지 않았을 경우
        if (!email || !password) {
            return res.status(417).json({
                message: `필수 항목이 모두 채워지지않았습니다. 다시 한번 확인해주세요.`,
            });
        }
        const findUser = yield user_1.default.findOne({
            where: { email: email },
        });
        // 이메일이 없을 때
        if (!findUser) {
            return res.status(404).json({ message: `회원을 찾을수 없습니다.` });
        }
        const dbPassword = findUser.password;
        const salt = findUser.salt;
        const hashedPassword = crypto
            .pbkdf2Sync(password, salt, 256, 64, "sha512")
            .toString("base64");
        if (hashedPassword !== dbPassword) {
            return res.status(403).json({ message: "잘못된 비밀번호입니다." });
        }
        const payload = {
            id: findUser.id,
            email: findUser.email,
            createdAt: findUser.createdAt,
            updatedAt: findUser.updatedAt,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "12h",
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "50d",
        });
        return res
            .status(200)
            .json({
            accessToken,
            id: findUser.id,
            message: "로그인에 성공하였습니다.",
        })
            .cookie("refreshToken", refreshToken, {
            // secure: true,
            httpOnly: true,
        });
    }
    catch (err) {
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = login;
//# sourceMappingURL=login.js.map