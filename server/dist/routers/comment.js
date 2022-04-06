"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
function commentRouter(CommentController) {
    // 내가 쓴 댓글 받아오기
    router.get("/me", accessToken_1.default, CommentController.getUserComment);
    // 게시물의 전체 댓글 받아오기
    router.get("/:postId", validator_1.validaterParamPostId, CommentController.getPostComment);
    // 댓글 쓰기
    router.post("/:postId", validator_1.validaterParamPostId, accessToken_1.default, CommentController.postComment);
    // 댓글 수정
    router.patch("/:commentId", validator_1.validaterParamCommentId, accessToken_1.default, CommentController.patchComment);
    // 댓글 삭제
    router.delete("/:commentId", validator_1.validaterParamCommentId, accessToken_1.default, CommentController.deleteComment);
    return router;
}
exports.default = commentRouter;
//# sourceMappingURL=comment.js.map