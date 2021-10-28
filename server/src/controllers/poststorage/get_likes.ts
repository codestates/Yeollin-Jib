import { Request, Response } from "express";
import storage from "../../models/storage";
import post from "../../models/post";
import user from "../../models/user";

const get_likes = async (req: Request, res: Response) => {
  const userId = req.cookies.id;

  try {
    await storage
      .findAll({
        include: [
          {
            model: post,
            attributes: [
              "userId",
              "title",
              "contents",
              "imagePath",
              "address",
              "dueDate",
            ],
          },
          {
            model: user,
            attributes: ["nickname"],
          },
        ],
        where: {
          userId,
        },
      })
      .then((data: object) => {
        res.status(200).json({
          data,
          message: "찜한 게시물이 성공적으로 조회되었습니다.",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default get_likes;
