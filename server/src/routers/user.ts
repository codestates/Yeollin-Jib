import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

const router = express.Router();

export default function userRouter(userController: any) {
  //회원가입
  router.post("/signup", userController.signup);

  //일반 로그인
  router.post("/login", userController.login);

  //로그아웃
  router.post("/logout", userController.logout);

  //유저정보요청
  router.get("/", accessToken, userController.getUser);

  //닉네임중복
  router.get("/nickname", userController.checkNickname);

  //이메일중복
  router.get("/email", userController.checkEmail);

  //유저프로필변경
  router.patch(
    "/",
    upload.single("imagePath"),
    accessToken,
    userController.putUser,
  );

  //유저사진삭제
  router.delete("/photo", accessToken, userController.deletePhoto);

  //회원탈퇴
  router.delete("/", accessToken, userController.deleteUser);

  //구글 로그인 user/login/google
  router.get("/login/google", userController.googleLogin);

  //구글 로그인 callback user/google/callback
  router.get("/google/callback", userController.googleCallback);

  //카카오 로그인 /user/login/kakao
  router.get("/login/kakao", userController.kakaoLogin);

  //카카오 로그인 callback user/kakao/callback
  router.get("/kakao/callback", userController.kakaoCallback);

  return router;
}
