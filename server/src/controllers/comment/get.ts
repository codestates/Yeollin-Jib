import { Request, Response } from "express";
import user from "../../models/user";
import Comment from "../../models/comment";
const get = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Comment.findAll({
      include: [
        {
          model: user,
          attributes: ["nickname"],
        },
      ],
      where: {
        postId: id,
      },
    }).then((data: object) => {
      res.status(200).json({
        data,
        message: "댓글이 성공적으로 조회되었습니다.",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default get;
