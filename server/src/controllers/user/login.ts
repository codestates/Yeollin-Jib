import { Request, Response } from "express";
import * as crypto from "crypto";
import user from "../../models/user";
const jwt = require("jsonwebtoken");

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = await req.body;
    // 이메일, 비밀번호 중 하나라도 입력하지 않았을 경우
    if (!email || !password) {
      return res.status(417).json({
        message: `필수 항목이 모두 채워지지않았습니다. 다시 한번 확인해주세요.`,
      });
    }

    const findUser = await user.findOne({
      where: { email: email },
    });

    // 이메일이 없을 때
    if (!findUser) {
      return res.status(404).json({ message: `회원을 찾을수 없습니다.` });
    }

    const dbPassword = findUser.password;
    const salt = findUser.salt;

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 256, 64, "sha512")
      .toString("base64");

    if (hashedPassword !== dbPassword) {
      return res.status(403).json({ message: "잘못된 비밀번호입니다." });
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };

    const accessToken = await jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "12h",
    });
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "50d",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    return res.status(200).json({
      accessToken,
      id: findUser.id,
      message: "로그인에 성공하였습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};

export default login;
