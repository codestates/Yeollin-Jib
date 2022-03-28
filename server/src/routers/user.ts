import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";
import { UserController } from "../controllers/User";

import { body } from "express-validator";
import { validateError } from "../middleware/validatorError";

const router = express.Router();

export default function userRouter(UserController: UserController) {
  //회원가입
  router.post(
    "/signup",
    [
      body("nickname")
        .notEmpty()
        .withMessage("이름을 입력해 주세요")
        .trim()
        .isLength({ min: 2 })
        .withMessage("이름을 두글자 이상 입력해주세요"),
      body("email").isEmail().withMessage("이메일을 입력해주세요"),
      body("password")
        .notEmpty()
        .withMessage("비밀번호를 입력해주세요")
        .isLength({ min: 8, max: 16 })
        .withMessage("8~16자리 비밀번호를 입력해주세요"),
      validateError,
    ],
    UserController.signup,
  );

  //일반 로그인
  router.post(
    "/login",
    [
      body("email").isEmail().withMessage("이메일을 입력해주세요."),
      body("password")
        .notEmpty()
        .withMessage("비밀번호를 입력해주세요.")
        .isLength({ min: 8, max: 16 })
        .withMessage("8~16자리 비밀번호를 입력해주세요."),
      validateError,
    ],
    UserController.login,
  );

  //로그아웃
  router.post("/logout", UserController.logout);

  //닉네임중복
  router.get(
    "/nickname",
    [
      body("nickname")
        .notEmpty()
        .withMessage("이름을 입력해 주세요")
        .trim()
        .isLength({ min: 2 })
        .withMessage("이름을 두글자 이상 입력해주세요"),
      validateError,
    ],
    UserController.checkNickname,
  );

  //이메일중복
  router.get(
    "/email",
    [
      body("email").isEmail().withMessage("이메일을 입력해주세요"),
      validateError,
    ],
    UserController.checkEmail,
  );

  //유저프로필변경
  router.patch(
    "/",
    upload.single("imagePath"),
    accessToken,
    UserController.putUser,
  );

  //유저정보요청
  router.get("/", accessToken, UserController.getUser);

  //유저사진삭제
  router.delete("/photo", accessToken, UserController.deletePhoto);

  //회원탈퇴
  router.delete("/", accessToken, UserController.deleteUser);

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
