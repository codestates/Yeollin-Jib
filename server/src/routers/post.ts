import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";

const router = express.Router();

export default function postRouter(postController: any) {
  // 게시물 업로드
  router.post(
    "/",
    accessToken,
    upload.array("image", 5),
    postController.post_user,
  );

  // 게시물 리스트 조회
  router.get("/page/:id", postController.get_page_infinite);

  // 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
  router.get("/user/:id", accessToken, postController.get_user_infinite);
  // 카테고리 리스트 조회
  router.get("/category", postController.get_category_infinite);
  // 게시물 조회(열람)
  router.get("/:id", postController.get);
  // 게시물 검색 조회 기능 (제목, 주소)
  router.get("/search/condition", postController.get_search);

  // 게시물 카테고리 true false
  router.patch("/category", accessToken, postController.patch_category);

  // 게시물 수정
  router.patch(
    "/:id",
    accessToken,
    upload.array("image", 5),
    postController.patch,
  );

  // 게시물 삭제
  router.delete("/:id", accessToken, postController.delete_);

  return router;
}
