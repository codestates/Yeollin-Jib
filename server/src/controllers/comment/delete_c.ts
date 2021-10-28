import { Request, Response } from "express";
import user from "../../models/user";
import comment from "../../models/comment";
const delete_c = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.cookies.id;

  if (userId) {
    try {
      const commentInfo: any = await comment.findOne({
        where: { id: id },
      });
      await commentInfo.destroy({});
      return res
        .status(200)
        .json({ message: "댓글이 성공적으로 삭제되었습니다." });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버에러 입니다." });
    }
  } else {
    return res.status(403).json({ message: "삭제할 권한이 없습니다." });
  }
};
export default delete_c;
