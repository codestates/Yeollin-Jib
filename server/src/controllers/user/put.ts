import { Request, Response } from "express";
import user from "../../models/user";
import * as crypto from "crypto";

const put = async (req: Request, res: Response) => {
  const userId = req.body.id;
  try {
    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const { nickname, password, userArea, imagePath } = req.body;
      const findUser = await user.findOne({ where: { id: userId } });

      if (findUser) {
        // 닉네임 변경
        if (nickname) {
          await user.update(
            {
              nickname: nickname,
            },
            { where: { id: userId } }
          );
        }
        // 비밀번호 변경
        if (password) {
          const salt = crypto.randomBytes(64).toString("hex");

          const newEncryptedPassword = crypto
            .pbkdf2Sync(password, salt, 256, 64, "sha512")
            .toString("base64");

          await user.update(
            {
              salt: salt,
              password: newEncryptedPassword,
            },
            { where: { id: userId } }
          );
        }
        // 우리 동네 위치 정보 수정
        if (userArea) {
          await user.update(
            {
              userArea: userArea,
            },
            { where: { id: userId } }
          );
        }
        // 프로필 사진 수정
      }

      return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default put;
