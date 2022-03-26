import express from "express";
import accessToken from "../middleware/accessToken";

const router = express.Router();

export default function commentRouter(commentController: any) {
  // 내가 쓴 댓글 받아오기
  router.get("/me", accessToken, commentController.get_m);
  // 게시물 전체 댓글 받아오기
  router.get("/:postId", commentController.get);
  // 댓글 쓰기
  router.post("/:postId", accessToken, commentController.post_c);
  // 댓글 수정
  router.patch("/:commentId", accessToken, commentController.patch_c);
  // 댓글 삭제
  router.delete("/:commentId", accessToken, commentController.delete_c);

  return router;
}
