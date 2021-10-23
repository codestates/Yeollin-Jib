import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import user from "../models/user";
import refreshToken from "./refreshToken";
dotenv.config();
const jwt = require("jsonwebtoken");

const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("token===============", req.headers);
  if (!authHeader) {
    return res.status(400).json({ data: null, message: "access token 존재하지 않습니다." });
  } else {
    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET, async (err: Error, decode: any) => {
      if (err) {
        return refreshToken;
      }
    });
    const Info = await user.findOne({
      where: { id: data.id },
    });
    console.log("userInfo===============", Info);
    if (!Info) {
      return res.status(401).json({ data: null, message: "access token 일치하는 유저가 없습니다." });
    } else {
      //console.log(userInfo.dataValues);
      // delete userInfo.dataValues.password;
      // res.status(200).json({ data: { userInfo: userInfo.dataValues }, message: "ok" });
      // res.userId = Info.dataValues.id; // req.customData
      next();
    }
  }
};
export default accessToken;
