import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import user from "../models/user";
import refreshToken from "./refreshToken";
dotenv.config();
const jwt = require("jsonwebtoken");

const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    console.log("token===============", req.headers);
    if (!authorization) {
      return res
        .status(400)
        .json({ data: null, message: "access token 존재하지 않습니다." });
    }

    const token = authorization.split(" ")[1];
    const data = await jwt
      .verify(token, process.env.ACCESS_SECRET)
      .catch(() => {
        return refreshToken;
      });

    const userInfo: any = await user.findOne({
      where: { id: data.id },
    });
    console.log("userInfo===============", userInfo);
    if (!userInfo) {
      return res
        .status(401)
        .json({ message: "access token 일치하는 유저가 없습니다." });
    }

    delete userInfo.dataValues.password;
    res.status(200).json({
      data: {
        userId: userInfo.dataValues.id,
        userInfo: userInfo.dataValues,
      },
      message: "ok",
    });
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: `서버에러`, error: err, location: "accessToken.ts" });
  }
};
export default accessToken;
