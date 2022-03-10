import { Request, Response } from "express";
import user from "../../models/user";

const email = async (req: Request, res: Response) => {
  try {
    const email = req.query;
    // 로그인된 아이디 정보 찾기
    const result = await user.findOne({ where: { email: email } });
    // email 중복코드
    if (result) {
      return res.status(200).json({ message: `이메일이 중복됩니다.` });
    }
    return res.status(200).json({ message: `사용할 수 있는 이메일입니다.` });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default email;
