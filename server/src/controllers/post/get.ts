import { resolveSoa } from "dns";
import { Request, Response } from "express";
import post from "../../models/post";

const get = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const id = req.cookies.id; //유저아이디
    const post_id = req.params.id;

    const postGet = await post.findOne({ where: { id: post_id, userId: id } });

    if (!postGet) return res.status(404).json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });

    res.status(200).json({ postGet });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get;
