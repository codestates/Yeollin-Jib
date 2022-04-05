import { injectable } from "inversify";
import "reflect-metadata";
import comment from "../models/comment";
import post from "../models/post";
import user from "../models/user";

@injectable()
export class CommentData {
  async findCommentByCommentIdAndUserId(
    commentId: number,
    userId: number,
  ): Promise<comment | null> {
    return comment.findOne({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }

  async findAllOnlyCommentIdByUserId(userId: number): Promise<comment[]> {
    return comment.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllUserCommentByUserId(userId: number): Promise<comment[]> {
    return comment.findAll({
      attributes: {
        exclude: ["createdAt", "updateTimestamp", "userId"],
      },
      include: [
        {
          model: user,
          attributes: ["nickname"],
        },
        {
          model: post,
          attributes: ["title", "dueDate"],
        },
      ],
      where: {
        userId,
      },
    });
  }

  async findAllPostCommentByPostId(postId: number): Promise<comment[]> {
    return comment.findAll({
      attributes: {
        exclude: ["createdAt", "updateTimestamp", "userId"],
      },
      include: [
        {
          model: user,
          attributes: ["nickname"],
        },
        {
          model: post,
          attributes: ["title", "dueDate"],
        },
      ],
      where: {
        postId,
      },
    });
  }

  async createCommentByUserIdPostId(
    userId: number,
    postId: number,
    contents: string,
  ): Promise<comment> {
    return comment.create({
      userId: userId, // 댓글을 작성한 유저 아이디 값
      postId: postId, // 게시글 아이디
      contents, // 댓글 내용
    });
  }

  async updateCommentByCommentId(
    contents: string,
    commentId: number,
  ): Promise<void> {
    comment.update(
      {
        contents,
      },
      {
        where: { id: commentId },
      },
    );
  }

  async deleteCommentsByCommentIdAndUserId(
    commentId: number,
    userId: number,
  ): Promise<void> {
    comment.destroy({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }
}
