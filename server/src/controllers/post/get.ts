import { Request, Response } from "express";
import user from "../../models/user";
import post from "../../models/post";
import post_category from "../../models/post_category";
import storage from "../../models/storage";

const get = async (req: Request, res: Response) => {
  try {
    //게시물 아이디
    const post_id = req.params.id;

    const postLike = await storage.findAll({
      where: { postId: post_id },
    });

    const postGet = await post.findOne({
      where: { id: post_id },
      include: [
        {
          model: user,
          attributes: ["nickname", "email", "imagePath"],
        },
        {
          model: post_category,
          required: false,
          attributes: ["categoryId"],
        },
      ],
    });

    if (!postGet)
      return res
        .status(404)
        .json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });

    res.status(200).json({ postLike: postLike.length, postGet: postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get;
