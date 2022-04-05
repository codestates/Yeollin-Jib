import { Request, Response } from "express";
import { TYPES } from "../container/types";
import { Container } from "inversify";
import { UserData } from "../data/userData";
import { PostData } from "../data/postData";
import { CommentData } from "../data/commentData";

export class CommentsController {
  container: Container;

  constructor(myContainer: Container) {
    this.container = myContainer;
  }

  getUserComment = async (req: Request, res: Response): Promise<void> => {
    const commentRepository = this.container.get<CommentData>(TYPES.commentDB);
    const userId: number = Number(req.cookies.id);

    commentRepository
      .findAllUserCommentByUserId(userId)
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "내가 쓴 댓글이 성공적으로 조회되었습니다.",
        });
      });
  };

  getPostComment = async (req: Request, res: Response): Promise<void> => {
    const commentRepository = this.container.get<CommentData>(TYPES.commentDB);
    const userId: number = Number(req.cookies.id);
    const postId: number = Number(req.params.postId);

    commentRepository
      .findAllPostCommentByPostId(postId)
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "게시글의 모든댓글들을 성공적으로 조회했습니다.",
        });
      });
  };

  postComment = async (req: Request, res: Response): Promise<void> => {
    const userRepository = this.container.get<UserData>(TYPES.userDB);
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const commentRepository = this.container.get<CommentData>(TYPES.commentDB);
    const postId: number = Number(req.params.postId);
    const userId: number = Number(req.cookies.id);
    const { contents } = req.body;

    if (!(await postRepository.findPostByPostId(postId))) {
      res.status(404).json({ message: "게시물이 없습니다." });
      return;
    }

    const userInfo = await userRepository.findUserByUserId(userId);

    const data = await commentRepository.createCommentByUserIdPostId(
      userId,
      postId,
      contents,
    );

    Promise.all([userInfo, data]).then(() => {
      res.status(200).json({
        data,
        user: {
          nickname: userInfo!.nickname,
          imagePath: userInfo!.imagePath,
        },
      });
    });
  };

  patchComment = async (req: Request, res: Response): Promise<void> => {
    const userRepository = this.container.get<UserData>(TYPES.userDB);
    const commentRepository = this.container.get<CommentData>(TYPES.commentDB);
    const userId: number = Number(req.cookies.id);
    const commentId: number = Number(req.params.commentId);
    const { contents } = req.body;

    const userInfo = await userRepository.findUserByUserId(userId);
    const commentInfo = await commentRepository.findCommentByCommentIdAndUserId(
      commentId,
      userId,
    );
    if (!commentInfo) {
      res.status(404).json({
        message: "이미 삭제 되었거나 존재하지 않는 댓글입니다.",
      });
      return;
    }

    const updateComment = await commentRepository.updateCommentByCommentId(
      contents,
      commentId,
    );

    const payload = {
      id: commentId,
      userId: userId,
      postId: commentInfo!.postId,
      contents,
    };

    Promise.all([userInfo, commentInfo, updateComment]).then(() => {
      res.status(200).json({
        comment: payload,
        nickname: userInfo!.nickname,
        message: "댓글이 성공적으로 수정되었습니다.",
      });
    });
  };

  deleteComment = async (req: Request, res: Response): Promise<void> => {
    const commentRepository = this.container.get<CommentData>(TYPES.commentDB);
    const commentId: number = Number(req.params.commentId);
    const userId: number = Number(req.cookies.id);

    const commentInfo = await commentRepository.findCommentByCommentIdAndUserId(
      commentId,
      userId,
    );

    if (!commentInfo) {
      res.status(404).json({
        message: "이미 삭제 되었거나 존재하지 않는 댓글입니다.",
      });
      return;
    }

    commentRepository.deleteCommentsByCommentIdAndUserId(commentId, userId);
    res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
  };
}
