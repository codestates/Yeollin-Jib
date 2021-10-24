import { Request, Response, NextFunction } from "express";
import user from "../models/user";
import * as dotenv from "dotenv";
import accessToken from "./accessToken";
dotenv.config();
const jwt = require("jsonwebtoken");

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "RefreshToken이 존재하지 않습니다." });
    }

    const decode: any = await jwt.verify(
      token,
      process.env.REFRESH_SECRET,
      async (err: any | null, decoded: any | null) => {
        if (err) {
          return res.status(401).json({
            message:
              "RefreshToken이 유효기간이 지났습니다. 다시 로그인 해주세요",
          });
        }
        const userInfo: any = await user.findOne({
          where: { id: decoded.id },
        });

        if (!userInfo) {
          return res.status(400).json({
            message: "RefreshToken에 해당유저가 없습니다.",
          });
        }

        delete userInfo.dataValues.password;
        const payload = userInfo.dataValues;

        const accessToken = await jwt.sign(payload, process.env.ACCESS_SECRET, {
          expiresIn: "12h",
        });
        accessToken(req, res, next);
        return res.status(200).json({
          accessToken,
          id: payload.id,
          message: "새로운 accessToken 발급 완료",
        });
      }
    );
  } catch (err) {
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};

export default refreshToken;
