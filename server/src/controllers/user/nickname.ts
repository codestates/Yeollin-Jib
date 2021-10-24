import { Request, Response } from "express";
import user from "../../models/user";

const nick_name = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.query;

    // 로그인된 아이디 정보 찾기
    const userByNick = await user.findOne({
      where: { nickname: nickname || nickname!.toUpperCase() },
    });

    // nickname 중복코드
    if (userByNick) {
      return res.status(200).json({ message: `닉네임이 중복됩니다.` });
    }
    return res.status(200).json({ message: `사용할 수 있는 닉네임입니다.` });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default nick_name;
