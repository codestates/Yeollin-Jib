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
  ) {
    // 일반 회원가입 시 - 로그인 타입 false, 소셜 로그인 시 - true
    return await user.create({
      loginType: false,
      nickname,
      email,
      salt,
      password: encryptedPassword,
    });
  }

  async findUserById<T>(userId: T) {
    return await user.findOne({
      where: { id: userId },
    });
  }

  async findUserByEmail<T>(email: T) {
    return await user.findOne({ where: { email: email } });
  }

  async findUserByNickname<T>(nickname: T) {
    return await user.findOne({
      where: {
        nickname: nickname,
      },
    });
  }

  async findAllUserById<T>(userId: T) {
    return await user.findAll({
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

  async updateUserNicknameByUserId<T, R>(nickname: T, userId: R) {
    return await user.update(
      {
        nickname: nickname,
      },
      { where: { id: userId } },
    );
  }

  async updateUserPasswordByUserId<T>(
    salt: string,
    newEncryptedPassword: string,
    userId: T,
  ) {
    return await user.update(
      {
        salt: salt,
        password: newEncryptedPassword,
      },
      { where: { id: userId } },
    );
  }

  async updateUserAreaByUserId<T, R>(userArea: T, userId: R) {
    return await user.update(
      {
        userArea: userArea,
      },
      { where: { id: userId } },
    );
  }

  async updateUserPhotoByUserId<T, R>(imagePath: T, userId: R) {
    return await user.update(
      { imagePath: imagePath },
      {
        where: { id: userId },
      },
    );
  }
}
