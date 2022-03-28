import express from "express";
import { CommentsController } from "../controllers/Comments";
import accessToken from "../middleware/accessToken";

import {
  validaterParamPostId,
  validaterParamCommentId,
} from "../middleware/validator";

const router = express.Router();

export default function commentRouter(CommentController: CommentsController) {
  // 내가 쓴 댓글 받아오기
  router.get("/me", accessToken, CommentController.getComment);

  // 게시물 전체 댓글 받아오기
  router.get("/:postId", validaterParamPostId, CommentController.getAllComment);

  // 댓글 쓰기
  router.post(
    "/:postId",
    validaterParamPostId,
    accessToken,
    CommentController.postComment,
  );

  // 댓글 수정
  router.patch(
    "/:commentId",
    validaterParamCommentId,
    accessToken,
    CommentController.patchComment,
  );

  // 댓글 삭제
  router.delete(
    "/:commentId",
    validaterParamCommentId,
    accessToken,
    CommentController.deleteComment,
  );

  return router;
}
