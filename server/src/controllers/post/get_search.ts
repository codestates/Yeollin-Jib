import { Request, Response } from "express";
import user from "../../models/user";
import post from "../../models/post";
import post_category from "../../models/post_category";
import storage from "../../models/storage";
import Sequelize from "sequelize";
const { or, and, gt, lt, like, iLike } = Sequelize.Op;

const get_search = async (req: Request, res: Response) => {
  try {
    const pageNum: any = req.query.page; // page Number
    const code = req.query.code;
    const search = req.query.search;

    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    // 제목 검색
    if (code === "title") {
      const postGet = await post.findAndCountAll({
        attributes: [
          "id",
          "userId",
          "title",
          "address",
          "dueDate",
          "imagePath",
        ],
        order: [["id", "DESC"]],
        limit: 8,
        offset: offset,
        distinct: true, //Don't count include
        where: {
          title: {
            [like]: "%" + search + "%",
          },
        },
        include: [
          {
            model: user,
            attributes: ["nickname", "imagePath"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
          {
            model: post_category,
            attributes: ["categoryId"],
          },
        ],
      });

      if (postGet.rows.length === 0) {
        return res
          .status(200)
          .send({ message: "더이상 조회할 게시물이 없습니다." });
      }
      return res.status(200).send({ postGet });
    }

    // 주소 검색
    if (code === "address") {
      const postGet = await post.findAndCountAll({
        order: [["id", "DESC"]],
        limit: 8,
        offset: offset,
        distinct: true, //Don't count include
        where: {
          address: {
            [like]: "%" + search + "%",
          },
        },
        include: [
          {
            model: user,
            attributes: ["nickname", "imagePath"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
          {
            model: post_category,
            attributes: ["categoryId"],
          },
        ],
      });
      if (postGet.rows.length === 0) {
        return res
          .status(200)
          .send({ message: "더이상 조회할 게시물이 없습니다." });
      }
      return res.status(200).send({ postGet });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_search;
