import { Request, Response } from "express";
import user from "../../models/user";
import axios from "axios";
import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config();

const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code;

  try {
    // 구글 자체 로그인
    const result: any = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&grant_type=authorization_code`
    );

    const GoogleAccessToken = result.data.access_token;
    const GoogleRefreshToken = result.data.refresh_token;

    // 구글 로그인한 회원 정보 받기
    const userInfo: any = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${GoogleAccessToken}`,
      {
        headers: {
          Authorization: `Bearer ${GoogleAccessToken}`,
        },
      }
    );

    // 구글 로그인한 회원 정보 중 email이 데이터베이스에 존재하는지 검사 후 없으면 새로 저장
    const [findUser, exist] = await user.findOrCreate({
      where: {
        email: userInfo.data.email,
      },
      defaults: {
        nickname: userInfo.data.email.split("@")[0],
        imagePath: userInfo.data.picture,
        password: userInfo.data.id,
        salt: userInfo.data.id,
        loginType: true,
      },
    });

    const payload = {
      id: findUser.id,
      email: findUser.email,
      nickname: findUser.nickname,
      userArea: findUser.userArea,
      imagePath: findUser.imagePath,
      loginType: true,
    };

    const accessToken = await jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "12h",
    });
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "50d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
    });

    const realQuery = encodeURIComponent(accessToken);

    // redirect를 이용해 쿼리로 accessToken을 전달 (ORIGIN : 클라이언트 url)
    res.redirect(`${process.env.ORIGIN}/login?access_token=${realQuery}`);
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};

export default googleCallback;
