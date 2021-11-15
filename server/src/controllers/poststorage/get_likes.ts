import { Request, Response } from "express";
import storage from "../../models/storage";
import post from "../../models/post";
import user from "../../models/user";
import post_category from "../../models/post_category";

const get_likes = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id; //유저아이디
    const pageNum: any = req.params; // page Number

    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

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
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_likes;
