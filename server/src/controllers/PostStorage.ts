import { Request, Response } from "express";
import user from "../models/user";
import storage from "../models/storage";
import post from "../models/post";
import post_category from "../models/post_category";

export class PostStorageController {
  constructor() {}

  get_likes = async (req: Request, res: Response) => {
    const id = req.cookies.id; //유저아이디
    // const pageNum: any = req.params; // page Number

    // let offset = 0;
    // if (pageNum > 1) {
    //   offset = 8 * (pageNum - 1);
    // }

    const postGet = await post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
      order: [["id", "DESC"]],
      //   limit: 8,
      //   offset: offset,
      distinct: true, //Don't count include
      include: [
        {
          model: user,
          attributes: ["nickname", "imagePath"],
        },
        {
          model: storage,
          attributes: ["userId"],
          where: { userId: id },
        },
        {
          model: post_category,
          attributes: ["categoryId"],
        },
      ],
    });

    if (postGet.rows.length === 0) {
      return res
        .status(404)
        .send({ message: "더이상 조회할 게시물이 없습니다." });
    }

    res.status(200).send({ postGet });
  };

  post_like = async (req: Request, res: Response) => {
    const userId = req.cookies.id;
    const { postId } = req.params;
    if (userId && postId) {
      const postInfo: any = await post.findOne({
        where: {
          id: postId,
        },
      });
      if (!postInfo) {
        return res.status(403).send({ message: "게시글이 존재하지 않습니다." });
      }

      const [createStorage, exist] = await storage.findOrCreate({
        where: {
          postId,
          userId,
        },
        defaults: {
          postId,
          userId,
        },
      });

      if (!exist) {
        return res
          .status(200)
          .send({ message: "이미 찜하기 등록 되었습니다." });
      }
      return res
        .status(201)
        .send({ message: "게시물 찜하기가 성공적으로 등록 되었습니다." });
    } else {
      res
        .status(400)
        .send({ message: "회원 또는 포스트 아이디가 존재하지않습니다." });
    }
  };

  delete_like = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const userId = req.cookies.id;

    if (userId) {
      const storageInfo: any = await storage.findOne({
        where: { userId, postId },
      });
      await storageInfo.destroy({});
      return res
        .status(200)
        .json({ message: "게시물 찜하기가 성공적으로 삭제되었습니다." });
    } else {
      return res.status(403).json({ message: "삭제할 권한이 없습니다." });
    }
  };
}
