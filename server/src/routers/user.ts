import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";
import { UserController } from "../controllers/User";

const router = express.Router();

export default function userRouter(UserController: UserController) {
  //회원가입
  router.post("/signup", UserController.signup);

  //일반 로그인
  router.post("/login", UserController.login);

  //로그아웃
  router.post("/logout", UserController.logout);

  //유저정보요청
  router.get("/", accessToken, UserController.getUser);

  //닉네임중복
  router.get("/nickname", UserController.checkNickname);

  //이메일중복
  router.get("/email", UserController.checkEmail);

  //유저프로필변경
  router.patch(
    "/",
    upload.single("imagePath"),
    accessToken,
    UserController.putUser,
  );

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
