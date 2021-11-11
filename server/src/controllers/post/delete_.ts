import { Request, Response } from "express";
import post from "../../models/post";
import comment from "../../models/comment";
import storage from "../../models/storage";
import post_category from "../../models/post_category";

const delete_ = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id; //유저 아이디
    const postId = req.params.id; //게시물 아이디

    const postDelete = await post.destroy({ where: { id: postId } });
    await comment.destroy({ where: { postId } });
    await storage.destroy({ where: { postId } });
    await post_category.destroy({ where: { postId } });
    if (!postDelete)
      return res.status(404).json({ message: "삭제하려는 게시물이 없습니다." });

    res.status(201).json({ message: "게시물이 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default delete_;
