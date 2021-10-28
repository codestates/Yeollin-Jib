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
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname, email, password } = req.body;
        if (!nickname || !email || !password) {
            return res.status(400).json({
                message: `필수 항목이 모두 채워지지 않았습니다. 다시 한번 확인해주세요.`,
            });
        }
        const salt = crypto.randomBytes(64).toString("hex");
        const encryptedPassword = crypto
            .pbkdf2Sync(password, salt, 256, 64, "sha512")
            .toString("base64");
        // user 생성
        const newUser = yield user_1.default.create({
            // 일반 회원가입 시 - 로그인 타입 false, 소셜 로그인 시 - true
            loginType: false,
            nickname,
            email,
            salt,
            password: encryptedPassword,
        });
        const userId = newUser.id;
        return res.status(201).json({
            userId,
            nickname,
            email,
            message: "회원가입이 완료되었습니다",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map