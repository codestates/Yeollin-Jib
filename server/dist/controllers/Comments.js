"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const types_1 = require("../container/types");
class CommentsController {
    constructor(myContainer) {
        this.getUserComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const userId = Number(req.cookies.id);
            commentRepository
                .findAllUserCommentByUserId(userId)
                .then((data) => {
                res.status(200).json({
                    data,
                    message: "내가 쓴 댓글이 성공적으로 조회되었습니다.",
                });
            });
        });
        this.getPostComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const userId = Number(req.cookies.id);
            const postId = Number(req.params.postId);
            commentRepository
                .findAllPostCommentByPostId(postId)
                .then((data) => {
                res.status(200).json({
                    data,
                    message: "게시글의 모든댓글들을 성공적으로 조회했습니다.",
                });
            });
        });
        this.postComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const postId = Number(req.params.postId);
            const userId = Number(req.cookies.id);
            const { contents } = req.body;
            if (!(yield postRepository.findPostByPostId(postId))) {
                res.status(404).json({ message: "게시물이 없습니다." });
                return;
            }
            const userInfo = yield userRepository.findUserByUserId(userId);
            const data = yield commentRepository.createCommentByUserIdPostId(userId, postId, contents);
            Promise.all([userInfo, data]).then(() => {
                res.status(200).json({
                    data,
                    user: {
                        nickname: userInfo.nickname,
                        imagePath: userInfo.imagePath,
                    },
                });
            });
        });
        this.patchComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const userId = Number(req.cookies.id);
            const commentId = Number(req.params.commentId);
            const { contents } = req.body;
            const userInfo = yield userRepository.findUserByUserId(userId);
            const commentInfo = yield commentRepository.findCommentByCommentIdAndUserId(commentId, userId);
            if (!commentInfo) {
                res.status(404).json({
                    message: "이미 삭제 되었거나 존재하지 않는 댓글입니다.",
                });
                return;
            }
            const updateComment = yield commentRepository.updateCommentByCommentId(contents, commentId);
            const payload = {
                id: commentId,
                userId: userId,
                postId: commentInfo.postId,
                contents,
            };
            Promise.all([userInfo, commentInfo, updateComment]).then(() => {
                res.status(200).json({
                    comment: payload,
                    nickname: userInfo.nickname,
                    message: "댓글이 성공적으로 수정되었습니다.",
                });
            });
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const commentId = Number(req.params.commentId);
            const userId = Number(req.cookies.id);
            const commentInfo = yield commentRepository.findCommentByCommentIdAndUserId(commentId, userId);
            if (!commentInfo) {
                res.status(404).json({
                    message: "이미 삭제 되었거나 존재하지 않는 댓글입니다.",
                });
                return;
            }
            commentRepository.deleteCommentsByCommentIdAndUserId(commentId, userId);
            res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
        });
        this.container = myContainer;
    }
}
exports.CommentsController = CommentsController;
//# sourceMappingURL=Comments.js.map