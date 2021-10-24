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
const dotenv = __importStar(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const refreshToken_1 = __importDefault(require("./refreshToken"));
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        console.log("token===============", req.headers);
        if (!authorization) {
            return res
                .status(400)
                .json({ data: null, message: "access token 존재하지 않습니다." });
        }
        const token = authorization.split(" ")[1];
        const data = yield jwt
            .verify(token, process.env.ACCESS_SECRET)
            .catch(() => {
            return refreshToken_1.default;
        });
        const userInfo = yield user_1.default.findOne({
            where: { id: data.id },
        });
        console.log("userInfo===============", userInfo);
        if (!userInfo) {
            return res
                .status(401)
                .json({ message: "access token 일치하는 유저가 없습니다." });
        }
        delete userInfo.dataValues.password;
        res.status(200).json({
            data: {
                userId: userInfo.dataValues.id,
                userInfo: userInfo.dataValues,
            },
            message: "ok",
        });
        next();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: `서버에러`, error: err, location: "accessToken.ts" });
    }
});
exports.default = accessToken;
