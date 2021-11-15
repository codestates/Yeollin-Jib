import express from "express";
const commentRouter = express.Router();
import * as commentcontroller from "../controllers/comment/index";
import accessToken from "../middleware/accessToken";
// 내가 쓴 댓글 받아오기
commentRouter.get("/me", accessToken, commentcontroller.get_m);
// 게시물 전체 댓글 받아오기
commentRouter.get("/:postId", commentcontroller.get);
// 댓글 쓰기
commentRouter.post("/:postId", accessToken, commentcontroller.post_c);
// 댓글 수정
commentRouter.patch("/:commentId", accessToken, commentcontroller.patch_c);
// 댓글 삭제
commentRouter.delete("/:commentId", accessToken, commentcontroller.delete_c);

export default commentRouter;
