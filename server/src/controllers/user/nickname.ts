import { Request, Response } from "express";
import user from "../../models/user";

const nick_name = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.query;
    console.log("nickname ==========================", nickname);
    // 로그인된 아이디 정보 찾기
    const userByNick = await user.findOne({ where: { nickname: nickname } });
    console.log("nickname_result ==========================", userByNick);
    // nickname 중복코드
    if (userByNick) {
      return res.status(200).json({ message: `닉네임이 중복됩니다.` });
    }
    return res.status(200).json({ message: `닉네임이 중복되지 않습니다.` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `서버에러`, error: err, location: "nickname.ts" });
  }
};
export default nick_name;
