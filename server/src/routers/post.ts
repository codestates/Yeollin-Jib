import express from "express";
const postRouter = express.Router();
import * as postcontroller from "../controllers/post/index";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

// 게시물 업로드
postRouter.post(
  "/",
  accessToken,
  upload.array("image", 5),
  postcontroller.post_user,
);

// 게시물 리스트 조회
postRouter.get("/page/:id", postcontroller.get_page_infinite);
// 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
postRouter.get("/user/:id", accessToken, postcontroller.get_user_infinite);
// 카테고리 리스트 조회
postRouter.get("/category", postcontroller.get_category_infinite);
// 게시물 조회(열람)
postRouter.get("/:id", postcontroller.get);
// 게시물 검색 조회 기능 (제목, 주소)
postRouter.get("/search/condition", postcontroller.get_search);

// 게시물 수정
postRouter.patch(
  "/:id",
  accessToken,
  upload.array("image", 5),
  postcontroller.put,
);

// 게시물 삭제
postRouter.delete("/:id", accessToken, postcontroller.delete_);

export default postRouter;
