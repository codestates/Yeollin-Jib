import { Request, Response } from "express";
import post from "../../models/post";
import storage from "../../models/storage";

const post_like = async (req: Request, res: Response) => {
  const userId = req.cookies.id;
  const { postId } = req.params;
  if (userId && postId) {
    try {
      const postInfo: any = await post.findOne({
        where: {
          id: postId,
        },
      });
      if (!postInfo) {
        return res.status(403).send({ message: "게시글이 존재하지 않습니다." });
      }

      const [createStorage, exist] = await storage.findOrCreate({
        where: {
          postId,
          userId,
        },
        defaults: {
          postId,
          userId,
        },
      });

      if (!exist) {
        return res
          .status(400)
          .send({ message: "이미 찜하기 등록 되었습니다." });
      }
      return res
        .status(200)
        .send({ message: "게시물 찜하기가 성공적으로 등록 되었습니다." });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  } else {
    res
      .status(400)
      .send({ message: "회원 또는 포스트 아이디가 존재하지않습니다." });
  }
};
export default post_like;
