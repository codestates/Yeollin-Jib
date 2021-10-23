import express from "express";
const userRouter = express.Router();
import * as usercontroller from "../controllers/user/index";
import accessToken from "../middleware/accessToken";

//회원가입
userRouter.post("/user", usercontroller.signup);
//회원가입 프로필 사진
userRouter.post("/user/image", accessToken, usercontroller.post_image);
//로그인
userRouter.post("/user/login", usercontroller.login);
//로그아웃
userRouter.post("/user/logout", accessToken, usercontroller.logout);

//유저정보요청
userRouter.get("/user", accessToken, usercontroller.get);
//닉네임중복
userRouter.get("/user/nickname", accessToken, usercontroller.nick_name);
//이메일중복
userRouter.get("/user/email", accessToken, usercontroller.email);

//유저프로필변경
userRouter.put("/user", accessToken, usercontroller.put);
//유저프로필사진변경
userRouter.put("/user/image", accessToken, usercontroller.put_image);

//회원탈퇴
userRouter.delete("/user", accessToken, usercontroller.delete_);

export default userRouter;
