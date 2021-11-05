import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const kakaoLoginButton = async (req: Request, res: Response) => {
  // 로그인 버튼
  return res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`,
  );
};
export default kakaoLoginButton;
