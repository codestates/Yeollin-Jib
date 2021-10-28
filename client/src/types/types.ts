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
