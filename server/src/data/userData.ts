import user from "../models/user";

export async function newCreateUser<N, E>(
  nickname: N,
  email: E,
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

export async function findUser<E>(email: E) {
  return await user.findOne({
    where: { email: email },
  });
}
