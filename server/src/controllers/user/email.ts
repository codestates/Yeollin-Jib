import { Request, Response } from "express";
import user from "../../models/user";

const email = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    console.log("email ==========================", email);
    // 로그인된 아이디 정보 찾기
    const result = await user.findOne({ where: { email: email } });
    console.log("email_result ==========================", result);
    // email 중복코드
    if (result) {
      return res.status(200).json({ message: `이메일이 중복됩니다.` });
    }
    return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
  } catch (err) {
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default email;
