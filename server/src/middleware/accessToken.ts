import { Request, Response, NextFunction } from "express";

import user from "../models/user";
import refreshToken from "./refreshToken";
import * as dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");

const accessToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("token===============", req.headers);
  if (!authHeader) {
    return res.status(400).json({ data: null, message: "access token 존재하지 않습니다." });
  }
  let token: any = authHeader.split(" ")[1];
  const data = await jwt.verify(token, process.env.ACCESS_SECRET, async (err: Error, decode: any) => {
    if (err) {
      token = await refreshToken(req, res, next);
    }
    const Info = await user.findOne({
      where: { id: decode.id },
    });
    if (!Info) {
      return res.status(401).json({
        message: "access token 일치하는 유저가 없습니다.",
      });
    }
    req.cookies.id = Info.id;
    next();
  });
};

export default accessToken;
