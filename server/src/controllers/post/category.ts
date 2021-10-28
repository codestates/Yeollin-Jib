import { Request, Response } from "express";
import category from "../../models/category";
import post_category from "../../models/post_category";
import post from "../../models/post";

const category_find = async (req: Request, res: Response) => {
  try {
    const category1 = req.query.code1;
    const category2 = req.query.code2;

    const find = await category.findOne({ where: { category1: category1, category2: category2 } });
    const categoryId = find!.id;
    const type = await post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: post_category,
          where: { categoryId: categoryId },
          required: true,
          attributes: ["categoryId"],
        },
      ],
      limit: 4,
    });

    if (!type) return res.status(404).send("조회하려는 게시물이 없습니다.");

    res.status(200).send(type);
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default category_find;
