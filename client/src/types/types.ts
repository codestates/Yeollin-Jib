export interface ILoginState {
  isLogin: boolean;
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
