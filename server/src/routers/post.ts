import express from "express";
import accessToken from "../middleware/accessToken";
import { upload } from "../middleware/multer";
import { PostController } from "../controllers/Post";

import { body, query, param, check } from "express-validator";
import { validateError } from "../middleware/validatorError";
import {
  validaterParamPageNum,
  validaterParamPostId,
} from "../middleware/validator";

const router = express.Router();

export default function postRouter(PostController: PostController) {
  // 게시물 업로드
  // Multipul/form-data는 validator 작동하지 않음
  router.post(
    "/",
    accessToken,
    upload.array("image", 5),
    PostController.createPost,
  );

  // 게시물 삭제
  router.delete(
    "/:postId",
    validaterParamPostId,
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
    "/:postId",
    validaterParamPostId,
    accessToken,
    upload.array("image", 5),
    PostController.patch,
  );

  // 게시물 리스트 조회
  router.get(
    "/page/:pageNum",
    validaterParamPageNum,
    PostController.getAllPost,
  );

  // 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
  router.get(
    "/user/:pageNum",
    validaterParamPageNum,
    accessToken,
    PostController.getPostUser,
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
    PostController.getCategory,
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
    PostController.getSearchForPost,
  );

  // 게시물 조회(열람)
  router.get("/:postId", validaterParamPostId, PostController.getPost);

  return router;
}
