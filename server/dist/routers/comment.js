"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentRouter = express_1.default.Router();
const commentcontroller = __importStar(require("../controllers/comment/index"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
// 내가 쓴 댓글 받아오기
commentRouter.get("/me", accessToken_1.default, commentcontroller.get_m);
// 게시물 전체 댓글 받아오기
commentRouter.get("/:postId", commentcontroller.get);
// 댓글 쓰기
commentRouter.post("/:postId", accessToken_1.default, commentcontroller.post_c);
// 댓글 수정
commentRouter.patch("/:commentId", accessToken_1.default, commentcontroller.patch_c);
// 댓글 삭제
commentRouter.delete("/:commentId", accessToken_1.default, commentcontroller.delete_c);
exports.default = commentRouter;
//# sourceMappingURL=comment.js.map