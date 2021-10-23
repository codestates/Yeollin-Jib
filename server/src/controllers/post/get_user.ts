import { Request, Response } from "express";
import post from "../../models/post";
import Sequelize from "sequelize";
const { or, and, gt, lt } = Sequelize.Op;

const get_user = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const poster = await post.findAll({
      where: { userId: id },
    });
    if (!poster) return res.status(404).send({ message: "작성한 게시물이 없습니다." });
    res.status(200).send({ data: poster });
  } catch (err) {
    console.log("err");
  }
};

export default get_user;
