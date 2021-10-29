export interface ILoginState {
  isLogin: boolean;
  isInValid: boolean;
  accessToken: string;
}

export interface ILoginPayLoad {
  payload: {
    data: {
      accessToken: string;
      message: string;
    };
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserState {
  id: number;
  email: string;
  nickname: string;
  userArea: null | string;
  imagePath: null | string;
}

export interface IUserPayLoad {
  payload: {
    data: {
      id: number;
      email: string;
      nickname: string;
      userArea: null | string;
      imagePath: null | string;
    };
  };
}
