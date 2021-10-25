import express from "express";
const userRouter = express.Router();
import * as usercontroller from "../controllers/user/index";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

//회원가입
userRouter.post("/signup", usercontroller.signup);
//회원가입 프로필 사진
// userRouter.post("/image", accessToken, usercontroller.post_image);
//로그인
userRouter.post("/login", usercontroller.login);
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
//유저프로필사진변경
userRouter.put("/image", accessToken, usercontroller.put_image);

//회원탈퇴
userRouter.delete("/", accessToken, usercontroller.delete_);

export default userRouter;
