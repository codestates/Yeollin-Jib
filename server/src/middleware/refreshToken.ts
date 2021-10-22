import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import * as dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ data: null, message: "RefreshToken이 존재하지 않습니다." });
  } else {
    jwt.verify(token, process.env.REFRESH_SECRET, async (err: Error, decode: any) => {
      if (err) {
        return res.json({ data: null, message: "RefreshToken이 유효기간이 지났습니다. 다시 로그인 해주세요" });
      } else {
        const userInfo: any = await user.findOne({
          where: { userId: decode.id },
        });
        if (!userInfo) {
          return res.json({ data: null, message: "RefreshToken에 해당유저가 없습니다." });
        } else {
          delete userInfo.dataValues.password;
          const payload = userInfo.dataValues;
          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "12h" });
          res.json({ data: { accessToken, userInfo }, message: "ok" });
        }
      }
    });
  }
};

export default refreshToken;
