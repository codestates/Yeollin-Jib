import { Request, Response } from "express";
import Sequelize from "sequelize";
import post from "../../models/post";
import post_category from "../../models/post_category";
import category from "../../models/category";
const { or, and, gt, lt } = Sequelize.Op;

const get_user = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id; //유저아이디

    const postGet = await post.findAll({
      attributes: ["id", "userId", "title", "address"],
      where: { userId: id },
      include: [
        {
          model: post_category,
          required: false,
          attributes: ["categoryId"],
          include: [
            {
              model: category,
              required: false,
              attributes: ["category1", "category2"],
            },
          ],
        },
      ],
    });
    if (!postGet) return res.status(404).send({ message: "작성한 게시물이 없습니다." });
    res.status(200).send({ data: postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

export default get_user;
