import express from "express";
const userRouter = express.Router();
import * as usercontroller from "../controllers/user/index";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

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
userRouter.get("/", accessToken, usercontroller.get);
//닉네임중복
userRouter.get("/nickname", usercontroller.nick_name);
//이메일중복
userRouter.get("/email", usercontroller.email);

//유저프로필변경
userRouter.patch(
  "/",
  upload.single("imagePath"),
  accessToken,
  usercontroller.put
);

//유저사진삭제
userRouter.delete("/photo", accessToken, usercontroller.deletePhoto);

//회원탈퇴
userRouter.delete("/", accessToken, usercontroller.delete_);

export default userRouter;
