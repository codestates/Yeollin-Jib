import { Request, Response } from "express";
import post from "../../models/post";
import Sequelize from "sequelize";
const { or, and, gt, lt } = Sequelize.Op;

const get_page = async (req: Request, res: Response) => {
  try {
    const postGet = await post.findAll({
      attributes: ["id", "userId", "title", "address"],
      order: [["createdAt", "DESC"]],
      limit: 4,
    });

    res.status(200).send({ postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_page;
