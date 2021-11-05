import { Request, Response } from "express";
import user from "../../models/user";
import category from "../../models/category";
import post_category from "../../models/post_category";
import post from "../../models/post";
import storage from "../../models/storage";

const get_category_infinite = async (req: Request, res: Response) => {
  try {
    const category1 = req.query.code1;
    const category2 = req.query.code2;
    const pageNum: any = req.query.page; // page Number

    let offset = 0;
    if (pageNum > 1) {
      offset = 7 * (pageNum - 1);
    }

    const find = await category.findOne({
      where: { category1: category1, category2: category2 },
    });

    const categoryId = find!.id;
    const type = await post.findAll({
      order: [["id", "DESC"]],
      limit: 8,
      offset: offset,
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
          where: { categoryId: categoryId },
          required: true,
          attributes: ["categoryId"],
        },
      ],
    });

    if (!type) return res.status(404).send("조회하려는 게시물이 없습니다.");

    res.status(200).send(type);
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_category_infinite;
