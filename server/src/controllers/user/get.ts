import { Request, Response } from "express";
import user from "../../models/user";
import comment from "../../models/comment";
import post from "../../models/post";
import storage from "../../models/storage";

const get = async (req: Request, res: Response) => {
  const userId = req.cookies.id;
  try {
    const commentUser = await comment.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const postUser = await post.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const storageUser = await storage.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const findUser = await user.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }
    const userInfo = await user.findAll({
      where: { id: userId },
      attributes: ["id", "email", "nickname", "userArea", "imagePath"],
    });
    const { id, email, nickname, userArea, imagePath } = userInfo[0].dataValues;
    const data = { id, email, nickname, userArea, imagePath };
    res.status(200).json({
      data,
      myComment: commentUser.length,
      myPost: postUser.length,
      myStorage: storageUser.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get;
