import { Request, Response } from "express";

import user from "../../models/user";

const get = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const findUser = await user.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    } else {
      const userInfo = await user.findAll({
        where: { id: userId },
        attributes: ["id", "email", "nickname"],
      });
      const { id, email, nickname } = userInfo[0].dataValues;

      const data = { id, email, nickname };
      res.status(200).json({ data: data });
    }
    // 401 유효하지 않은 토큰
  } catch (err) {
    console.log(err);
  }
};
export default get;

