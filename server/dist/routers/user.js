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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const usercontroller = __importStar(require("../controllers/user/index"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const multer_1 = require("../middleware/multer");
//회원가입
userRouter.post("/signup", usercontroller.signup);
//일반 로그인
userRouter.post("/login", usercontroller.login);
//구글 로그인 user/login/google
userRouter.get("/login/google", usercontroller.googleLogin);
//구글 로그인 callback user/google/callback
userRouter.get("/google/callback", usercontroller.googleCallback);
//카카오 로그인 /user/login/kakao
userRouter.get("/login/kakao", usercontroller.kakaoLogin);
//카카오 로그인 callback user/kakao/callback
userRouter.get("/kakao/callback", usercontroller.kakaoCallback);
//로그아웃
userRouter.post("/logout", usercontroller.logout);
//유저정보요청
userRouter.get("/", accessToken_1.default, usercontroller.get);
//닉네임중복
userRouter.get("/nickname", usercontroller.nick_name);
//이메일중복
userRouter.get("/email", usercontroller.email);
//유저프로필변경
userRouter.patch("/", multer_1.upload.single("imagePath"), accessToken_1.default, usercontroller.put);
//유저사진삭제
userRouter.delete("/photo", accessToken_1.default, usercontroller.deletePhoto);
//회원탈퇴
userRouter.delete("/", accessToken_1.default, usercontroller.delete_);
exports.default = userRouter;
//# sourceMappingURL=user.js.map