import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    const header = req.headers;
    if (!header.authorization) {
      return res.status(401).json({ message: `이미 로그아웃 되었습니다.` });
    } else {
      return res
        .clearCookie("jwt")
        .status(200)
        .json({ message: `로그아웃 되었습니다.` });
    }
  } catch (err) {
    console.log(err);
  }
};
export default logout;
