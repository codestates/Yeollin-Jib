import { Request, Response } from "express";
import post from "../../models/post";

const delete_ = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const id = req.cookies.id; //유저아이디
    const post_id = req.params.id;

    const postDelete = await post.destroy({ where: { id: post_id } });

    if (!postDelete) return res.status(404).json({ message: "삭제하려는 게시물이 없습니다." });

    res.status(201).json({ message: "게시물이 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default delete_;
