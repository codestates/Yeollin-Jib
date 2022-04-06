"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const multer_1 = require("../middleware/multer");
const express_validator_1 = require("express-validator");
const validatorError_1 = require("../middleware/validatorError");
const router = express_1.default.Router();
function userRouter(UserController) {
    //회원가입
    router.post("/signup", [
        (0, express_validator_1.body)("nickname")
            .notEmpty()
            .withMessage("이름을 입력해 주세요")
            .trim()
            .isLength({ min: 2 })
            .withMessage("이름을 두글자 이상 입력해주세요"),
        (0, express_validator_1.body)("email").isEmail().withMessage("이메일을 입력해주세요"),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("비밀번호를 입력해주세요")
            .isLength({ min: 8, max: 16 })
            .withMessage("8~16자리 비밀번호를 입력해주세요"),
        validatorError_1.validateError,
    ], UserController.signup);
    //일반 로그인
    router.post("/login", [
        (0, express_validator_1.body)("email").isEmail().withMessage("이메일을 입력해주세요."),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("비밀번호를 입력해주세요.")
            .isLength({ min: 8, max: 16 })
            .withMessage("8~16자리 비밀번호를 입력해주세요."),
        validatorError_1.validateError,
    ], UserController.login);
    //로그아웃
    router.post("/logout", UserController.logout);
    //닉네임중복
    router.get("/nickname", [
        (0, express_validator_1.query)("nickname")
            .notEmpty()
            .withMessage("이름을 입력해 주세요")
            .trim()
            .isLength({ min: 2 })
            .withMessage("이름을 두글자 이상 입력해주세요"),
        validatorError_1.validateError,
    ], UserController.checkNickname);
    //이메일중복
    router.get("/email", [
        (0, express_validator_1.query)("email").isEmail().withMessage("이메일을 입력해주세요"),
        validatorError_1.validateError,
    ], UserController.checkEmail);
    //유저프로필변경
    router.patch("/", multer_1.upload.single("imagePath"), accessToken_1.default, UserController.putUser);
    //유저정보요청
    router.get("/", accessToken_1.default, UserController.getUser);
    //유저사진삭제
    router.delete("/photo", accessToken_1.default, UserController.deletePhoto);
    //회원탈퇴
    router.delete("/", accessToken_1.default, UserController.deleteUser);
    //구글 로그인 user/login/google
    router.get("/login/google", UserController.googleLogin);
    //구글 로그인 callback user/google/callback
    router.get("/google/callback", UserController.googleCallback);
    //카카오 로그인 /user/login/kakao
    router.get("/login/kakao", UserController.kakaoLogin);
    //카카오 로그인 callback user/kakao/callback
    router.get("/kakao/callback", UserController.kakaoCallback);
    return router;
}
exports.default = userRouter;
//# sourceMappingURL=user.js.map