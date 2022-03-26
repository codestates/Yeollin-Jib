import express from "express";
import { CommentsController } from "../controllers/Comments";
import accessToken from "../middleware/accessToken";

const router = express.Router();

export default function commentRouter(CommentController: CommentsController) {
  // 내가 쓴 댓글 받아오기
  router.get("/me", accessToken, CommentController.get_m);

  // 게시물 전체 댓글 받아오기
  router.get("/:postId", CommentController.get);

  // 댓글 쓰기
  router.post("/:postId", accessToken, CommentController.post_c);

  // 댓글 수정
  router.patch("/:commentId", accessToken, CommentController.patch_c);

  // 댓글 삭제
  router.delete("/:commentId", accessToken, CommentController.delete_c);

  return router;
}
