import { Request, Response } from "express";
import comment from "../../models/comment";
import user from "../../models/user";
import storage from "../../models/storage";
import post from "../../models/post";
import post_category from "../../models/post_category";
const delete_ = async (req: Request, res: Response) => {
  try {
    const header: object = req.headers;

    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const userId = req.cookies.id;
      const findPostId: any = await post.findAll({
        where: { userId },
        attributes: ["id"],
      });
      // 내가 쓴 게시글의 id를 받아서 하나씩 다 지워주기
      let postId;
      if (findPostId) {
        for (let i = 0; i < findPostId.length; i++) {
          postId = findPostId[i].dataValues.id;
          await comment.destroy({ where: { postId } });
          await storage.destroy({ where: { postId } });
          await post_category.destroy({ where: { postId } });
        }
      }
      await user.destroy({ where: { id: userId } });
      await comment.destroy({ where: { userId } });
      await storage.destroy({ where: { userId } });
      await post.destroy({
        where: {
          userId,
        },
      });

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
