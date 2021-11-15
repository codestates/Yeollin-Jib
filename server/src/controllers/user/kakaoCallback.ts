import { Request, Response } from "express";
import user from "../../models/user";
import axios from "axios";
import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");
dotenv.config();

const kakaoCallback = async (req: Request, res: Response) => {
  const code = req.query.code;

  try {
    // 카카오 로그인
    const result: any = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
    );

    // 카카오 로그인한 유저 정보 받기
    const userInfo: any = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
      },
    });

    // 카카오에서 유저 데이터를 받아와 email이 데이터베이스에 존재하는지 검사 후 없으면 새로 저장
    const [findUser, exist] = await user.findOrCreate({
      where: {
        email: userInfo.data.kakao_account.email,
      },
      defaults: {
        nickname: userInfo.data.kakao_account.email.split("@")[0],
        email: userInfo.data.kakao_account.account_email,
        imagePath: userInfo.data.kakao_account.profile.is_default_image
          ? null
          : userInfo.data.kakao_account.profile.profile_image_url,
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

export default kakaoCallback;
