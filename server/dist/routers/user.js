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
//회원가입
userRouter.post("/signup", usercontroller.signup);
//회원가입 프로필 사진
userRouter.post("/image", accessToken_1.default, usercontroller.post_image);
//로그인
userRouter.post("/login", accessToken_1.default, usercontroller.login);
//로그아웃
userRouter.post("/logout", accessToken_1.default, usercontroller.logout);
//유저정보요청
userRouter.get("/", accessToken_1.default, usercontroller.get);
//닉네임중복
userRouter.get("/nickname", accessToken_1.default, usercontroller.nick_name);
//이메일중복
userRouter.get("/email", accessToken_1.default, usercontroller.email);
//유저프로필변경
userRouter.put("/", accessToken_1.default, usercontroller.put);
//유저프로필사진변경
userRouter.put("/image", accessToken_1.default, usercontroller.put_image);
//회원탈퇴
userRouter.delete("/", accessToken_1.default, usercontroller.delete_);
exports.default = userRouter;
