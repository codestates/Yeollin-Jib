import { Request, Response } from "express";
import * as crypto from "crypto";
import user from "../../models/user";

const signup = async (req: Request, res: Response) => {
  try {
    const { nickname, email, password } = req.body;
    const findUserEmail = await user.findOne({ where: { email: email } });
    const findUserNickname = await user.findOne({
      where: { nickname: nickname },
    });
    const salt = crypto.randomBytes(64).toString("hex");
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 108236, 64, "sha512")
      .toString("base64");

    if (findUserEmail) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    }
    if (findUserNickname) {
      return res.status(409).json({ message: `이미 존재하는 닉네임입니다.` });
    }
    if (!req.body.nickname || !req.body.email || !req.body.password) {
      return res.status(422).json({
        message: `필수 항목이 모두 채워지지 않았습니다. 다시 한번 확인해주세요.`,
      });
    } else {
      // user 생성
      const newUser = await user.create({
        nickname,
        email,
        salt,
        password: encryptedPassword,
      });

      // email로 생성한 유저 조회
      const userId = newUser.id;

      const result = { userId, nickname, email };

      return res
        .status(201)
        .json({ data: result, message: "회원가입이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
  }
};
export default signup;
