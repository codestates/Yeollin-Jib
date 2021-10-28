import { Request, Response } from "express";
import storage from "../../models/storage";
const delete_like = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.cookies.id;

  if (userId) {
    try {
      const storageInfo: any = await storage.findOne({
        where: { userId, postId },
      });
      await storageInfo.destroy({});
      return res
        .status(200)
        .json({ message: "게시물 찜하기가 성공적으로 삭제되었습니다." });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  } else {
    return res.status(403).json({ message: "삭제할 권한이 없습니다." });
  }
};
export default delete_like;
