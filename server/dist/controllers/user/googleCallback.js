"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const jwt = require("jsonwebtoken");
dotenv.config();
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        // 구글 자체 로그인
        const result = yield axios_1.default.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&grant_type=authorization_code`);
        const GoogleAccessToken = result.data.access_token;
        const GoogleRefreshToken = result.data.refresh_token;
        // 구글 로그인한 회원 정보 받기
        const userInfo = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${GoogleAccessToken}`, {
            headers: {
                Authorization: `Bearer ${GoogleAccessToken}`,
            },
        });
        // 구글 로그인한 회원 정보 중 email이 데이터베이스에 존재하는지 검사 후 없으면 새로 저장
        const [findUser, exist] = yield user_1.default.findOrCreate({
            where: {
                email: userInfo.data.email,
            },
            defaults: {
                nickname: userInfo.data.email.split("@")[0],
                imagePath: userInfo.data.picture,
                password: userInfo.data.id,
                salt: userInfo.data.id,
                loginType: true,
            },
        });
        const payload = {
            id: findUser.id,
            email: findUser.email,
            nickname: findUser.nickname,
            userArea: findUser.userArea,
            imagePath: findUser.imagePath,
            loginType: true,
        };
        const accessToken = yield jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "12h",
        });
        const refreshToken = yield jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "50d",
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
        });
        const realQuery = encodeURIComponent(accessToken);
        // redirect를 이용해 쿼리로 accessToken을 전달 (ORIGIN : 클라이언트 url)
        res.redirect(`${process.env.ORIGIN}/login?access_token=${realQuery}`);
    }
    catch (error) {
        console.error(error);
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = googleCallback;
//# sourceMappingURL=googleCallback.js.map