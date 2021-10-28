import express from "express";
const postRouter = express.Router();
import * as postcontroller from "../controllers/post/index";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

// 게시물 업로드
postRouter.post("/", accessToken, upload.array("image", 5), postcontroller.post_user);

// 메인페이지 게시물 리스트 첫 조회
postRouter.get("/page", accessToken, postcontroller.get_page);
// 무한스크롤 리스트 조회
postRouter.get("/page/:id", accessToken, postcontroller.get_infinite);
// 유저 작성 게시물 리스트 조회
postRouter.get("/user", accessToken, postcontroller.get_user);
// 카테고리 리스트 조회
postRouter.get("/category", accessToken, postcontroller.category_find);
// 게시물 조회(열람)
postRouter.get("/:id", accessToken, postcontroller.get);

// 게시물 수정
postRouter.patch("/:id", accessToken, upload.array("image", 5), postcontroller.put);

// 게시물 삭제
postRouter.delete("/:id", accessToken, postcontroller.delete_);

export default postRouter;
