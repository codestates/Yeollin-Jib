import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";
import { PostController } from "../controllers/Post";

const router = express.Router();

export default function postRouter(PostController: PostController) {
  // 게시물 업로드
  router.post(
    "/",
    accessToken,
    upload.array("image", 5),
    PostController.post_user,
  );

  // 게시물 리스트 조회
  router.get("/page/:id", PostController.get_page_infinite);

  // 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
  router.get("/user/:id", accessToken, PostController.get_user_infinite);
  // 카테고리 리스트 조회
  router.get("/category", PostController.get_category_infinite);
  // 게시물 조회(열람)
  router.get("/:id", PostController.get);
  // 게시물 검색 조회 기능 (제목, 주소)
  router.get("/search/condition", PostController.get_search);

  // 게시물 카테고리 true false
  router.patch("/category", accessToken, PostController.patch_category);

  // 게시물 수정
  router.patch(
    "/:id",
    accessToken,
    upload.array("image", 5),
    PostController.patch,
  );

  // 게시물 삭제
  router.delete("/:id", accessToken, PostController.delete_);

  return router;
}
