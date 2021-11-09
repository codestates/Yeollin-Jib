import { Request, Response } from "express";
import user from "../../models/user";
import post from "../../models/post";
import post_category from "../../models/post_category";
import category from "../../models/category";
import storage from "../../models/storage";
import accessToken from "../../middleware/accessToken";
import Sequelize from "sequelize";
const { or, and, gt, lt } = Sequelize.Op;

const get_category_infinite = async (req: Request, res: Response) => {
  try {
    const pageNum: any = req.query.page; // page Number
    const categoryNumber = req.query.code;

    // 무한스크롤 offset 설정
    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    // 카테고리 대분류
    const postGet = await post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
      order: [["id", "DESC"]],
      limit: 8,
      offset: offset,
      distinct: true, //Don't count include
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
          include: [
            {
              model: category,
              attributes: ["category1", "category2"],
              where: { category1: categoryNumber },
            },
          ],
        },
      ],
    });

    if (postGet.rows.length === 0) {
      return res
        .status(404)
        .send({ message: "더이상 조회할 게시물이 없습니다." });
    }
    res.status(200).send({ postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_category_infinite;
