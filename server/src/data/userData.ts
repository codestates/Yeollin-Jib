import { injectable } from "inversify";
import "reflect-metadata";
import user from "../models/user";

@injectable()
export class UserData {
  async newCreateUser(
    nickname: string,
    email: string,
    salt: string,
    encryptedPassword: string,
  ): Promise<user> {
    // 일반 회원가입 시 - 로그인 타입 false, 소셜 로그인 시 - true
    return user.create({
      nickname,
      email,
      salt,
      password: encryptedPassword,
      loginType: false,
    });
  }

  async findUserByUserId(userId: number): Promise<user | null> {
    return user.findOne({
      where: { id: userId },
    });
  }

  async findUserByEmail(email: string): Promise<user | null> {
    return user.findOne({ where: { email: email } });
  }

  async findUserByNickname(nickname: string): Promise<user | null> {
    return user.findOne({
      where: {
        nickname: nickname,
      },
    });
  }

  async findAllUserById(userId: number): Promise<user[]> {
    return user.findAll({
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
  }

  async updateUserNicknameByUserId(
    nickname: string,
    userId: number,
  ): Promise<void> {
    user.update(
      {
        nickname: nickname,
      },
      { where: { id: userId } },
    );
  }

  async updateUserPasswordByUserId(
    salt: string,
    newEncryptedPassword: string,
    userId: number,
  ): Promise<void> {
    user.update(
      {
        salt: salt,
        password: newEncryptedPassword,
      },
      { where: { id: userId } },
    );
  }

  async updateUserAreaByUserId(
    userArea: string,
    userId: number,
  ): Promise<void> {
    user.update(
      {
        userArea: userArea,
      },
      { where: { id: userId } },
    );
  }

  async updateUserPhotoByUserId(
    imagePath: string,
    userId: number,
  ): Promise<void> {
    user.update(
      { imagePath: imagePath },
      {
        where: { id: userId },
      },
    );
  }

  async updateImagePathNullByUserId(userId: number): Promise<void> {
    user.update(
      { imagePath: null },
      {
        where: { id: userId },
      },
    );
  }

  async deleteUser(userId: number): Promise<void> {
    user.destroy({ where: { id: userId } });
  }

  async createGoogleUser(userInfo: any): Promise<[user, boolean]> {
    return user.findOrCreate({
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
  }

  async createKaKaoUser(userInfo: any): Promise<[user, boolean]> {
    return user.findOrCreate({
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
  }
}
