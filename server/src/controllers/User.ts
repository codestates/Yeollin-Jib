import { Request, Response } from "express";

import user from "../models/user";
import comment from "../models/comment";
import storage from "../models/storage";
import post from "../models/post";
import post_category from "../models/post_category";

import * as crypto from "crypto";
import * as fs from "fs";
import axios from "axios";
const jwt = require("jsonwebtoken");

type userRepository = typeof import("../data/userData");

export class UserController {
  user: userRepository;

  constructor(userRepository: userRepository) {
    this.user = userRepository;
  }

  signup = async (req: Request, res: Response) => {
    const { nickname, email, password } = req.body;

    const salt: string = crypto.randomBytes(64).toString("hex");
    const encryptedPassword: string = crypto
      .pbkdf2Sync(password, salt, 256, 64, "sha512")
      .toString("base64");

    const newUser = await this.user.newCreateUser(
      nickname,
      email,
      salt,
      encryptedPassword,
    );

    const userId = newUser.id;

    return res.status(201).json({
      userId,
      nickname,
      email,
      message: "회원가입이 완료되었습니다",
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const findUser = await this.user.findUser(email);

    const dbPassword = findUser!.password;
    const salt = findUser!.salt;

    const hashedPassword: string = crypto
      .pbkdf2Sync(password, salt, 256, 64, "sha512")
      .toString("base64");

    if (hashedPassword !== dbPassword) {
      return res.status(403).json({ message: "잘못된 비밀번호입니다." });
    }

    const payload = {
      id: findUser!.id,
      email: findUser!.email,
      createdAt: findUser!.createdAt,
      updatedAt: findUser!.updatedAt,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "12h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "50d",
    });

    return res
      .status(200)
      .json({
        accessToken,
        id: findUser!.id,
        message: "로그인에 성공하였습니다.",
      })
      .cookie("refreshToken", refreshToken, {
        // secure: true,
        httpOnly: true,
      });
  };

  logout = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization && !req.cookies) {
      return res.status(401).json({ message: `이미 로그아웃 되었습니다.` });
    }
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: `로그아웃 되었습니다.` });
  };

  checkNickname = async (req: Request, res: Response) => {
    const nickname = req.query;

    // 로그인된 아이디 정보 찾기
    const userByNick = await user.findOne({
      where: {
        nickname: nickname,
        //   || nickname!.toUpperCase()
      },
    });

    // nickname 중복코드
    if (userByNick) {
      return res.status(200).json({ message: `닉네임이 중복됩니다.` });
    }
    return res.status(200).json({ message: `사용할 수 있는 닉네임입니다.` });
  };

  checkEmail = async (req: Request, res: Response) => {
    const email = req.query;
    // 로그인된 아이디 정보 찾기
    const result = await user.findOne({ where: { email: email } });
    // email 중복코드
    if (result) {
      return res.status(200).json({ message: `이메일이 중복됩니다.` });
    }
    return res.status(200).json({ message: `사용할 수 있는 이메일입니다.` });
  };

  putUser = async (req: Request, res: Response) => {
    const userId = req.cookies.id;
    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const { nickname, password, userArea, imagePath } = req.body;
      const imagePathReq: any = req.file;
      const findUser: any = await user.findOne({
        where: { id: userId },
      });
      console.log("req.file", req.file);
      if (findUser) {
        // 닉네임 변경
        if (nickname) {
          await user.update(
            {
              nickname: nickname,
            },
            { where: { id: userId } },
          );
        }
        // 비밀번호 변경
        if (password) {
          const salt = crypto.randomBytes(64).toString("hex");

          const newEncryptedPassword = crypto
            .pbkdf2Sync(password, salt, 256, 64, "sha512")
            .toString("base64");

          await user.update(
            {
              salt: salt,
              password: newEncryptedPassword,
            },
            { where: { id: userId } },
          );
        }
        // 우리 동네 위치 정보 수정
        if (userArea) {
          await user.update(
            {
              userArea: userArea,
            },
            { where: { id: userId } },
          );
        }
        // 프로필 사진 수정
        if (imagePathReq) {
          // 기존 파일 삭제
          fs.unlink(
            `${__dirname}/../../../public/uploads/${findUser.imagePath}`,
            (err) => {
              if (err) {
                console.log("기존 파일 삭제 에러 입니다.", err.message);
              }
            },
          );

          // 새 파일 업로드
          await user.update(
            { imagePath: `${imagePathReq.filename}` },
            {
              where: { id: userId },
            },
          );
        }
      }
      return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    }
  };

  getUser = async (req: Request, res: Response) => {
    const userId = req.cookies.id;

    const commentUser = await comment.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const postUser = await post.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const storageUser = await storage.findAll({
      where: { userId },
      attributes: ["id"],
    });
    const findUser = await user.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }
    const userInfo = await user.findAll({
      where: { id: userId },
      attributes: [
        "id",
        "email",
        "nickname",
        "userArea",
        "imagePath",
        "loginType",
      ],
    });

    const { id, email, nickname, userArea, imagePath, loginType } =
      userInfo[0].dataValues;
    const data = { id, email, nickname, userArea, imagePath, loginType };
    res.status(200).json({
      data,
      myComment: commentUser.length,
      myPost: postUser.length,
      myStorage: storageUser.length,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const header: object = req.headers;

    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const userId = req.cookies.id;
      const findPostId: any = await post.findAll({
        where: { userId },
        attributes: ["id"],
      });
      // 내가 쓴 게시글의 id를 받아서 하나씩 다 지워주기
      let postId;
      if (findPostId) {
        for (let i = 0; i < findPostId.length; i++) {
          postId = findPostId[i].dataValues.id;
          await comment.destroy({ where: { postId } });
          await storage.destroy({ where: { postId } });
          await post_category.destroy({ where: { postId } });
        }
      }
      await user.destroy({ where: { id: userId } });
      await comment.destroy({ where: { userId } });
      await storage.destroy({ where: { userId } });
      await post.destroy({
        where: {
          userId,
        },
      });

      return res
        .status(200)
        .cookie("refreshToken", "")
        .setHeader("authorization", "")
        .json({ message: "회원탈퇴가 완료 되었습니다." });
    }
  };

  deletePhoto = async (req: Request, res: Response) => {
    const userId = req.cookies.id;

    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const { imagePath } = req.body;

      const findUser: any = await user.findOne({
        where: { id: userId },
      });

      if (findUser) {
        // body로 imagePath라는 키값이 들어오면 db값을 null로 바꾸는 방식
        if (imagePath) {
          // null값이 아닌 사진이 존재할 경우
          if (findUser.imagePath !== null) {
            // 기존 파일 삭제
            fs.unlink(
              `${__dirname}/../../../public/uploads/${findUser.imagePath}`,
              (err) => {
                if (err) {
                  console.log("기존 파일 삭제 에러 입니다.", err.message);
                }
              },
            );
          }
          // db에 있는 유저 테이블의 imagePath를 null로 변경
          await user.update(
            { imagePath: null },
            {
              where: { id: userId },
            },
          );
        }
      }
      return res.status(200).json({ message: "사진 삭제가 완료되었습니다." });
    }
  };

  googleLogin = async (req: Request, res: Response) => {
    // 로그인 - OAuth 방식: google
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&client_id=${process.env.GOOGLE_CLIENT_ID}`,
    );
  };

  googleCallback = async (req: Request, res: Response) => {
    const code = req.query.code;

    // 구글 자체 로그인
    const result: any = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&grant_type=authorization_code`,
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
      },
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
  };

  kakaoLogin = async (req: Request, res: Response) => {
    // 로그인 버튼
    return res.redirect(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`,
    );
  };

  kakaoCallback = async (req: Request, res: Response) => {
    const code = req.query.code;

    // 카카오 로그인
    const result: any = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
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
  };
}