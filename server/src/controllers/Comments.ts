import { Request, Response } from "express";
import user from "../models/user";
import post from "../models/post";
import comment from "../models/comment";

export class CommentsController {
  constructor() {}

  post_c = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { contents } = req.body;
    const userId = req.cookies.id;

    const userInfo: any = await user.findOne({
      where: {
        id: userId,
      },
      attributes: ["nickname", "imagePath"],
    });
    const payload = {
      nickname: userInfo.nickname,
      imagePath: userInfo.imagePath,
    };
    await comment
      .create({
        userId: userId, // 댓글을 작성한 유저 아이디 값
        postId: parseInt(postId), // 게시글 아이디
        contents, // 댓글 내용
      })
      .then((result: any) => {
        let data = {
          ...result.dataValues,
          user: {
            nickname: userInfo.nickname,
            imagePath: userInfo.imagePath,
          },
        };
        res.status(200).json({
          data,
        });
      });
  };

  get_m = async (req: Request, res: Response) => {
    const userId = req.cookies.id;

    await comment
      .findAll({
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
      })
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "내가 쓴 댓글이 성공적으로 조회되었습니다.",
        });
      });
  };

  get = async (req: Request, res: Response) => {
    const userId = req.cookies.id;

    await comment
      .findAll({
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
      })
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "내가 쓴 댓글이 성공적으로 조회되었습니다.",
        });
      });
  };

  patch_c = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { contents } = req.body;
    const userId = req.cookies.id;

    const userInfo: any = await user.findOne({
      where: {
        id: userId,
      },
      attributes: ["nickname"],
    });

    const commentInfo: any = await comment.findOne({
      where: {
        id: commentId,
      },
    });

    await comment.update(
      {
        contents,
      },
      {
        where: { id: commentId },
      },
    );

    const userload = {
      nickname: userInfo.nickname,
    };

    const payload = {
      id: commentId,
      userId: userId,
      postId: commentInfo.postId,
      contents,
    };

    return res.status(200).json({
      comment: payload,
      nickname: userload,
      message: "댓글이 성공적으로 수정되었습니다.",
    });
  };

  delete_c = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.cookies.id;

    if (userId) {
      const commentInfo: any = await comment.findOne({
        where: { id: commentId },
      });
      await commentInfo.destroy({});
      return res
        .status(200)
        .json({ message: "댓글이 성공적으로 삭제되었습니다." });
    } else {
      return res.status(403).json({ message: "삭제할 권한이 없습니다." });
    }
  };
}
