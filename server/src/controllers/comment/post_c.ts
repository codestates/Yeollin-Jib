import { Request, Response } from "express";
import user from "../../models/user";
import comment from "../../models/comment";
const post_c = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { contents } = req.body;
  const userId = req.body.id;

  try {
    const userInfo: any = await user.findOne({
      where: {
        id: userId,
      },
      attributes: ["nickname"],
    });
    const payload = {
      nickname: userInfo.nickname,
    };
    await comment
      .create({
        userId: userId, // 댓글을 작성한 유저 아이디 값
        postId: id, // 게시글 아이디
        contents, // 댓글 내용
      })
      .then((data: any) => {
        res.status(200).json({
          data,
          nickname: payload,
          message: "댓글이 성공적으로 입력되었습니다.",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default post_c;
