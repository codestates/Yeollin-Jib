import { Request, Response } from "express";
import post_category from "../../models/post_category";
import Sequelize from "sequelize";
const { or, and, gt, lt } = Sequelize.Op;

const patch_category = async (req: Request, res: Response) => {
  try {
    const { postId, categoryId } = req.body;

    if (!postId)
      return res.status(400).send({ message: "게시물 ID가 없습니다." });
    if (!categoryId)
      return res.status(400).send({ message: "카테고리 ID가 없습니다." });

    const gory = categoryId.split(",");
    for (let i = 0; i < gory.length; i++) {
      const find = await post_category.findOne({
        where: { postId: postId, categoryId: gory[i] },
      });

      if (find!.Boolean === true)
        await post_category.update(
          { Boolean: false },
          { where: { postId: postId, categoryId: gory[i] } },
        );
      else {
        await post_category.update(
          { Boolean: true },
          { where: { postId: postId, categoryId: gory[i] } },
        );
      }
    }

    res.status(200).send({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default patch_category;
