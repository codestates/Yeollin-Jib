import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";
import { PostController } from "../controllers/Post";

import { body, query, param } from "express-validator";
import { validateError } from "../middleware/validator";

const router = express.Router();

export default function postRouter(PostController: PostController) {
  // 게시물 업로드
  router.post(
    "/",
    accessToken,
    upload.array("image", 5),
    PostController.createPost,
  );

  // 게시물 삭제
  router.delete(
    "/:id",
    [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    accessToken,
    PostController.deletePost,
  );

  // 게시물 카테고리 수정 (True False)
  router.patch(
    "/category",
    [
      body("postId").notEmpty().withMessage("postId 정보가 없습니다."),
      body("categoryId").notEmpty().withMessage("categoryId 정보가 없습니다."),
      validateError,
    ],
    accessToken,
    PostController.patchCategory,
  );

  // 게시물 수정
  router.patch(
    "/:id",
    [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    accessToken,
    upload.array("image", 5),
    PostController.patch,
  );

  // 게시물 리스트 조회
  router.get(
    "/page/:id",
    [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    PostController.get_page_infinite,
  );

  // 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
  router.get(
    "/user/:id",
    [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    accessToken,
    PostController.get_user_infinite,
  );

  // 카테고리 리스트 조회
  router.get(
    "/category",
    [
      query("page")
        .trim()
        .notEmpty()
        .withMessage("page 정보가 없습니다.")
        .isInt()
        .withMessage("page 번호를 입력해주세요."),
      query("code")
        .trim()
        .notEmpty()
        .withMessage("code 정보가 없습니다.")
        .isInt()
        .withMessage("code 번호를 입력해주세요."),
      validateError,
    ],
    PostController.get_category_infinite,
  );

  // 게시물 조회(열람)
  router.get(
    "/:id",
    [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    PostController.get,
  );

  // 게시물 검색 조회 기능 (제목, 주소)
  router.get(
    "/search/condition",
    [
      query("page")
        .trim()
        .notEmpty()
        .withMessage("page 정보가 없습니다.")
        .isInt()
        .withMessage("page 번호를 입력해주세요."),
      query("code").trim().notEmpty().withMessage("code 정보가 없습니다."),
      query("search").trim().notEmpty().withMessage("search 정보가 없습니다."),
      validateError,
    ],
    PostController.get_search,
  );

  return router;
}
