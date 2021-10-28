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
const user_1 = __importDefault(require("../models/user"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwt = require("jsonwebtoken");
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res
                .status(401)
                .json({ message: "RefreshToken이 존재하지 않습니다." });
        }
        const decode = yield jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(401).json({
                    message: "RefreshToken이 유효기간이 지났습니다. 다시 로그인 해주세요",
                });
            }
            const userInfo = yield user_1.default.findOne({
                where: { id: decoded.id },
            });
            if (!userInfo) {
                return res.status(400).json({
                    message: "RefreshToken에 해당유저가 없습니다.",
                });
            }
            delete userInfo.dataValues.password;
            const payload = userInfo.dataValues;
            const accessToken = yield jwt.sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: "12h",
            });
            return res.status(200).json({
                accessToken,
                id: payload.id,
                message: "새로운 accessToken 발급 완료",
            });
        }));
    }
    catch (err) {
        return res.status(501).json({ message: "서버에러 입니다." });
    }
});
exports.default = refreshToken;
//# sourceMappingURL=refreshToken.js.map