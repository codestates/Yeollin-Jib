import { Request, Response } from "express";
import * as crypto from "crypto";
import user from "../../models/user";

const signup = async (req: Request, res: Response) => {
  try {
    const { nickname, email, password } = req.body;
    if (!nickname || !email || !password) {
      return res.status(400).json({
        message: `필수 항목이 모두 채워지지 않았습니다. 다시 한번 확인해주세요.`,
      });
    }
    const salt = crypto.randomBytes(64).toString("hex");
    const encryptedPassword = crypto.pbkdf2Sync(password, salt, 256, 64, "sha512").toString("base64");

    // user 생성
    const newUser = await user.create({
      nickname,
      email,
      salt,
      password: encryptedPassword,
    });
    const userId = newUser.id;
    return res.status(201).json({
      data: { userId, nickname, email },
      message: "회원가입이 완료되었습니다",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default signup;
