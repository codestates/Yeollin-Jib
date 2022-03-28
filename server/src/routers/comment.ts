import express from "express";
import { CommentsController } from "../controllers/Comments";
import accessToken from "../middleware/accessToken";

import { param } from "express-validator";
import { validateError } from "../middleware/validator";

const validaterPostId = [
  param("postId")
    .trim()
    .notEmpty()
    .withMessage("postId 정보가 없습니다.")
    .isInt()
    .withMessage("postId 번호를 입력해주세요."),
  validateError,
];

const router = express.Router();

export default function commentRouter(CommentController: CommentsController) {
  // 내가 쓴 댓글 받아오기
  router.get("/me", accessToken, CommentController.get_m);

  // 게시물 전체 댓글 받아오기
  router.get("/:postId", validaterPostId, CommentController.get);

  // 댓글 쓰기
  router.post(
    "/:postId",
    validaterPostId,
    accessToken,
    CommentController.post_c,
  );

  // 댓글 수정
  router.patch(
    "/:commentId",
    validaterPostId,
    accessToken,
    CommentController.patch_c,
  );

  // 댓글 삭제
  router.delete(
    "/:commentId",
    validaterPostId,
    accessToken,
    CommentController.delete_c,
  );

  return router;
}
