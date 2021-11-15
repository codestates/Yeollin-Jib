import { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const googleLogin = async (req: Request, res: Response) => {
  // 로그인 - OAuth 방식: google
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&client_id=${process.env.GOOGLE_CLIENT_ID}`,
  );
};

export default googleLogin;
