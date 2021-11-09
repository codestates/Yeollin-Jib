import { Request, Response } from "express";
import user from "../../models/user";
import comment from "../../models/comment";
const post_c = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { contents } = req.body;
  const userId = req.cookies.id;
  try {
    const userInfo: any = await user.findOne({
      where: {
        id: userId,
      },
      attributes: ["nickname", "imagePath"],
    });
    const payload = {
      nickname: userInfo.nickname,
      imagePath: userInfo.imagePath,
    };
    await comment
      .create({
        userId: userId, // 댓글을 작성한 유저 아이디 값
        postId: parseInt(postId), // 게시글 아이디
        contents, // 댓글 내용
      })
      .then((result: any) => {
        let data = {
          ...result.dataValues,
          user: { nickname: userInfo.nickname, imagePath: userInfo.imagePath },
        };
        res.status(200).json({
          data,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default post_c;
