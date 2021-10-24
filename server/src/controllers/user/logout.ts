import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    if (!authorization && !req.cookies) {
      return res.status(401).json({ message: `이미 로그아웃 되었습니다.` });
    }
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: `로그아웃 되었습니다.` });
  } catch (err) {
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default logout;
