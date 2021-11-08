import { Request, Response } from "express";
import post from "../../models/post";
import user from "../../models/user";
import comment from "../../models/comment";

const get = async (req: Request, res: Response) => {
  const userId = req.cookies.id;

  try {
    await comment
      .findAll({
        where: { userId: userId },
        include: [
          {
            model: user,
            attributes: ["nickname"],
          },
          {
            model: post,
            attributes: ["title"],
          },
        ],
      })
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "내가 쓴 댓글이 성공적으로 조회되었습니다.",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default get;
