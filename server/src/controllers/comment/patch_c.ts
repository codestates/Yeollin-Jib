import { Request, Response } from "express";
import user from "../../models/user";
import Comment from "../../models/comment";
const patch_c = async (req: Request, res: Response) => {
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

    const commentInfo: any = await Comment.findOne({
      where: {
        id: id,
      },
    });

    await Comment.update(
      {
        contents,
      },
      {
        where: { id: id },
      }
    );

    const userload = {
      nickname: userInfo.nickname,
    };

    const payload = {
      id: id,
      userId: userId,
      postId: commentInfo.postId,
      contents,
    };

    console.log(commentInfo.PostId);
    return res.status(200).json({
      comment: payload,
      nickname: userload,
      message: "댓글이 성공적으로 수정되었습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default patch_c;
