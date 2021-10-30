import { Request, Response } from "express";
import comment from "../../models/comment";
import user from "../../models/user";
import storage from "../../models/storage";
import post from "../../models/post";

const delete_ = async (req: Request, res: Response) => {
  try {
    const header: object = req.headers;

    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const userId = req.cookies.id;
      await user.destroy({ where: { id: userId } });
      await comment.destroy({ where: { userId } });
      await storage.destroy({ where: { userId } });
      await post.destroy({ where: { userId } });
      return res
        .status(200)
        .cookie("refreshToken", "")
        .setHeader("authorization", "")
        .json({ message: "회원탈퇴가 완료 되었습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default delete_;
