import { injectable } from "inversify";
import "reflect-metadata";
import comment from "../models/comment";
import post from "../models/post";
import user from "../models/user";
import storage from "../models/storage";
import post_category from "../models/post_category";

@injectable()
export class CommentData {
  async findCommentByCommentIdAndUserId(commentId: number, userId: number) {
    return comment.findOne({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }

  async findAllOnlyCommentIdByUserId<T>(userId: T) {
    return comment.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllUserCommentByUserId(userId: number) {
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

  async findAllPostCommentByPostId(postId: number) {
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
  ) {
    return comment.create({
      userId: userId, // 댓글을 작성한 유저 아이디 값
      postId: postId, // 게시글 아이디
      contents, // 댓글 내용
    });
  }

  async updateCommentByCommentId(contents: string, commentId: number) {
    return comment.update(
      {
        contents,
      },
      {
        where: { id: commentId },
      },
    );
  }

  async deleteCommentsByCommentIdAndUserId(commentId: number, userId: number) {
    return comment.destroy({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }
}
