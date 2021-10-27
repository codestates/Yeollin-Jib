import { Request, Response } from "express";
import post from "../../models/post";
import Sequelize from "sequelize";
const { or, and, gt, lt } = Sequelize.Op;

const get_infinite = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // 게시물 ID
    console.log("----------", id);

    const postGet = await post.findAll({
      where: { id: { [lt]: id } },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "userId", "title", "address"],
      limit: 4,
    });
    const data = postGet.length;

    if (data !== 4) {
      if (data === 0) {
        return res.status(200).send({ message: "더이상 조회할 게시물이 없습니다." });
      }
      return res.status(200).send({ postGet, message: "더이상 조회할 게시물이 없습니다." });
    }

    res.status(200).send({ postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_infinite;
